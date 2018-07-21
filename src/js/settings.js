testParams = ["out:Lighting [#]","CoolingPk[Tons]"];
_settings = {};

visualTypeSettings ={
    barChart:{
        name:"newBarChart",
        stacked: true, 
        yAxisText: ['Y Axis Title', 'subTitle'],
        maxVal: null,
        dataColors: []
    },
    image:{
        name:"Image",
        width:12,
        show:true
    }
}

function drawSettingViewBody() {
    
    var params = testParams;//TODO: _parameters will be the final
    var settingViewBodyDIV = d3.select("#settingViewBody");
    // check _settings if exist
    if(_settings == null) _settings = {};
    if(!_settings.hasOwnProperty("parameters")){
        _settings["parameters"] = {}
        params.forEach(paramName=>{
            _settings.parameters[paramName]={
                longName: "",
                unit:"",
                visuals:[]
            }
        })
    }
    if(!_settings.hasOwnProperty("visuals")){
        _settings["visuals"] = {}
        _settings.visuals["options_image"]={'type': 'image', 'width': 12, 'show':true}
    }
    //console.log(_settings);
    
    
    newUserSetting = {
        'visuals': {
            'bar_chart_1': { 'type': 'barChart', 'dataColors': ["rgb(255,255,0)", "rgb(191,191,191)", "rgb(255,0,102)", "rgb(0,176,240)", "rgb(166,216,110)", "rgb(119,185,49)"], 'stacked' : true, 'yAxisText': ['EUI', 'kBtu/sf'] },
            'options_image': { 'type': 'image', 'width': 6 }
        },
        'parameters': {
        }
    };

    newUserSetting = _settings;

    
    var visSettingDIV = settingViewBodyDIV.select("#visSettingList");
    drawVisualsSettingViewBody(visSettingDIV, newUserSetting.visuals);

    var paraSettingDIV = settingViewBodyDIV.select("#dimSettingList");
    drawParamsSettingViewBody(paraSettingDIV,params);
}

_visChartList={DataMatric:{}}

function addBarChart(params) {
    var barChartTempDiv = d3.select("#barChartTemp");
    var newChartID = "chart_"+genID();
    var newChartInst = visualTypeSettings.barChart;
    d3.select("#visSettingList").append("div").attr("id",newChartID).html(barChartTempDiv.html())
    
    _visChartList[newChartID]=newChartInst;
    d3.selectAll("#"+newChartID +" input").on("change",function(d) {
        var value = $(this).val();
        var inputID = d3.select(this).property("id");
        _visChartList[newChartID][inputID] =  value;
        
        
    })

    console.log(_visChartList);
}
    //console.log(JSON.stringify(newUserSetting));
  
function drawVisualsSettingViewBody(parentDIV,visualTypeSettings) {
    var visTypeNames = d3.keys(visualTypeSettings);
    var visTypes = visualTypeSettings;

    // var imgViewSetting = parentDIV.selectAll('.panel-default')
    //                     .data(visTypeNames).enter()
    //                     .append("div")
    //                     .attr("class", "panel panel-default");

    // var panelHeading = imgViewSetting.append("div").attr("class", "panel-heading");

    // panelHeading.append("h4")
    //             .attr("class", "panel-title")
    //                 .append("a")
    //                 .attr("data-toggle", "collapse")
    //                 .attr("data-parent", "#visSettingList")
    //                 .attr("href", function(d){return "#setting"+ string_as_unicode_escape(visTypes[d].name);})
    //                 .text(function(d){return visTypes[d].name;});

    // var panelBody = imgViewSetting.append("div")
    // .attr("id", function(d){return "visSetting"+ string_as_unicode_escape(visTypes[d].name);})
    // .attr("class", "panel-collapse collapse");

    // var panelBodyContent = panelBody.append("div").attr("class", "panel-body")
    // .append("ul").attr("class", "list-group");

    //vis setting list based on is properties----------------------------------------------------------------------------------------------------------
    // var itemLoneName = panelBodyContent.append("li")
    // .attr("class", "list-group-item form-inline")
    // .text("Long Name: ");

    // itemLoneName.append("input")
    // .attr("class", "form-control input-sm")
    // .attr("placeholder", function(d){return d;})
    // .attr("type", "text")
    // .on("change", function(d){
    //     var value = $(this).val();
    //     if (newUserSetting.parameters[d] == null) {
    //         newUserSetting.parameters[d] = {longName:d,unit:""}
    //     }
    //     newUserSetting.parameters[d]["longName"] = value;
        
    // });

    visTypeNames.forEach(name => {

        parentDIV.append("h4").text(visTypes[name].name);
        var ul = parentDIV.append("ul").attr("class", "list-group");
        // var selID = "#visSetting"+ string_as_unicode_escape(name);
        // console.log(selID);
        // var visPanelBodyDIV = parentDIV.select(selID).select(".list-group");
        // visPanelBodyDIV.append("li");
        //d3.select("#setting4261724368617274").select(".list-group").append("li");
        //console.log(ul);
        
        var properties = d3.keys(visTypes[name]);
        properties.forEach(propName=>{
            var itemLi = ul.append("li")
            .attr("class", "list-group-item form-inline")
            .text(propName);

            itemLi.append("input")
            .attr("class", "form-control input-sm")
            .attr("placeholder", function(d){return d;})
            .attr("type", "text")
            .on("change", function(d){
                var value = $(this).val();
                newUserSetting.visuals.options_image = value;
            });

        })
        
    });
    
}

