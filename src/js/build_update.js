
buildAll = function() {
  // dictionaries for different visualizations
  _barCharts = {}
  metrics = {}
  image = {}

  if (_settings != null){
    // There is already a settings_lite.json file that will help us build the page.

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
            if (vizName in _barCharts) {
              _barCharts[vizName]['indices'].push(paramName)
              if ("longName" in _settings['parameters'][paramName]){
                _barCharts[vizName]['props']['dataNames'].push(_settings['parameters'][paramName]["longName"])
              } else{
                _barCharts[vizName]['props']['dataNames'].push(paramName)
              }
            } else {
              _barCharts[vizName] = {'props': _settings['visuals'][vizName]}
              _barCharts[vizName]['indices'] = [paramName]
              _barCharts[vizName]['props']['dataNames'] = []
              if ("longName" in _settings['parameters'][paramName]){
                _barCharts[vizName]['props']['dataNames'].push(_settings['parameters'][paramName]["longName"])
              } else{
                _barCharts[vizName]['props']['dataNames'].push(paramName)
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
    barChartNames = d3.keys(_barCharts)
    for (i = 0; i < barChartNames.length; i++) {
      barChartName =  barChartNames[i]
      _barCharts[barChartName]['object'] = buildChart(getData(_barCharts[barChartName]['indices']), _barCharts[barChartName]['props'])
    }

    // assemble all of the metrics in the scene
    metricNames = d3.keys(metrics)
    for (i = 0; i < metricNames.length; i++) {
      metricName =  metricNames[i]
      metrics[metricName]['object'] = buildMetric(getData(metrics[metricName]['indices'])[0], metrics[metricName]['props'])
    }
  }
  else{
    // There is no settings_lite.json file and so we will just make a default image and metricNames
    _currentRow = _allData[0]
    // assemble the image in the scene
    if ("img" in _currentRow) {
      imgProps = {}
      image['object'] = buildImage(_currentRow['img'], {})
    }

    // assemble a list of output metrics.
    paramNames = d3.keys(_currentRow)
    for (i = 0; i < paramNames.length; i++) {
      paramName = paramNames[i]
      if (paramName.startsWith('out:')) {
        metrics[paramName] = {}
        metrics[paramName]['indices'] = [paramName]
      }
    }

    // assemble all of the metrics in the scene
    metricNames = d3.keys(metrics)
    for (i = 0; i < metricNames.length; i++) {
      metricName =  metricNames[i]
      metrics[metricName]['object'] = buildMetric(getData(metrics[metricName]['indices'])[0], {})
    }
  }

}


updateAll = function() {
  // update the image
  updateImage(image['object'], _currentRow['img'])

  // update all of the bar charts
  barChartNames = d3.keys(_barCharts)
  if (barChartNames.length > 0){
    barChartData = getData(_barCharts[barChartNames[0]]['indices'])
    barchartObj1 = _barCharts[barChartNames[0]]['object']
    updateChart(barchartObj1, barChartData)
  }
  if (barChartNames.length > 1){
    barChartData = getData(_barCharts[barChartNames[1]]['indices'])
    barchartObj2 = _barCharts[barChartNames[1]]['object']
    updateChart(barchartObj2, barChartData)
  }
  //updateChart(barchartObj, barChartData)
  //for (i = 0; i < barChartNames.length; i++) {
  //  console.log(barChartName)
  //  barChartName =  barChartNames[i]
  //  barchartObj = _barCharts[barChartName]['object']
  //  barChartData = getData(_barCharts[barChartName]['indices'])
  //  updateChart(barchartObj, barChartData)
  //}

  // update the metricNames
  for (i = 0; i < metricNames.length; i++) {
    metricName =  metricNames[i]
    updateMetric(metrics[metricName]['object'], getData(metrics[metricName]['indices'])[0])
  }
}


getData = function(indices){
  finalList = []
  for  (k = 0; k < indices.length; k++) {
    finalList.push(parseFloat(_currentRow[indices[k]]))
  }
  return finalList
}
