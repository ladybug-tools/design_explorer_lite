testParams = ["Cooling[kBTU/sf]","CoolingPk[Tons]"];
visualTypeSettings ={
    barChart:{
        name:"BarChart",
        stacked: true, 
        yAxisText: ['Y Axis Title', 'unit'],
        dataColors: ["rgb(255,255,0)", "rgb(191,191,191)", "rgb(255,0,102)", "rgb(0,176,240)", "rgb(166,216,110)", "rgb(119,185,49)"]
    },
    image:{
        name:"Image",
        width:12
    }
}

function drawSettingViewBody() {
    
    var params = testParams;//TODO: _parameters will be the final
    var settingViewBodyDIV = d3.select("#settingViewBody");
    //TODO: check _settings if exist

    newUserSetting = {
        'visuals': {
            'bar_chart_1': { 'type': 'barChart', 'dataColors': ["rgb(255,255,0)", "rgb(191,191,191)", "rgb(255,0,102)", "rgb(0,176,240)", "rgb(166,216,110)", "rgb(119,185,49)"], 'stacked' : true, 'yAxisText': ['EUI', 'kBtu/sf'] },
            'options_image': { 'type': 'image', 'width': 6 }
        },
        'parameters': {
        }
    };

    
    var visSettingDIV = settingViewBodyDIV.select("#visSettingList");
    //drawVisualsSettingViewBody(visSettingDIV, visualTypeSettings);

    var paraSettingDIV = settingViewBodyDIV.select("#dimSettingList");
    drawParamsSettingViewBody(paraSettingDIV,params);
}

_visChartList={}
function addBarChart(params) {
    var barChartTempDiv = d3.select("#barChartTemp");
    var newChartID = genID();
    var newChartInst = visualTypeSettings.barChart;
    d3.select("#visSettingList").append("div").html(barChartTempDiv.html())
    _visChartList[newChartID]=newChartInst;
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
    .attr("placeholder", function(d){return d;})
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
    .attr("placeholder", function(d){return d;})
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

    itemUnit.append("input")
    .attr("class", "form-control input-sm")
    .attr("placeholder", function(d){return d;})
    .attr("type", "text")
    .on("change", function(d){
        var value = $(this).val();
        if (newUserSetting.parameters[d] == null) {
            newUserSetting.parameters[d] = {longName:d,unit:""}
        }
        newUserSetting.parameters[d].unit = value;
    });


}

function addAvailableChartAsOptions(d, i){
    if (d3.event.defaultPrevented) return; // dragged
    var chartNames = d3.keys(_visChartList);
    var div = d3.select(this).select("availableCharts").append("ul");
    div.data(chartNames).enter().append("li").text(function(d){return d;});
}

function string_as_unicode_escape(input) {
    var output = '';
    for (var i = 0, l = input.length; i < l; i++)
        output += input.charCodeAt(i).toString(16);

    return output;
}

function updateView(){
    console.log("calling buildAll()");
    
    //buildAll();
}

function saveSettings(){
    console.log("calling saveSettings()");
    
    //buildAll();
}

function genID() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}