function drawParamsSettingViewBody(parentDIV,params) {
    
    //remove current
    parentDIV.selectAll(".panel-default").remove();

    var selectList = parentDIV.selectAll('.panel-default')
                        .data(params).enter()
                        .append("div")
                        .attr("class", "panel panel-default");

    var panelHeading = selectList.append("div").attr("class", "panel-heading");

    panelHeading.append("h4")
                .attr("class", "panel-title")
                    .append("a")
                    .attr("data-toggle", "collapse")
                    .attr("data-parent", "#dimSettingList")
                    .attr("href", function(d){return "#setting"+ string_as_unicode_escape(d);})
                    .on("click",addAvailableChartAsOptions)
                    .text(function(d){return d;});

    var panelBody = selectList.append("div")
                .attr("id", function(d){return "setting"+ string_as_unicode_escape(d);})
                .attr("class", "panel-collapse collapse");

    var panelBodyContent = panelBody.append("div").attr("class", "panel-body")
    .append("ul").attr("class", "list-group");

    //Parameter setting----------------------------------------------------------------------------------------------------------
    var itemLoneName = panelBodyContent.append("li")
    .attr("class", "list-group-item form-inline")
    .text("Long Name: ");

    itemLoneName.append("input")
    .attr("class", "form-control input-sm")
    .attr("placeholder", function(d){var longName = newUserSetting.parameters[d].longName; return longName;})
    .attr("type", "text")
    .on("change", function(d){
        var value = $(this).val();
        if (newUserSetting.parameters[d] == null) {
            newUserSetting.parameters[d] = {longName:d,unit:""}
        }
        newUserSetting.parameters[d]["longName"] = value;
        
    });

    var itemUnit = panelBodyContent.append("li")
    .attr("class", "list-group-item form-inline")
    .text("Unit: ");

    itemUnit.append("input")
    .attr("class", "form-control input-sm")
    .attr("placeholder", function(d){var unit = newUserSetting.parameters[d].unit; return unit;})
    .attr("type", "text")
    .on("change", function(d){
        var value = $(this).val();
        if (newUserSetting.parameters[d] == null) {
            newUserSetting.parameters[d] = {longName:d,unit:""}
        }
        newUserSetting.parameters[d].unit = value;
    });

    var itemUnit = panelBodyContent.append("li")
    .attr("id", "availableCharts")
    .attr("class", "list-group-item form-inline")
    .text("Show in Chart: ");

}

function addAvailableChartAsOptions(d, i){
    if (d3.event.defaultPrevented) return; // dragged
    var chartNames = d3.keys(_visChartList);

    //chartNames = ["DataMatric","chart_dder"];

    var div = d3.select("#setting"+string_as_unicode_escape(d)+" #availableCharts").append("ul");
    console.log(chartNames);

    chartNames.forEach(chartName=>{
        div.append("li")
        .append("div")
        .attr("class", "checkbox")
        .append("label").text(chartName)
        .append("input").attr("type", "checkbox").attr("value", "checkbox").attr("id", function(d){return d;})
        .on('click',function(e){
        var ifChecked = d3.select(this).property("checked");
        var chartName = d3.select(this).property("id");
        console.log(chartName);
        var paramOnChartsList = newUserSetting.parameters[d].visuals;
        if(paramOnChartsList == null) paramOnChartsList=[];

        if(ifChecked){
            paramOnChartsList.push(chartName);
        }else
        {
            paramOnChartsList.splice( paramOnChartsList.indexOf(chartName), 1 );
        }
        newUserSetting.parameters[d].visuals = paramOnChartsList;
        console.log(paramOnChartsList);
        
    });
    })
    //<div class="checkbox">
    //<label><input type="checkbox" value="">Option 2</label>
    //</div>



    // div.data(chartNames)
    // .append("li")
    // .append("div")
    // .attr("class", "checkbox")
    // .append("label").text(function(d){console.log(d); return d;})
    // .append("input").attr("type", "checkbox").attr("value", "checkbox").attr("id", function(d){return d;})
    // .on('click',function(e){
    //     var ifChecked = d3.select(this).property("checked");
    //     var chartName = d3.select(this).property("id");
    //     console.log(chartName);
    //     var paramOnChartsList = newUserSetting.parameters[d].visuals;
    //     if(paramOnChartsList == null) paramOnChartsList=[];

    //     if(ifChecked){
    //         paramOnChartsList.push(chartName);
    //     }else
    //     {
    //         paramOnChartsList.splice( paramOnChartsList.indexOf(chartName), 1 );
    //     }
    //     newUserSetting.parameters[d].visuals = paramOnChartsList;
    //     console.log(paramOnChartsList);
        
    // });
}

function string_as_unicode_escape(input) {
    var output = '';
    for (var i = 0, l = input.length; i < l; i++)
        output += input.charCodeAt(i).toString(16);

    return output;
}

function updateView(){
    _settings =  newUserSetting;
    console.log("calling buildAll()");
    
    //buildAll();
}

function saveSettings(){
   
   

    var exportJson = _settings;

    var JsonContent = "data:attachment/json;charset=utf-8,";
    var settingStr = JSON.stringify(_settings);
    console.log(settingStr);
    JsonContent += encodeURI(settingStr);

    var a = d3.select("body")
        .append("a")
        .attr("href", JsonContent)
        .attr("target", '_blank')
        .attr("download", 'settings.json');

    a[0][0].click();
    //buildAll();
}

function genID() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

// function chartSettingBtn() {
//     var expanded = d3.select("#paramSettingBtn").property("aria-expanded")
//     console.log(expanded);
    
//     if(expanded){
//         d3.select("#paramSettingBtn").html().on("click")();
//     }

// }
// function paramSettingBtn() {
//     d3.select("#chartSettingBtn").attr("aria-expanded",false).attr("class","");
    
// }