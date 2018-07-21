
buildAll = function() {
  // dictionaries for different visualizations
  barCharts = {}
  metrics = {}
  image = {}

  // get the first row of data, which will be used to generate the default starting grahpics
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
            barCharts[vizName]['indices'].push(paramName)
            if ("longName" in _settings['parameters'][paramName]){
              barCharts[vizName]['props']['dataNames'].push(_settings['parameters'][paramName]["longName"])
            } else{
              barCharts[vizName]['props']['dataNames'].push(paramName)
            }
          } else {
            barCharts[vizName] = {'props': _settings['visuals'][vizName]}
            barCharts[vizName]['indices'] = [paramName]
            barCharts[vizName]['props']['dataNames'] = []
            if ("longName" in _settings['parameters'][paramName]){
              barCharts[vizName]['props']['dataNames'].push(_settings['parameters'][paramName]["longName"])
            } else{
              barCharts[vizName]['props']['dataNames'].push(paramName)
            }
          }
        }
      if (vizType == 'metric') {
        metrics[vizName] = {'props': _settings['visuals'][vizName]}
        if ("longName" in _settings['parameters'][paramName]){
          metrics[vizName]['props']['longName'] = _settings['parameters'][paramName]["longName"]
        }
        if ("unit" in _settings['parameters'][paramName]){
          metrics[vizName]['props']['units'] = _settings['parameters'][paramName]["unit"]
        }
        metrics[vizName]['indices'] = [paramName]
      }
    }
  }
}

  _currentRow = _allData[0]
  // assemble the image in the scene
  if ("img" in _currentRow) {
    imgProps = {}

    // get any over-ridden properties
    for (i = 0; i < visuals.length; i++) {
      vizName = visuals[i]
      if (_settings['visuals'][vizName]["type"] == 'image'){
        imgProps = _settings['visuals'][vizName]
      }
    }

    image['object'] = buildImage(_currentRow['img'], imgProps)
  }

  // assemble all of the bar charts in the scene
  barChartNames = d3.keys(barCharts)
  for (i = 0; i < barChartNames.length; i++) {
    barChartName =  barChartNames[i]
    barCharts[barChartName]['object'] = buildChart(getData(barCharts[barChartName]['indices']), barCharts[barChartName]['props'])
  }

  // assemble all of the metrics in the scene
  metricNames = d3.keys(metrics)
  for (i = 0; i < metricNames.length; i++) {
    metricName =  metricNames[i]
    metrics[metricName]['object'] = buildMetric(getData(metrics[metricName]['indices'])[0], metrics[metricName]['props'])
  }
}


updateAll = function() {
  // update the image
  updateImage(image['object'], _currentRow['img'])

  // update all of the bar charts
  barChartNames = d3.keys(barCharts)
  for (i = 0; i < barChartNames.length; i++) {
    barChartName =  barChartNames[i]
    updateChart(barCharts[barChartName]['object'], getData(barCharts[barChartName]['indices']))

  // update the metricNames
  metricNames = d3.keys(metrics)
  for (i = 0; i < metricNames.length; i++) {
    metricName =  metricNames[i]
    updateMetric(metrics[metricName]['object'], getData(metrics[metricName]['indices'])[0])
}


getData = function(indices){
  finalList = []
  for  (k = 0; k < indices.length; k++) {
    finalList.push(parseFloat(_currentRow[indices[k]]))
  }
  return finalList
}
