
buildImage = function(imageName, propertiesDict) {
  // set default values
  width=12
  height=4
  margin={top:0,right:0,bottom:0,left:0}

  // check the properties dictionary to see if any are overridden
  if ("width" in propertiesDict){
    width = propertiesDict["width"]
  }
  if ("height" in propertiesDict){
    height = propertiesDict["height"]
  }
  if ("margin" in propertiesDict){
    margin = propertiesDict["margin"]
  }

  // convert svg width in 12/ths to pixels.
  windowTwelf = parseInt(window.innerWidth/12)
  width = (windowTwelf * width) - 5
  height = (windowTwelf * height) - 5

  // get the google drive URL from the image name
  URL = _googleObject["imgFiles"][imageName]

  // add the image to the svg
  var svg = d3.select("#content").append("svg")
    .attr("width", width)
    .attr("height", height)

    svg.append("image")
        .attr('xlink:href', URL)
        .attr('class', 'pico')
        .attr('width', width - margin.left - margin.right)
    		.attr('height', height - margin.bottom - margin.top)
    		.attr('x', margin.left)
    		.attr('y', margin.bottom)
    		.attr("class","imgdisplay")

  imgObj = {'svg': svg, 'width': width, 'height': height, 'margin': margin}
  return imgObj
}

updateImage = function(imgObj, updateImageName) {
  // grab important paramters from the object
  svg = imgObj['svg']

  // delete old image.
  svg.selectAll('.imgdisplay').remove();

  // get the google drive URL from the image name
  URL = _googleObject["imgFiles"][updateImageName]

  svg.append("image")
        .attr('xlink:href', URL)
        .attr('class', 'pico')
        .attr('width', imgObj['width'] - imgObj['margin'].left - imgObj['margin'].right)
    		.attr('height', imgObj['height'] - imgObj['margin'].bottom - imgObj['margin'].top)
    		.attr('x', imgObj['margin'].left)
    		.attr('y', imgObj['margin'].bottom)
    		.attr("class","imgdisplay")
}
