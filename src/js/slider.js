var oddSliderBackground = "background-color:#f2f2f2";
var evenSliderBackground = "background-color:#f8f8f8";

function makeInputSlider(name, unitSuffix, longName, max, isEven, columnName){
    //console.log('making input slider for name: '+name+' with unit suffix: '+unitSuffix);
   var styleString = isEven ? evenSliderBackground : oddSliderBackground;
   $('#sliderFields').append(
    '<div class="slider" id="'+name+'slider" style="'+styleString+'">'+
    '<div class="slabel"> <label>'+longName+'</label></div>'+
    '<div class="slabel"> <input type="range" name="'+name+'" id="'+name+'" value="0" min="0" max="'+max+'" step = "1"></div>'+
    '<div class="slideroutput"><p id="'+name+'output">'+_columnDictionaries[columnName][0]+unitSuffix+'</p></div>'+
    '</div>');
}

function makeInputSliderEventHandler(name, columnName, unitSuffix){

   var idName = "#"+name;
   //console.log(idName);
   var outPutName = idName + "output"
   $(idName).on("input", function(){
       //console.log('firing event for slider: '+name);
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

function getSliderStateAndPushCsvRow(update=true){
    //console.log('getting state and pushing function')
    var currentValuesString = "";
    d3.keys(_currentValues).forEach(inputValue => {
        currentValuesString += _currentValues[inputValue]
    })
    //console.log('getting csv row for: '+currentValuesString);
    _currentRow = _data[currentValuesString];
    //console.log('set currentRow');
    //console.log(_currentRow);
    if (update == true) {
      updateAll();
    }
}

function setDefaultCurrentValues(){
    columnNames.forEach(columnName => {
        if(columnName.startsWith("in:")){
            _currentValues[columnName] = _columnDictionaries[columnName][0];
        }
    });
}

function calculateMaxOfEachSet(){

    var maxSliderRange = {}
    //console.log('calculating max of each set and making dictionaries');
    columnNames.forEach(columnName => {
        if (columnName.startsWith('in:')){
          var columnEntriesArray = Array.from(columnSets[columnName])
          _columnDictionaries[columnName] = {};
          var key = 0;
          columnEntriesArray.forEach(arrayEntrySorted =>{
              // console.log('Adding key: '+key+' for columnName: '+columnName+' with value of:'+arrayEntrySorted)
              _columnDictionaries[columnName][key] = arrayEntrySorted;
              key++;
          });
          maxSliderRange[columnName] = columnEntriesArray.length -1;
        }
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

function stylizeSliders(){
  // set a default width of the sliders that fits evenly on the page
  var numSliders = Object.keys(_currentValues).length
  sliderWidth = 2
  if (numSliders <= 2){
    sliderWidth = 6
  } else if (numSliders == 3 || numSliders == 6 || numSliders == 9) {
    sliderWidth = 4
  } else if (numSliders == 4 || numSliders == 8) {
    sliderWidth = 3
  } else if (numSliders == 5 || numSliders == 10) {
    sliderWidth = 2.4
  } else if (numSliders == 7) {
    sliderWidth = 1.71428
  }

  // set all slider divs to have the same width.
  windowTwelf = parseInt(window.innerWidth/12)
  width = (windowTwelf * sliderWidth) - 2
  d3.selectAll('.slider')
    .style("width", width.toString()+'px')
    .style("height", '100px')
  d3.selectAll('input[type=range]')
    .style('width', (width-80).toString()+'px')
}
