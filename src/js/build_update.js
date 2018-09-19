
// BUILD ALL OF THE OUTPUT CONTENT
buildAll = function() {
  // set styles of key elements on the paramSettingView
  d3.selectAll('#study_results')
    .style("width", window.innerWidth.toString()+'px')

  stylizeSliders()

  // dictionaries for different visualizations
  _barCharts = {}
  metrics = {}
  images = {}

  if (_settingsFromFile == true){
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

    getSliderStateAndPushCsvRow(false)
    // assemble the image in the scene
    d3.keys(_currentRow).forEach((key) => {
      if (key.startsWith('img')) {
        imgFound = false

        // get any over-ridden properties
        visuals.forEach((vizName) => {
          if (_settings['visuals'][vizName]["type"] == 'image' && key == vizName){
            imgFound = true
            images[key] = {}
            images[key]['props'] = _settings['visuals'][vizName]
          }
        });
        if (imgFound == true) {
          images[key]['object'] = buildImage(_currentRow[key], images[key]['props'])
        }
      }
    });

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
    getSliderStateAndPushCsvRow(false)

    // assemble the image(s) in the scene
    d3.keys(_currentRow).forEach((key) => {
      if (key.startsWith('img')) {
        images[key] = {}
      }
    });
    // set a default width based on the number of images there are
    imgWidth = 12/d3.keys(images).length
    d3.keys(images).forEach((image) => {
      images[image]['object'] = buildImage(_currentRow[image], {'width': imgWidth})
    });

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
    var numSliders = metricNames.length
    metricWidth = 2
    if (numSliders <= 2){
      metricWidth = 6
    } else if (numSliders == 3 || numSliders == 6 || numSliders == 9) {
      metricWidth = 4
    } else if (numSliders == 4 || numSliders == 8) {
      metricWidth = 3
    } else if (numSliders == 5 || numSliders == 10) {
      metricWidth = 2.4
    } else if (numSliders == 7) {
      metricWidth = 1.71428
    }

    for (i = 0; i < metricNames.length; i++) {
      metricName =  metricNames[i]
      lonName = metricName.split('out:')[1]
      metrics[metricName]['object'] = buildMetric(getData(metrics[metricName]['indices'])[0], {'width': metricWidth, 'longName': lonName})
    }
  }

}

// UPDATE ALL OF THE OUTPUT CONTENT
updateAll = function() {
  // update the image
  d3.keys(images).forEach((image) => {
    updateImage(images[image]['object'], _currentRow[image])
  });

  // update all of the bar charts
  d3.keys(_barCharts).forEach((barChartName) => {
    barchartObj = _barCharts[barChartName]['object']
    barChartData = getData(_barCharts[barChartName]['indices'])
    updateChart(barchartObj, barChartData)
  });

  // update the metricNames
  for (i = 0; i < metricNames.length; i++) {
    metricName =  metricNames[i]
    updateMetric(metrics[metricName]['object'], getData(metrics[metricName]['indices'])[0])
  }
}

getData = function(indices){
  finalList = []
  for  (k = 0; k < indices.length; k++) {
    if (isNaN(parseFloat(_currentRow[indices[k]]))){
      console.log(_currentRow[indices[k]])
      finalList.push(_currentRow[indices[k]])
    } else {
      finalList.push(parseFloat(_currentRow[indices[k]]))
    }
  }
  return finalList
}


// DELETE ALL OF THE OUTPUT CONTENT
deleteAll = function() {
  // delete all output svg grahpics
  d3.selectAll('svg').remove();

  // delete all input slider divs
  d3.selectAll('.slider').remove();
}
