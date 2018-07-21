testParams = ["Cooling[kBTU/sf]","CoolingPk[Tons]"];

function drawSettingViewBody() {
    
    var params = testParams;//TODO: _parameters will be the final
    var settingViewBodyDIV = d3.select("#settingViewBody");

    var newUserSetting = {
        'visuals': {
            'bar_chart_1': { 'type': 'barChart', 'dataColors': ["rgb(255,255,0)", "rgb(191,191,191)", "rgb(255,0,102)", "rgb(0,176,240)", "rgb(166,216,110)", "rgb(119,185,49)"], 'stacked' : true, 'yAxisText': ['EUI', 'kBtu/sf'] },
            'bar_chart_2': { 'type': 'barChart', 'dataNames': ['Cooling', 'Heating'], 'dataColors': ["rgb(24,77,138)", "rgb(168,5,0)"], 'stacked' : false, 'yAxisText': ['Peak Load', '(BTU/hr-sf)'] },
            'eui': { 'type': 'metric' },
            'options_image': { type: 'image', 'width': 6 }
        },
        'parameters': {
            'LabR[%]' : {'longName': 'Lab to NonLab Ratio', 'unit':'%'},
            'FFR [%]' : {'longName': 'Facade-to-Floor', 'unit':'%'},
            'UnderGrnd [%]' : {'longName': 'Fract Underground', 'unit':'%'},
            'GlzR [%]' : {'longName': 'Glazing Ratio', 'unit':'%'},
            'Uvalue [IP]' : {'longName': 'Window U-Value'},
            'HVAC' : {'longName': 'HVAC Type'},
            'HeatRecov' : {'longName': 'Heat Recovery'},
            'LabACH' : {'longName': 'Lab Ventilation'},
            'Plant' : {'longName': 'Thermal Source'},
            'Cooling' : {'longName': 'Cooling Energy', 'unit':'kBtu/sf', 'visuals':['bar_chart_1']},
            'Heating' : {'visuals':['bar_chart_1']},
            'Lighting' : {'visuals':['bar_chart_1']},
            'Equipment' : {'visuals':['bar_chart_1']},
            'Fans' : {'visuals':['bar_chart_1']},
            'Pumps' : {'visuals':['bar_chart_1']},
            'PeakCool [Btu/h-sf]' : {'visuals':['bar_chart_2']},
            'PeakHeat [Btu/h-sf]' : {'visuals':['bar_chart_2']},
            'EUI [kBtu/sf]': {'unit':'kBtu/sf', 'visuals':['eui']}
        }
    };

    
    console.log(JSON.stringify(newUserSetting));
    

    //remove current
    settingViewBodyDIV.selectAll(".panel-default").remove();

    var selectList = settingViewBodyDIV.selectAll('.panel-default')
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