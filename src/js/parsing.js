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
var _parameters =[];
var googleObject ={
    "csvFiles": {
        "data.csv": "https://www.googleapis.com/drive/v3/files/0B8secD5h7wUFc0ozc2NWNncxRlE?alt=media&key=AIzaSyCSrF08UMawxKIb0m4JsA1mYE5NMmP36bY"
    },
    "imgFiles": {
        "SHDCOUNT_3.0_GLZPER_0.6_ROOMOR_270.0_RMDEPTH_6.0_RMH_3.6_Perspective.png": "https://docs.google.com/uc?id=0B8secD5h7wUFdzkwVDlXdmUwNWM&export=download",
        "SHDCOUNT_3.0_GLZPER_0.6_ROOMOR_270.0_RMDEPTH_6.0_RMH_3.0_Perspective.png": "https://docs.google.com/uc?id=0B8secD5h7wUFV3dTdEQ2NjBmb3M&export=download",
        "SHDCOUNT_0.0_GLZPER_0.4_ROOMOR_135.0_RMDEPTH_6.0_RMH_3.6_Perspective.png": "https://docs.google.com/uc?id=0B8secD5h7wUFeFJadFZWaGkxX2s&export=download"
    },
    "jsonFiles": {
        "SHDCOUNT_3.0_GLZPER_0.6_ROOMOR_270.0_RMDEPTH_6.0_RMH_3.6.json": "https://www.googleapis.com/drive/v3/files/0B8secD5h7wUFRWM1SDZHSl8tYjQ?alt=media&key=AIzaSyCSrF08UMawxKIb0m4JsA1mYE5NMmP36bY",
        "SHDCOUNT_3.0_GLZPER_0.6_ROOMOR_270.0_RMDEPTH_6.0_RMH_3.0.json": "https://www.googleapis.com/drive/v3/files/0B8secD5h7wUFYUNYamVSUy0xc2M?alt=media&key=AIzaSyCSrF08UMawxKIb0m4JsA1mYE5NMmP36bY",
        "SHDCOUNT_0.0_GLZPER_0.4_ROOMOR_135.0_RMDEPTH_6.0_RMH_3.6.json": "https://www.googleapis.com/drive/v3/files/0B8secD5h7wUFakN5VGFRZmVDUDA?alt=media&key=AIzaSyCSrF08UMawxKIb0m4JsA1mYE5NMmP36bY"
    },
    "settingFiles": {
        "settings_lite.json": "https://www.googleapis.com/drive/v3/files/0B8secD5h7wUFMUJvUFV1VDNvRHM?alt=media&key=AIzaSyCSrF08UMawxKIb0m4JsA1mYE5NMmP36bY"
    }
}

function getCsvObj(googleObject){
  //read csv file from google drive
  console.log(googleObject.csvFiles['data.csv']);
  d3.csv(googleObject.csvFiles['data.csv'], function(d){
    _allData = d;
    parseCsv(d);

    //read settings file
    d3.json(googleObject.settingFiles['settings_lite.json'],
      function(d){
        //add settings file to global _settings
        _settings = d;


        console.log('pushed parameters and settings')
        console.log(_settings)
        console.log(_parameters)
        console.log('finished parsing csv')
        buildAll();
      });
  });

}


function parseCsv(data){

    columnNames = d3.keys(data[0]);
    // add csv data to gobal _csvdata

    //get description from settings file


    console.log('Starting parse csv')
    columnNames = d3.keys(_allData[0]);
    console.log(columnNames)
    columnNames.forEach(columnName => {
        columnSets[columnName] = new Set();
    });
    console.log('made new sets')

    data.forEach(row => {
        addRowToSets(row, columnNames);
    });
    console.log('added row to sets')
    calculateMaxOfEachSet();
    console.log('calculated max of sets')
    //console.log(maxSliderRange)

    columnNames.forEach((columnName, colIndex) => {
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
                //makeInputSliderEventHandler(name, columnName);
                console.log('made slider event handler');
            } else {
                //this is an output, create a metric div
                console.log('is output column:'+columnName);
                makeOutputDiv(name, unitSuffix);
            }
        } else {
            //must be the 'img' column... or something is wrong.
            //consider throwing error at some other time?
        }
    });

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
   console.log(idName);
   var outPutName = idName + "output"
   $(idName).on("input", function(event){
       var currentValue = $(this).val();
       output[name] = currentValue;
       $(outPutName).text(columnDictionaries[columnName][currentValue])
       updateAll();
   })
}

function makeOutputDiv(name, unitSuffix){
    $("#metrics").append('<div class="slider2" id="'+name+'div"><div id="'+name+'"></div><p style="margin-top:3px;">'+unitSuffix+'<br>'+name+'</p></div>');
};

function calculateMaxOfEachSet(){
    columnDictionaries = {}
    maxSliderRange= {}
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
