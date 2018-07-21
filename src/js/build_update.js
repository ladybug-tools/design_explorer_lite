
buildAll = function() {
  // dictionaries for different visualizations
  barCharts = {}
  metrics = {}

  // get the first row of data, which will be used to generate the default starting grahpics
  defaultData = _allData[0]
  console.log(defaultData)

  paramsForViz = d3.keys(_settings['parameters'])
  // loop through the data referenced in the settings_lite.json to find the charts + images that should be built.
  for (i = 0; i < paramsForViz.length; i++) {
    if ("visuals" in _settings['parameters'][paramsForViz[i]]) {
      paramName = paramsForViz[i]
      console.log(paramName)
      vizes = _settings['parameters'][paramName]["visuals"]
      for (j = 0; j < vizes.length; j++) {
        vizName = vizes[j]
        vizType = _settings['visuals'][vizName]["type"]
        if (vizType == 'barChart') {
          if (vizName in barCharts) {
            barCharts[vizName]['data'].push(defaultData[paramName])
          } else {
            barCharts[vizName] = {'props': _settings['visuals'][vizName]}
            barCharts[vizName]['data'] = [defaultData[paramName]]
          }
        }
      }
    }
  }

  console.log(barCharts)
}
