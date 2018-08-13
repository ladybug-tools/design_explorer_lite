/* global d3, updateAll, _data, _allData, _currentValues, _googleObject, _columnDictionaries, buildAll, _currentRow, _settings, columnNames, $ */


//Place this file into a <script> tag,
//Call method parseCsv(googleObject) after getting the google drive link from user

//ASSUME: Format of data.csv comes in as https://github.com/d3/d3-dsv#dsv_parse dsv parse format, with data.columns

//ASSUME: Jquery is already loaded, and $ is in global scope.
//Assume: Method updateAll(); exist on global scope

//This method will be called with the Google object - GET the data.csv, and the settings file


var columnRegex = new RegExp(/((?:in)|(?:out)): ?(?:(\w*) ?(?:\[(.*)\])?)/i);
var columnToNameMap = {};
var _sliderIDnames = []

var columnSets = {};
var _parameters =[];

function getCsvObj(googleObject){
  // remove any existing content on the page
  deleteAll()
  _settings = null

  //read csv file from google drive
  _googleObject = googleObject
  _columnDictionaries = {};
  d3.csv(googleObject.csvFiles['data.csv'], function(d){
    _allData = d;
    _currentValues = {};
    _data = {}

    //read settings file
    d3.json(googleObject.settingFiles['settings_lite.json'],
      function(settingsJson){
        //add settings file to global _settings
        _settings = settingsJson;
        parseCsv(d);
        //console.log('pushed parameters and settings')
        //console.log('finished parsing csv')
        buildAll();
      });
  });
}


function parseCsv(data){

    columnNames = d3.keys(data[0]);
    // add csv data to gobal _csvdata
    _currentValues = {};
    //get description from settings file
    _settingsFromFile = true


    //console.log('Starting parse csv')
    columnNames = d3.keys(_allData[0]);
    //console.log(columnNames)
    columnNames.forEach(columnName => {
        columnSets[columnName] = new Set();
    });
    //console.log('made new sets')

    data.forEach(row => {
        addRowToSets(row, columnNames);
    });

    //console.log('added row to sets')
    var maxSliderRange = calculateMaxOfEachSet();
    setDefaultCurrentValues();
    //console.log('calculated max of sets')

    columnNames.forEach((columnName, colIndex) => {
        var name = '';
        var isEven = colIndex % 2;
        var match = columnRegex.exec(columnName);
        if(match) {
            //console.log('got match on columnName: '+columnName)
            //console.log('match object:')
            //console.log(match)
            name = match[2];
            // avoid accidental duplicate names
            if (_sliderIDnames.indexOf(name) >= 0) {
              name = name + colIndex.toString()
            }
            _sliderIDnames.push(name)
            _parameters.push(name);
            columnToNameMap[columnName] = name;
            if (_settings != null){
              var longName = _settings.parameters[columnName].longName || columnName;
              var unitSuffix = _settings.parameters[columnName].unit || "";
            } else {
              var longName = columnName.split('in:')[1]
              var unitSuffix = ''
            }
            if(match[1] === 'in'){
                //this is an input column, create a slider and event handler.
                //console.log('found in for column:'+columnName);
                makeInputSlider(name, unitSuffix, longName, maxSliderRange[columnName], isEven, columnName);
                //console.log('made input slider')
                makeInputSliderEventHandler(name, columnName, unitSuffix);
                //console.log('made slider event handler');
            } else {
                //this is an output, create a metric div
                //console.log('is output column:'+columnName);
            }
        }
    });
    if (_settings == null){
      _settings = {'parameters': {}}
      columnNames.forEach((columnName, colIndex) => {
        _settings['parameters'][columnName] = {}
      });
      _settingsFromFile = false
    }else {
      _settingsFromFile = true
    }
}
