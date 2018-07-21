
precisionRound = function(number, precision) {
  		var factor = Math.pow(10, precision);
  		return Math.round(number * factor) / factor;
		}

buildMetric = function(metricValue, propertiesDict) {
  // set default values
  width = '4'
  decimals = 1
  units = ""
  longName = ""
  id = genID()

  // check the properties dictionary to see if any are overridden
  if ("width" in propertiesDict){
    width = propertiesDict["width"].toString()
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
  width = (windowTwelf * width) - 5
  styleString ='width:'+ width +'px;'


  $('#metrics').append(
   '<div class= "metricdiv" style= "'+ styleString +'">'+
   '<div class= "metricval" id="'+ id +'">' + precisionRound(metricValue, decimals).toString() +
   '</div>' +
   '<p>' + units + '<br>' + longName + '</p>'+
   '</div>');

  return id
}

updateMetric = function(id, num) {
  uId = "#" + id.toString()
  d3.select(uId).remove()
  d3.select(uId).append("text")
        .attr("text-anchor", "start")
        .attr("fill", "#000")
    		.style('font-size', '30px')
    		.style('font-family', 'sans-serif')
   			.text(num.toString());
}
