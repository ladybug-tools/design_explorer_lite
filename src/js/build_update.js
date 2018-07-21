
buildAll = function() {
  // dictionaries for different visualizations
  barCharts = {}
  metrics = {}
  image = {}

  // get the first row of data, which will be used to generate the default starting grahpics
  defaultData = _allData[0]
  paramsForViz = d3.keys(_settings['parameters'])
  visuals = d3.keys(_settings['visuals'])

  // loop through the data referenced in the settings_lite.json to find the charts + images that should be built.
  for (i = 0; i < paramsForViz.length; i++) {
    if ("visuals" in _settings['parameters'][paramsForViz[i]]) {
      paramName = paramsForViz[i]
      vizes = _settings['parameters'][paramName]["visuals"]
      for (j = 0; j < vizes.length; j++) {
        vizName = vizes[j]
        vizType = _settings['visuals'][vizName]["type"]
        if (vizType == 'barChart') {
          if (vizName in barCharts) {
            barCharts[vizName]['data'].push(parseFloat(defaultData[paramName]))
          } else {
            barCharts[vizName] = {'props': _settings['visuals'][vizName]}
            barCharts[vizName]['data'] = [parseFloat(defaultData[paramName])]
          }
        if (vizType == 'metric') {
          metrics[vizName] = {'props': _settings['visuals'][vizName]}
          metrics[vizName]['data'] = [parseFloat(defaultData[paramName])]
        }
      }
    }
  }
}

  // assemble the image in the scene
  if ("img" in defaultData) {
    imgProps = {}
    for (i = 0; i < visuals.length; i++) {
      vizName = visuals[i]
      if (_settings['visuals'][vizName]["type"] == 'image'){
        imgProps = _settings['visuals'][vizName]
      }
    }
    image['object'] = buildImage(defaultData['img'], imgProps)
  }

  // assemble all of the bar charts in the scene
  barChartNames = d3.keys(barCharts)
  for (i = 0; i < barChartNames.length; i++) {
    barChartName =  barChartNames[i]
    barCharts[barChartName]['object'] = buildChart(barCharts[barChartName]['data'], barCharts[barChartName]['props'])
  }
}
