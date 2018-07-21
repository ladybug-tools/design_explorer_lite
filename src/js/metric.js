
function precisionRound(number, precision) {
  		var factor = Math.pow(10, precision);
  		return Math.round(number * factor) / factor;
		}


buildMetric = function(metricValue, propertiesDict) {
  // set default values
  width = '4'
  decimals = 1
  units = ""
  longName = ""
  id = '_' + Math.random().toString(36).substr(2, 9)

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
   '<div class= "metricval" id=" '+ id +' ">' + precisionRound(metricValue, decimals).toString() +
   '</div>' +
   '<p>' + units + '<br>' + longName + '</p>'+
   '</div>');

  return id
}
