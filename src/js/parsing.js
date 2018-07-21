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

var columnRegexPattern = "((?:in)|(?:out)): ?(?:(\w*) ?(?:\[(.*)\])?)";
var columnRegex = new RegExp(columnRegexPattern);
var oddSliderBackground = "background-color:#f2f2f2";
var evenSliderBackground = "background-color:#e6e6e6";
var columnToNameMap = {};
var rowValueSets = {};

var columnSets = {};

function parseCsv(googleObject){
    //read csv file from google drive
    var actualCsvFile = d3.csv(googleObject.csvFiles['data.csv']);
    //read settings file
    var settingsFile = d3.json(googleObject.settingFiles['settings_lite.json']);
    //add settings file to global _settings
    _settings = settingsFile;
    //get description from settings file
    
    
    console.log('Starting parse csv')
    columnNames = actualCsvFile.columns;
    columnNames.forEach(columnName => {
        columnSets[columnName] = new Set();
    });
    console.log('made new sets')

    actualCsvFile.forEach(row => {
        addRowToSets(row, columnNames);
    });
    console.log('added row to sets')
    calculateMaxOfEachSet();
    console.log('calculated max of sets')
    console.log(maxSliderRange)

    columnNames.forEach(columnName, colIndex => {
        var unitSuffix = '';
        var name = '';
        var isEven = colIndex % 2;
        var match = columnRegex.exec(columnName);
        if(match) {
            
            name = match[2];
            _parameters.push(name);
            columnToNameMap[columnName] = name;

            if(match[1] === 'in'){
                //this is an input column, create a slider and event handler.
                console.log('found in for column:'+columnName);
                makeInputSlider(name, unitSuffix, maxSliderRange[columnName], isEven);
                console.log('made input slider')
                makeInputSliderEventHandler(name, columnName);
                console.log('made slider event handler');
            } else {
                //this is an output, create a metric div
                console.log('is output column:'+columnName);
                makeOutputDiv(name);
            }
        } else {
            //must be the 'img' column... or something is wrong.
            //consider throwing error at some other time?
        }
    });
    console.log('pushed parameters and settings')
    console.log(_settings)
    console.log(_parameters)
    console.log('finished parsing csv')
}



function makeInputSlider(name, unitSuffix, max, isEven){
    console.log('making input slider for name: '+name+' with unit suffix: '+unitSuffix);
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
    '<div class="slider" id="'+name+'" style="'+styleString+'">'+
    '<label>'+name+'</label>'+
    '<input type="range" name="'+name+'" id="'+name+'" value="0" min="0" max="'+max+'" step = "1">'+
    '<p id="'+name+'output"></p>'+
    '</div>');
}

function makeInputSliderEventHandler(name, columnName){
    /*
    $("#flrA").on("input", function(event) {
        FlrA = $(this).val();
        $("#flroutput").text(fAreaDict[FlrA]);
        updateImg();
        updateEnergy();
    });
    */
   var idName = "#"+name;
   var outPutName = idName + "output"
   $(idName).on("input", function(event){
       var currentValue = $(this).val();
       output[name] = currentValue;
       $(outPutName).text(columnDictionaries[columnName][currentValue])
       buildAll();
       updateAll();
   })
}

function makeOutputDiv(name){
    $("#metrics").append('<div class="slider2" id="'+name+'div"><div id="'+name+'"></div><p style="margin-top:3px;">'+unitSuffix+'<br>'+name+'</p></div>');
};

function calculateMaxOfEachSet(){
    columnNames.forEach(columnName => {
        columnSets[columnName].forEach(columnSet =>{
            columnDictionaries[columnName] = {};
            var key = 0;
            var columnEntriesArray = Array.from(columnSet).sort();
            columnEntriesArray.forEach(arrayEntrySorted => {
                columnDictionaries[columnName][key] = arrayEntrySorted;
                key++;
            });
            maxSliderRange[columnName] = columnEntriesArray.length;
        });
    });
}

function addRowToSets(row){
    columnNames.forEach(columnName => {
        columnSets[columnName].add(row[columnName]); //sets only add new uniques.
    });
};