

buildChart = function(dataList, propertiesDict) {
  // set default values
  dataNames=[]
  dataColors =[]
  stacked=true,
  yAxisText=['Value','units']
  maxVal=null
  svgwidth=260
  svgheight=400
  margin={top:20,right:40,bottom:30,left:70})

  // check the properties dictionary to see if any are overridden
  if ("dataNames" in propertiesDict){
    dataNames = propertiesDict["dataNames"]
  }
  if ("dataColors" in propertiesDict){
    dataColors = propertiesDict["dataColors"]
  }
  if ("stacked" in propertiesDict){
    stacked = propertiesDict["stacked"]
  }
  if ("yAxisText" in propertiesDict){
    yAxisText = propertiesDict["yAxisText"]
  }
  if ("maxVal" in propertiesDict){
    maxVal = propertiesDict["maxVal"]
  }
  if ("svgwidth" in propertiesDict){
    svgwidth = propertiesDict["svgwidth"]
  }
  if ("svgheight" in propertiesDict){
    svgheight = propertiesDict["svgheight"]
  }
  if ("margin" in propertiesDict){
    margin = propertiesDict["margin"]
  }

  // calculate chart properties
  width = svgwidth - margin.left - margin.right
  height = svgheight - margin.top - margin.bottom
  barSpacer = svgwidth/10
  topBarFactor = 1.25
  if (stacked == true){
    barWidth = svgwidth/3
  } else {
    barWidth = (svgwidth/2) / dataList.length
  }

  // auto-set the max val if it isn't set to anything
  if (maxVal == null){
    if (stacked == true){
      maxVal = topBarFactor * dataList.reduce(function(a, b) { return a + b; }, 0);
    } else {
      maxVal = topBarFactor * Math.max(...dataList)
    }
  }

  // auto-set the dataNames if they are empty.
  if (dataNames.length == 0){
    for (i = 0; i < dataList.length; i++) {
      dataNames.push('Var ' + i.toString())
      console.log(i)
    }
  }

  // auto-generate colors if they are empty.
  if (dataColors.length == 0){
    var f=d3.interpolateHsl("rgb(255,0,102)", "rgb(0,176,240)")
    for (var i=0; i<dataList.length; i++) {
      dataColors.push(f(i/(dataList.length-1)))
    }
  }

  var x = d3.scaleBand()
    .rangeRound([0, svgwidth])
    .padding(0.1)
    .align(0.1);

  var yScale = d3.scaleLinear()
        .domain([0,	maxVal])
        .rangeRound([height, 0]);

  var svg = d3.select("#content").append("svg")
  .attr("width", svgwidth)
  .attr("height", svgheight)

  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // add the y-axis labels
  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yScale).ticks(10, "s"))

  if (yAxisText.length > 0) {
    for (i = 0; i < yAxisText.length; i++) {
      if (i == 0){
        textHeight = '14px'
      } else{
        textHeight = '11px'
      }
      g.append("text")
          .attr("x", 10)
          .attr("y", yScale(yScale.ticks(10).pop()) + (i * 14))
          .attr("dy", "0.35em")
          .attr("text-anchor", "start")
          .attr("fill", "#000")
          .style('font-size', textHeight)
          .style('font-family', 'sans-serif')
          .text(yAxisText[i]);
      }
  }

  // add the legend
    spacerIncrement = 0
    for (i = 0; i < dataList.length; i++) {
      svg.append("rect")
        .attr("x", svgwidth - 11)
        .attr("y", margin.top + spacerIncrement)
        .attr("width", 10)
        .attr("height", 10)
        .attr('fill', dataColors[i])
        .style("stroke", "#000")
        .style("stroke-width", "0.05em");
      svg.append("text")
        .attr("x",svgwidth - 15)
        .attr("y", margin.top + spacerIncrement)
        .attr("dy", "10px")
        .attr("text-anchor", "end")
        .attr("fill", "#000")
        .style('font-family', 'sans-serif')
        .style('font-size', '12px')
        .text(dataNames[i]);
      spacerIncrement += 20
    }

  // add the data
  if (stacked == true){
    stackIncrement = 0
    for (i = 0; i < dataList.length; i++) {
      svg.append("rect")
        .attr("x", margin.left + barSpacer)
        .attr("y", svgheight- margin.bottom - yScale(maxVal-dataList[i]) - yScale(maxVal - stackIncrement))
        .attr("width", barWidth)
        .attr("height", yScale(maxVal - dataList[i]))
        .attr('fill', dataColors[i])
        .attr("class", "dataBar")
        .style("stroke", "#000")
        .style("stroke-width", "0.05em");
      stackIncrement += dataColors[i]
    }
  } else{
    for (i = 0; i < dataList.length; i++) {
        svg.append("rect")
          .attr("x", margin.left + barSpacer + barWidth * i)
          .attr("y", svgheight- margin.bottom - yScale(maxVal-dataList[i]))
          .attr("width", barWidth)
          .attr("height", yScale(maxVal - dataList[i]))
          .attr('fill', dataColors[i])
        	.attr("class", "dataBar")
          .style("stroke", "#000")
          .style("stroke-width", "0.05em");
			}
  }

  chartObj = {'svg': svg, 'stacked': stacked, 'margin': margin,
    'svgheight': svgheight, 'barSpacer': barSpacer, 'yScale': yScale,
    'maxVal': maxVal, 'barWidth': barWidth, 'dataColors': dataColors}

  return chartObj
}



// Function to update the chart.
updateChart = function(chartObj, updatedData=[]){
  // grab important paramters from the object
  svg = chartObj['svg']
  stacked = chartObj['stacked']
  yScale = chartObj['yScale']

  // delete old bars from the chart.
  svg.selectAll('.dataBar').remove();

  // add new bars to the chart.
  stackIncrement = 0
  if (stacked == true){
    stackIncrement = 0
    for (i = 0; i < updatedData.length; i++) {
      svg.append("rect")
        .attr("x", chartObj['margin'].left + chartObj['barSpacer'])
        .attr("y", chartObj['svgheight']- chartObj['margin'].bottom - yScale(chartObj['maxVal']-updatedData[i]) - yScale(chartObj['maxVal'] - stackIncrement))
        .attr("width", chartObj['barWidth'])
        .attr("height", yScale(chartObj['maxVal'] - updatedData[i]))
        .attr('fill', chartObj['dataColors'][i])
        .attr("class", "dataBar")
        .style("stroke", "#000")
        .style("stroke-width", "0.05em");
      stackIncrement += updatedData[i]
    }
  } else{
    for (i = 0; i < updatedData.length; i++) {
        svg.append("rect")
          .attr("x", chartObj['margin'].left + chartObj['barSpacer'] + chartObj['barWidth'] * i)
          .attr("y", chartObj['svgheight'] - chartObj['margin'].bottom - yScale(chartObj['maxVal']-updatedData[i]))
          .attr("width", chartObj['barWidth'])
          .attr("height", yScale(chartObj['maxVal'] - updatedData[i]))
          .attr('fill', chartObj['dataColors'][i])
        	.attr("class", "dataBar")
          .style("stroke", "#000")
          .style("stroke-width", "0.05em");
			}
  }
}
