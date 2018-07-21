/* global d3, updateAll, _data, _allData, _currentValues, _googleObject, _getCsvData, _columnDictionaries, buildAll, _currentRow, _settings, columnNames, $ */


//Place this file into a <script> tag,
//Call method parseCsv(googleObject) after getting the google drive link from user

//ASSUME: Format of data.csv comes in as https://github.com/d3/d3-dsv#dsv_parse dsv parse format, with data.columns

//ASSUME: Jquery is already loaded, and $ is in global scope.
//Assume: Methods updateImg();  updateEnergy(); exist on global scope

//This method will be called with the Google object - GET the data.csv, and the settings file

//this method will perform a loop, and PER input column:
//1.) Create Input{{NAME}} where name is name of column
//1.5) Create jquery on input changes for the above inputs
//2.) Create {{NAME}}Dict


var columnRegex = new RegExp(/((?:in)|(?:out)): ?(?:(\w*) ?(?:\[(.*)\])?)/i);
var oddSliderBackground = "background-color:#f2f2f2";
var evenSliderBackground = "background-color:#e6e6e6";
var columnToNameMap = {};
var rowValueSets = {};

var columnSets = {};
var _parameters =[];

function getCsvObj(googleObject){
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
        // console.log(settingsJson);
        console.log('pushed parameters and settings')
        console.log('finished parsing csv')
        parseCsv(d);
        buildAll();
    });

  });
}


function parseCsv(data){

    columnNames = d3.keys(data[0]);
    // add csv data to gobal _csvdata
    _currentValues = {};
    //get description from settings file


    console.log('Starting parse csv')
    columnNames = d3.keys(_allData[0]);
    // console.log(columnNames)
    columnNames.forEach(columnName => {
        columnSets[columnName] = new Set();
    });
    // console.log('made new sets')

    data.forEach(row => {
        addRowToSets(row, columnNames);
    });

    console.log('added row to sets')
    var maxSliderRange = calculateMaxOfEachSet();
    setDefaultCurrentValues();
    console.log('calculated max of sets')
    //console.log(maxSliderRange)

    columnNames.forEach((columnName, colIndex) => {
        var name = '';
        var isEven = colIndex % 2;
        var match = columnRegex.exec(columnName);
        var longName = _settings.parameters[columnName].longName || columnName;
        var unitSuffix = _settings.parameters[columnName].unit || "";
        if(match) {
            // console.log('got match on columnName: '+columnName)
            // console.log('match object:')
            // console.log(match)
            name = match[2];
            _parameters.push(name);
            columnToNameMap[columnName] = name;

            if(match[1] === 'in'){
                //this is an input column, create a slider and event handler.
                // console.log('found in for column:'+columnName);
                makeInputSlider(name, unitSuffix, longName, maxSliderRange[columnName], isEven, columnName);
                // console.log('made input slider')
                makeInputSliderEventHandler(name, columnName, unitSuffix);
                // console.log('made slider event handler');
            } else {
                //this is an output, create a metric div
                // console.log('is output column:'+columnName);
                //makeOutputDiv(name, unitSuffix);
            }
        } else {
            // console.log('did not get match on columnName: '+columnName+' is it the img column?')
            //must be the 'img' column... or something is wrong.
            //consider throwing error at some other time?
        }
    });

}



function makeInputSlider(name, unitSuffix, longName, max, isEven, columnName){
    // console.log('making input slider for name: '+name+' with unit suffix: '+unitSuffix);
    /*
    <div class="slider" id="progRatio">
    <label>Lab to NonLab Ratio</label>
    <input type="range" name="prog" id="prog" value="2" min="0" max="2" step = "1">
    <p id="progoutput">60%</p>
    </div>
    */
   //<fieldset id="sliderFields" class="inputgroup">
   var styleString = isEven ? evenSliderBackground : oddSliderBackground;
   
   $('#sliderFields').append(
    '<div class="slider" id="'+name+'slider" style="'+styleString+'">'+
    '<label>'+longName+' </label>'+
    '<input type="range" name="'+name+'" id="'+name+'" value="0" min="0" max="'+max+'" step = "1">'+
    '<p id="'+name+'output">'+_columnDictionaries[columnName][0]+unitSuffix+'</p>'+
    '</div>');
}

function makeInputSliderEventHandler(name, columnName, unitSuffix){
    /*
    $("#flrA").on("input", function(event) {
        FlrA = $(this).val();
        $("#flroutput").text(fAreaDict[FlrA]);
        updateImg();
        updateEnergy();
    });
    */
   var idName = "#"+name;
//    console.log(idName);
   var outPutName = idName + "output"
   $(idName).on("input", function(){
       console.log('firing event for slider: '+name);
       var currentValue = $(this).val();
    //    console.log('current value is '+currentValue)
    //    console.log('from dictionary, that should be: '+_columnDictionaries[columnName][currentValue])
    //    console.log('heres that columns dictionary')
    //    console.log(_columnDictionaries[columnName]);
       $(outPutName).text(_columnDictionaries[columnName][currentValue]+unitSuffix)
       _currentValues[columnName] = _columnDictionaries[columnName][currentValue];
       getSliderStateAndPushCsvRow();
   })
}

function getSliderStateAndPushCsvRow(){
    // console.log('getting state and pushing function')
    var currentValuesString = "";
    d3.keys(_currentValues).forEach(inputValue => {
        currentValuesString += _currentValues[inputValue]
    })
    // console.log('getting csv row for: '+currentValuesString);
    _currentRow = _data[currentValuesString];
    // console.log('set currentRow');
    // console.log(_currentRow);
    updateAll();
}

// function makeOutputDiv(name, unitSuffix){
//     $("#metrics").append('<div class="slider2" id="'+name+'div"><div id="'+name+'"></div><p style="margin-top:3px;">'+unitSuffix+'<br>'+name+'</p></div>');
// }

function setDefaultCurrentValues(){
    columnNames.forEach(columnName => {
        if(columnName.startsWith("in:")){
            _currentValues[columnName] = _columnDictionaries[columnName][0];
        }
    });
}

function calculateMaxOfEachSet(){

    var maxSliderRange = {}
    // console.log('calculating max of each set and making dictionaries');
    columnNames.forEach(columnName => {
        // console.log('column name: '+columnName)
        var columnEntriesArray = Array.from(columnSets[columnName]).sort();
        // console.log('from set: ')
        // console.log(columnSets[columnName])
        // console.log('sorted columnEntriesArray');
        // console.log(columnEntriesArray);
        _columnDictionaries[columnName] = {};
        var key = 0;
        columnEntriesArray.forEach(arrayEntrySorted =>{
            // console.log('Adding key: '+key+' for columnName: '+columnName+' with value of:'+arrayEntrySorted)
            _columnDictionaries[columnName][key] = arrayEntrySorted;
            key++;
        });
        maxSliderRange[columnName] = columnEntriesArray.length -1;
    });

    return maxSliderRange;
}

function addRowToSets(row){
    // console.log('add this row:')
    // console.log(row);
    var inputStringCombination = "";
    columnNames.forEach(columnName => {
        // console.log('adding '+row[columnName]+' to '+columnName+' set')
        columnSets[columnName].add(row[columnName]); //sets only add new uniques.
        if(columnName.startsWith("in:")){
            //concatenate and add to jsonObject
            inputStringCombination += row[columnName];
        }
    });
    _data[inputStringCombination] = row;
}
