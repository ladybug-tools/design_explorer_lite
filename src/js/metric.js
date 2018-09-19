
precisionRound = function(number, precision) {
      if (isNaN(parseFloat(number))) {
        return number
      } else{
        var factor = Math.pow(10, precision);
    		return Math.round(number * factor) / factor;
      }
		}

buildMetric = function(metricValue, propertiesDict) {
  // set default values
  width = 4
  height = 100
  decimals = 1
  units = ""
  longName = ""
  id = genID()

  // check the properties dictionary to see if any are overridden
  if ("width" in propertiesDict){
    width = propertiesDict["width"].toString()
  }
  if ("height" in propertiesDict){
    height = propertiesDict["height"].toString()
  }
  if ("decimals" in propertiesDict){
    decimals = propertiesDict["decimals"]
  }
  if ("units" in propertiesDict){
    units = propertiesDict["units"]
  }
  if ("longName" in propertiesDict){
    longName = propertiesDict["longName"]
  }

  // convert svg width in 12/ths to pixels.
  windowTwelf = parseInt(window.innerWidth/12)
  width = (windowTwelf * width) - 2
  if (height <= 12) {
    height = (windowTwelf * height)
  }

  // add the image to the svg
  var svgT = d3.select("#metrics").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('id', id)

  svgT.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", '#f2f2f2');

  svgT.append("text")
    .attr("class", "resultText")
    .attr("text-anchor", "middle")
    .attr("fill", "#000")
    .attr("x", width/2)
    .attr("y", 35)
    .style('font-size', '30px')
    .style('font-family', 'sans-serif')
    .text(precisionRound(metricValue, decimals).toString());

    svgT.append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "#000")
      .attr("x", width/2)
      .attr("y", 55)
      .style('font-size', '15px')
      .style('font-family', 'sans-serif')
      .text(units);

    svgT.append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "#000")
      .attr("x", width/2)
      .attr("y", 75)
      .style('font-size', '15px')
      .style('font-family', 'sans-serif')
      .text(longName);

  return {'svg': svgT, 'decimals': decimals}
}


updateMetric = function(obj, num) {
  svgT = obj['svg']
  decimals = obj['decimals']
  svgT.selectAll('.resultText').remove();

  svgT.append("text")
        .attr("class", "resultText")
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("x", width/2)
        .attr("y", 35)
    		.style('font-size', '30px')
    		.style('font-family', 'sans-serif')
   			.text(precisionRound(num, decimals).toString());
}
