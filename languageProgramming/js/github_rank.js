function looper(creation_year, issues, starts, lang_info){

// Prehandler 
////////////////////////////////////////////////////////////// 
/////////////////////////// issues /////////////////////////////
////////////////////////////////////////////////////////////// 

////////////// Boy stuff ////////////////

allBoyNames = [];
boyNamesByID = [];
issues.forEach(function(d,i) {
    allBoyNames[i] = d.name;
	boyNamesByID[d.name] = i;
});

// 49 elements 
var colorissues = d3.scale.ordinal()
		.range(["#B5C660", "#B3C762", "#B0C765", "#ADC767", "#AAC769", "#A7C76A", "#A3C66B", "#9FC46B", "#9AC26A", 
		"#94BF68", "#8EBB66", "#87B662", "#7FB05E", "#75AA5A", "#6BA354", "#609B4F", "#549249", "#478943", "#39803D", 
		"#2C7739", "#206F36", "#166A35", "#0F6638", "#0B663E", "#0C6A48", "#127257", "#1B7D6A", "#27897F", "#359795", 
		"#42A4AB", "#4EB0C0", "#58BAD3", "#5DBFE2", "#5DC0EC", "#5ABCF2", "#52B5F4", "#49ABF3", "#3E9FEE", "#3292E7", 
        "#2785DE", "#1E77D3", "#176AC7", "#125EBA", "#0F53AB", "#0E489C", "#0D3E8D", "#0E347D", "#0F2B6C", "#11215C"])
        
        // .range(["#B5C660", "#B3C762", "#B0C765", "#ADC767", 
		// "#42A4AB", "#4EB0C0", "#58BAD3", "#5DBFE2", "#5DC0EC", "#5ABCF2", "#52B5F4", "#49ABF3", "#3E9FEE", "#3292E7", 
        // "#2785DE", "#1E77D3", "#176AC7", "#125EBA", "#0F53AB", "#0E489C", "#0D3E8D", "#0E347D", "#0F2B6C", "#11215C"])
        
		.domain(allBoyNames);

////////////////////////////////////////////////////////////// 
/////////////////////////// starts /////////////////////////////
////////////////////////////////////////////////////////////// 		
allGirlNames = [];
girlNamesByID = [];
starts.forEach(function(d,i) {
    allGirlNames[i] = d.name;
	girlNamesByID[d.name] = i;
});

// 86 elements
// 33 elements

var colorstarts = d3.scale.ordinal()
		.range(["#FFC600", "#FEC606", "#FEC60B", "#FDC710", "#FDC716", "#FCC61B", "#FCC61F", "#FCC523", "#FBC427", 
		"#FBC22B", "#FBC02D", "#FBBD2F", "#FBBA31", "#FBB632", "#FBB132", "#FCAC31", "#FCA730", "#FDA12F", "#FD9B2D", 
		"#FE952C", "#FE8F2A", "#FF8929", "#FF8428", "#FF7E27", "#FF7927", "#FF7527", "#FF7128", "#FE6E29", "#FE6A2B", 
		"#FD682D", "#FC652F", "#FB6330", "#FA6032", "#F95E33", "#F85C34", "#F65A34", "#F55733", "#F35432", "#F15230", 
		"#F04F2D", "#EE4B2A", "#EC4827", "#EA4524", "#E84221", "#E63E1F", "#E43B1D", "#E2381C", "#E0351C", "#DD321E", 
		"#DB3020", "#D92E25", "#D62C2B", "#D42A31", "#D22939", "#CF2841", "#CD274A", "#CB2754", "#C8275D", "#C62866", 
		"#C4296F", "#C22A77", "#BF2C7F", "#BD2E86", "#BB308C", "#B93391", "#B73596", "#B5389A", "#B33B9D", "#B13EA0", 
		"#AE41A2", "#AC43A3", "#A946A4", "#A648A4", "#A349A4", "#9F4AA3", "#9B4BA2", "#974BA1", "#934B9F", "#8E4A9D", 
		"#8A499A", "#854897", "#804795", "#7B4692", "#76448E", "#71438B", "#6C4188"])
		.domain(allGirlNames);
		
// New color band map to 40 years
var colorbands = d3.scale.ordinal().range(
	'#000000','#11050f','#1c0b18','#240f1f','#2e1126','#39122b','#441331','#4d1535','#581639','#63183c','#6d1a3f',
	'#791c41','#822042','#8d2343','#962844','#a02d44','#a93344','#b23943','#ba4042','#c24641','#ca4e3f','#d0563d',
	'#d75e3b','#de6639','#e36f36','#e87833','#ed8030','#f2892d','#f5922a','#f99b26','#fca622','#feb01e','#ffb919',
	'#ffc314','#ffcd0e','#ffd808','#ffe203','#ffec00','#fff500','#ffff00'
).domain(allGirlNames);

// 13 elements on bar plot
color_band = ["#FFC600","#FDC716","#FF7E27","#FD682D","#F85C34","#F04F2D","#DB3020","#C4296F", "#C4296F", "#B93391", "#AE41A2", "#8A499A", "#6C4188"];


var reverse_year_map = {
    2000: "2013 Q1",
    2001: "2013 Q2",
    2002: "2013 Q3",
    2003: "2013 Q4",
    2004: "2014 Q1",
    2005: "2014 Q2",
    2006: "2014 Q3",
    2007: "2014 Q4",
    2008: "2015 Q1",
    2009: "2015 Q2",
    2010: "2015 Q3",
    2011: "2015 Q4",
    2012: "2016 Q1",
    2013: "2016 Q2",
    2014: "2016 Q3",
    2015: "2016 Q4",
    2016: "2017 Q1",
    2017: "2017 Q2",
    2018: "2017 Q3",
    2019: "2017 Q4",
    2020: "2018 Q1"
};

// End of prehandler

var margin = {top: 20, right: 30, bottom: 30, left: 50},
marginAll = {top: 20, right: 30, bottom: 30, left: 50}
width = ($(".chart.focus").width()-10) - margin.left - margin.right,
heightBrush = 400 - margin.top - margin.bottom,
heightAll = 100 - marginAll.top - marginAll.bottom;

// Timeline structure by year. This is to make order correctly.
var startYear = 2000,
endYear = 2020,
yearRange = endYear - startYear;

//Stroke width per max position ordered by creation year.
var strokeWidth = [17,17,15,13,11,9,7,5,3,1];
var format_date = d3.time.format("%Y-%M").parse;

// Color maps
creation_year.sort(function(a,b){return a.year - b.year})
var history_map = {}
var language_year_map = {}
creation_year.forEach(function(d,i){
	history_map[d["Name"]] = i
	language_year_map[d["Name"]] = d["year"]
})


// Initial attribute data
var attribute = "issues";

//Variables needed for the looping
var allNames = allGirlNames.concat(allBoyNames);
var allattributes = Array.apply(null, new Array(allGirlNames.length)).map(String.prototype.valueOf,"starts").concat(Array.apply(null, new Array(allBoyNames.length)).map(String.prototype.valueOf,"issues"));

// Initilize color and name
var color = (attribute === "issues" ? colorissues : colorstarts);
var namesByID = (attribute === "issues" ? boyNamesByID : girlNamesByID);

//////////////////////////////////////////////////////////////
////////////////////// Color Legend //////////////////////////
//////////////////////////////////////////////////////////////
var marginLegend = {top: 15, right: 30, bottom: 10, left: 30},
    widthLegend = Math.min($(".colorLegend").width(),350) - marginLegend.left - marginLegend.right,
	heightLegend = 25;

//Create color legend SVG
var colorLegend = d3.select(".colorLegend").append("svg")
    .attr("width", widthLegend + marginLegend.left + marginLegend.right)
    .attr("height", heightLegend + marginLegend.top + marginLegend.bottom)
  .append("g")
	.attr("class", "colorLegendWrapper")
    .attr("transform", "translate(" + marginLegend.left + "," + marginLegend.top + ")");

//Create the gradient to fill the legend rect when issues are selected
var legendGradientBoy = colorLegend.append("defs")
	.append("linearGradient")
	.attr("id", "legendGradientBoy")
	.attr("gradientUnits", "userSpaceOnUse")
	.attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "0%")
	.attr("spreadMethod", "pad")
	.selectAll("stop")
	.data(colorissues.range())
	.enter().append("stop")
	.attr("offset", function(d,i) { return Math.floor(i/(colorissues.range().length+20)*100) + "%"; })
	.attr("stop-color", function(d) { return d; });
//Create the gradient to fill the legend rect when starts are selected
var legendGradientGirl = colorLegend.append("defs")
	.append("linearGradient")
	.attr("id", "legendGradientGirl")
	.attr("gradientUnits", "userSpaceOnUse")
	.attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "0%")
	.attr("spreadMethod", "pad")
	.selectAll("stop")
	.data(colorstarts.range())
	.enter().append("stop")
	.attr("offset", function(d,i) { return Math.floor(i/(colorstarts.range().length+20)*100) + "%"; })
	.attr("stop-color", function(d) { return d; });

//////////////////////////////////////////////////////////////
/////////////////// Left Slider Bar  /////////////////////////
//////////////////////////////////////////////////////////////

//Create the rectangle to be filled with color
colorLegend.append("rect")
		.attr("class", "colorkey")
		.attr("x", 0)
		.attr("y", -8)
		.attr("width", widthLegend)
		.attr("height", 16)
		.style("opacity", 0.7)
		.attr("fill", function(d) {
			if (attribute === "issues") return "url(#legendGradientBoy)";
			else return "url(#legendGradientGirl)";
		});

//Append the A, Z and explanation around the rectangle
colorLegend.append("text")
	.attr("x", 0)
	.attr("y", 20)
	.style("font-size", 14)
	.style("text-anchor", "middle")
	.text("1972");

colorLegend.append("text")
	.attr("x", widthLegend)
	.attr("y", 20)
	.style("font-size", 14)
	.style("text-anchor", "middle")
	.text("2012");

//////////////////////////////////////////////////////////////
/////////////////// Right side bar  //////////////////////////
//////////////////////////////////////////////////////////////

// Create stroke width legend SVG
var strokeLegend = d3.select(".widthLegend").append("svg")
    .attr("width", widthLegend + marginLegend.left + marginLegend.right)
    .attr("height", heightLegend + marginLegend.top + marginLegend.bottom)
  .append("g")
	.attr("class", "strokeLegendWrapper")
    .attr("transform", "translate(" + marginLegend.left + "," + marginLegend.top + ")");

//Width of one rectangle
var rectWidth = widthLegend/strokeWidth.length * 0.8;
//Create the rectangles per stroke thickness
strokeLegend.selectAll(".strokeKey")
		.data(strokeWidth)
		.enter().append("rect")
			.attr("class", "strokeKey")
			.attr("x", function (d,i) { return widthLegend/strokeWidth.length * i; })
			.attr("y", function(d,i) { return -d/2 ;})
			.attr("width",rectWidth)
			.attr("height", function(d,i) { return d; })
			.style("opacity", 0.7)
			.style("shape-rendering", "crispEdges")
			.attr("fill", "#9C9C9C");
//Number below each rectangle
strokeLegend.selectAll(".strokeKeyText")
		.data(strokeWidth)
		.enter().append("text")
			.attr("class", "strokeKeyText")
			.attr("x", function (d,i) { return widthLegend/strokeWidth.length * i + rectWidth/2; })
			.attr("y", 20)
			.style("text-anchor", "middle")
			.text(function(d,i) { return i+1; });

//////////////////////////////////////////////////////////////
///////////////////// Scales & Axes //////////////////////////
//////////////////////////////////////////////////////////////

var xAll = d3.scale.linear().domain([startYear, endYear]).range([0, width]),
	xBrush = d3.scale.linear().domain([startYear, endYear]).range([0, width]),
	yAll = d3.scale.linear().domain([0.5,10.5]).range([0, heightAll]),
	yBrush = d3.scale.linear().domain([0.5,10.5]).range([0, heightBrush]);

var xAxisAll = d3.svg.axis().scale(xAll).orient("bottom").tickFormat(d3.format("d")),
	xAxisBrush = d3.svg.axis().scale(xBrush).orient("bottom").tickFormat(d3.format("d")).tickSize(0),
	yAxisBrush = d3.svg.axis().scale(yBrush).orient("left").tickSize(0);


// var xDate = d3.scale.linear().domain([startYear, endYear]).range([0, width])

var xDate = d3.time.scale().domain([format_date("2013-01"), format_date("2018-00")]).nice(d3.time.month).range([0, width]);
var new_date  = d3.svg.axis().scale(xDate).orient("bottom");
// var xAxisAll = d3.svg.axis().scale(xAll).orient("bottom").tickFormat(d3.format("d"))



//////////////////////////////////////////////////////////////
/////////////// Other initializations ////////////////////////
//////////////////////////////////////////////////////////////

// Line inteactive both for brush and picture.
var lineAll = d3.svg.line()
    .x(function(d) { return xAll(d.year); })
    .y(function(d) { return yAll(d.position); });

var lineBrush = d3.svg.line()
	.interpolate("monotone") //Slight rounding without too much deviation
    .x(function(d) { return xBrush(d.year); })
    .y(function(d) { return yBrush(d.position); });

//////////////////////////////////////////////////////////////
//////////////////////// Context /////////////////////////////
//////////////////////////////////////////////////////////////

// Context is the lines in the brush bar.
//Create context SVG

var context = d3.select(".chart.context").append("svg")
    .attr("width", width + marginAll.left + marginAll.right)
    .attr("height", heightAll + marginAll.top + marginAll.bottom)
  .append("g")
	.attr("class", "contextWrapper")
	.attr("transform", "translate(" + marginAll.left + "," + marginAll.top + ")");

//Append clippath to context chart
context.append("defs").append("clipPath")
    .attr("id", "clipContext")
    .append("rect")
    .attr("width", width)
    .attr("height", heightAll);

// Appendix for brush axis.
// Todo: Change this bar to another one with Time scale
context.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (heightAll+5) + ")")
  .attr("font-size", "20px")
  .call(new_date);

// Lines in the brush dashboard.
var linearGradientissues = context.selectAll(".linearGradientissues")
	.data(issues).enter()
	.append("linearGradient")
	.attr("class", "linearGradientissues")
	.attr("gradientUnits", "userSpaceOnUse")
	.attr("x1", xAll(startYear)).attr("y1", "0")
	.attr("x2", xAll(endYear)).attr("y2", "0")
	.attr("id", function(d) {return "line-gradient-issues-" + d.name; });
linearGradientissues.append("stop").attr("class", "start") .attr("offset", "0%").attr("stop-color", "#9E9E9E").attr("stop-opacity", 0.5);
linearGradientissues.append("stop").attr("class", "left") .attr("offset", "40%").attr("stop-color", "#9E9E9E").attr("stop-opacity", 0.5);
linearGradientissues.append("stop").attr("class", "left") .attr("offset", "40%").attr("stop-color", function(d) { return colorissues(d.name); }).attr("stop-opacity", 1);
linearGradientissues.append("stop").attr("class", "right") .attr("offset", "60%").attr("stop-color", function(d) { return colorissues(d.name); }).attr("stop-opacity", 1);
linearGradientissues.append("stop").attr("class", "right") .attr("offset", "60%").attr("stop-color", "#9E9E9E").attr("stop-opacity", 0.5);
linearGradientissues.append("stop").attr("class", "end") .attr("offset", "100%").attr("stop-color", "#9E9E9E").attr("stop-opacity", 0.5);


var linearGradientstarts = context.selectAll(".linearGradientstarts")
	.data(starts).enter()
	.append("linearGradient")
	.attr("class", "linearGradientstarts")
	.attr("gradientUnits", "userSpaceOnUse")
	.attr("x1", xAll(startYear)).attr("y1", "0")
	.attr("x2", xAll(endYear)).attr("y2", "0")
	.attr("id", function(d) {return "line-gradient-starts-" + d.name; });
linearGradientstarts.append("stop").attr("class", "start") .attr("offset", "0%").attr("stop-color", "#9E9E9E").attr("stop-opacity", 0.5);
linearGradientstarts.append("stop").attr("class", "left") .attr("offset", "40%").attr("stop-color", "#9E9E9E").attr("stop-opacity", 0.5);
linearGradientstarts.append("stop").attr("class", "left") .attr("offset", "40%").attr("stop-color", function(d) { return colorstarts(d.name); }).attr("stop-opacity", 1);
linearGradientstarts.append("stop").attr("class", "right") .attr("offset", "60%").attr("stop-color", function(d) { return colorstarts(d.name); }).attr("stop-opacity", 1);
linearGradientstarts.append("stop").attr("class", "right") .attr("offset", "60%").attr("stop-color", "#9E9E9E").attr("stop-opacity", 0.5);
linearGradientstarts.append("stop").attr("class", "end") .attr("offset", "100%").attr("stop-color", "#9E9E9E").attr("stop-opacity", 0.5);

//////////////////////////////////////////////////////////////
////////////////////////// Focus /////////////////////////////
//////////////////////////////////////////////////////////////


//Create focus SVG
var focus = d3.select(".chart.focus").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", heightBrush + margin.top + margin.bottom)
  .append("g")
	.attr("class", "focusWrapper")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Append clippath to focus chart
focus.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", heightBrush);

//Append x axis to focus chart
// Todo: remove the bar
// focus.append("g")
//   .attr("class", "x axis")
//   .style("font-size", 13)
//   .attr("transform", "translate(0," + (heightBrush + 9) + ")")
//   .call(xAxisBrush);

//Append y axis to focus chart
focus.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(-10,0)")
  .attr("font-size","20px")
  .call(yAxisBrush)
.append("text")
  .attr("class", "titles")
  .attr("transform", "rotate(-90)")
  .attr("x", -(heightBrush/2))
  .attr("y", -35)
  .attr("dy", ".71em")
  .style("font-size", 20)
  .style("text-anchor", "middle")
  .text("Position in Top 10");

//////////////////////////////////////////////////////////////
//////////////////////// Namepop Area ////////////////////////
//////////////////////////////////////////////////////////////

var popUpName = focus.append("g")
    .attr("transform", "translate(-100,-100)")
    .attr("class", "popUpName")
	.style("pointer-events", "none");

popUpName.append("circle")
	.attr("class", "tooltipCircle")
    .attr("r", 3.5);

popUpName.append("text")
	.attr("id","upper_text")
	.style("font-size", 20)
	.style("font-weight","bold")
	.attr("class", "titles")
	.attr("y", -20)

popUpName.append("text")
	.attr("id","lower_text")
	.style("font-size", 12)
	.attr("class", "titles")
	.attr("y", 30)

// Second label

// popUpName.append("text")
// 	.style("font-size", 12)
// 	.attr("class", "titles")
//     .attr("y", -30);

//////////////////////////////////////////////////////////////
//////////////////////// Voronoi /////////////////////////////
//////////////////////////////////////////////////////////////

// Voronoi means parition of the data.

//Create a flat data version for the Voronoi per attribute
/*************************************************************/
var flatDataissues = [];
for (k in issues) {
		var k_data = issues[k];
		k_data.values.forEach(function(d) {
			if (d.position <= 10) flatDataissues.push({name: k_data.name, year: d.year, position: d.position});
		});
}//for k

var maxPositionissues = d3.nest()
	.key(function(d) { return d.name; })
	.rollup(function(d) {return d3.min(d, function(g) {return g.position;});})
	.entries(flatDataissues);

var flatDatastarts = [];
for (k in starts) {
		var k_data = starts[k];
		k_data.values.forEach(function(d) {
			if (d.position <= 10) flatDatastarts.push({name: k_data.name, year: d.year, position: d.position});
		});
}//for k
var maxPositionstarts = d3.nest()
	.key(function(d) { return d.name; })
	.rollup(function(d) {return d3.min(d, function(g) {return g.position;});})
	.entries(flatDatastarts);


var flatData = (attribute === "issues" ? flatDataissues : flatDatastarts);
var maxPosition = (attribute === "issues" ? maxPositionissues : maxPositionstarts);
var nestedFlatData = d3.nest().key(function(d) { return d.name; }).entries(flatData);

/*************************************************************/

//Initiate the voronoi function
var voronoi = d3.geom.voronoi()
    .x(function(d) { return xBrush(d.year); })
    .y(function(d) { return yBrush(d.position); })
    .clipExtent([[-margin.left, -margin.top], [width + margin.right, heightBrush + margin.bottom]]);

//Initiate the voronoi group element
var voronoiGroup = focus.append("g")
	.attr("class", "voronoi");

//Voronoi mouseover and mouseout functions
//Need to change this to achieve mouse move.
function mouseover(d) {
    focus.selectAll(".focus").style("opacity", 0.1);
    d3.selectAll(".focus."+d.name).style("opacity", 0.8);

	context.selectAll(".context").selectAll(".line").style("opacity", 0.1);
	context.selectAll(".context."+d.name).selectAll(".line")
		.style("opacity", 1)
		.style("stroke", color(d.name));

	//Move the tooltip to the front
	d3.select(".popUpName").moveToFront();
	//Change position, size of circle and text of tooltip
    popUpName.attr("transform", "translate(" + xBrush(d.year) + "," + yBrush(d.position) + ")");
	var circleSize = parseInt(d3.selectAll(".focus."+d.name).selectAll(".line").style("stroke-width"));
	popUpName.select(".tooltipCircle").style("fill", color_band[history_map[d.name]]).attr("r", circleSize);
	// Todo: Change this area to show the information of text.
	popUpName.select("#upper_text").text(
		d.name
		);
	popUpName.select("#lower_text").text(
		reverse_year_map[d.year]
		);
		d3.select(this).style("cursor", "pointer");
		// refresh(d);



}//mouseover

function mouseout(d) {
    focus.selectAll(".focus").style("opacity", 0.7);

	context.selectAll(".context").selectAll(".line")
		.style("opacity", null)
		.style("stroke", function(c) { return "url(#line-gradient-" + attribute + "-" + c.name + ")"; });

	popUpName.attr("transform", "translate(-100,-100)");
}//mouseout

//////////////////////////////////////////////////////////////
/////////////////////// Brushing /////////////////////////////
//////////////////////////////////////////////////////////////
// Change the brush type here.

//Taken and adjusted from: http://bl.ocks.org/mbostock/6498580
var centering = false,
	alpha = 1,
    center,
	moveType;

var arc = d3.svg.arc()
    .outerRadius(heightAll / 4)
    .startAngle(0)
    .endAngle(function(d, i) { return i ? -Math.PI : Math.PI; });

var brush = d3.svg.brush()
	.x(xAll)
	.extent([endYear - 15, endYear])
    .on("brush", brushmove)
    .on("brushend", brushend);;

//Set up the brush
var gBrush = context.append("g")
	.attr("class", "brush")
	.call(brush);

gBrush.selectAll(".resize").append("line")
	.attr("y2", heightAll);

gBrush.selectAll(".resize").append("path")
	.attr("d", d3.svg.symbol().type("triangle-up").size(100))
	.attr("transform", function(d,i) { return i ? "translate(" + -7 + "," +  heightAll / 2 + ") rotate(-90)" : "translate(" + 7 + "," +  heightAll / 2 + ") rotate(90)"; });

gBrush.selectAll("rect")
	.attr("height", heightAll);

gBrush.select(".background")
	.on("mousedown.brush", brushcenter)
	.on("touchstart.brush", brushcenter);

gBrush.call(brush.event);

function brushmove() {
	var extent = brush.extent();

	//Reset the x-axis brush domain and redraw the lines, circles and axis
	xBrush.domain(brush.empty() ? xAll.domain() : brush.extent());

	//Adjust the paths on lines
	focus.selectAll(".line").attr("d", function(d) { return lineBrush(d.values); });
	//Update the x axis on lines
	focus.select(".x.axis").call(xAxisBrush);

	//Reset the grey regions of the context chart
    d3.selectAll(".left").attr("offset", ((xBrush.domain()[0] - startYear)/yearRange*100) + "%");
	d3.selectAll(".right").attr("offset", ((xBrush.domain()[1] - startYear)/yearRange*100) + "%");

	//Remove the previous voronoi map
	voronoiGroup.selectAll("path").remove();
	//Create a new voronoi map including only the visible points
	// These path can be seen but may not be clicked on it to redraw.
	voronoiGroup.selectAll("path")
		.data(voronoi(flatData.filter(function(d) {return d.year >= xBrush.domain()[0] &  d.year <= xBrush.domain()[1]; })))
		.enter().append("path")
		.attr("d", function(d) { return "M" + d.join("L") + "Z"; })
		.datum(function(d) { return d.point; })
		.attr("class", "voronoiCells")
		.on("click",refresh);
		//.style("stroke", "red")
		// .on("click", function(d) {searchEvent(d.name);});

	// Make Group reactive.
	voronoiGroup.selectAll(".voronoiCells")
	.on("mouseover", mouseover)
	.on("mouseout", mouseout);

}//brushmove

function brushend() {
  if (!d3.event.sourceEvent) return; // only transition after input
  d3.select(this).transition()
      .call(brush.extent(brush.extent().map(function(d) { return d3.round(d, 0); })))
      .call(brush.event);
}//brushend

function brushcenter() {
  var self = d3.select(window),
      target = d3.event.target,
      extent = brush.extent(),
      size = extent[1] - extent[0],
      domain = xAll.domain(),
      x0 = domain[0] + size / 2,
      x1 = domain[1] - size / 2,
      odd = Math.round(size * 10) & 1;

  recenter(true);
  brushmove();

  if (d3.event.changedTouches) {
    self.on("touchmove.brush", brushmove).on("touchend.brush", brushend);
  } else {
    self.on("mousemove.brush", brushmove).on("mouseup.brush", brushend);
  }

  function brushmove() {
    d3.event.stopPropagation();
    center = d3.round(Math.max(x0, Math.min(x1, xAll.invert(d3.mouse(target)[0]) + odd * .05)), 1) - odd * .05;
    recenter(false);
  }

  function brushend() {
    brushmove();
    self.on(".brush", null);
  }
}//brushcenter

function recenter() {
  if (centering) return; // timer is active and already interpolating
  centering = true;
  d3.timer(function() {
    var extent = brush.extent(),
        size = extent[1] - extent[0],
        center1 = center * alpha + (extent[0] + extent[1]) / 2 * (1 - alpha);

    if (!(centering = Math.abs(center1 - center) > 1e-3)) center1 = center;

    gBrush
        .call(brush.extent([center1 - size / 2, center1 + size / 2]))
        .call(brush.event);

    return !centering;
  });
}//recenter

//////////////////////////////////////////////////////////////
////////////////////////// Buttons ///////////////////////////
//////////////////////////////////////////////////////////////

d3.select("#issueButton").on("click", function(e) {
	redraw("issues")
});
d3.select("#startButton").on("click", function(e) {
	redraw("starts") });


//////////////////////////////////////////////////////////////
///////////////////// Helper functions ///////////////////////
//////////////////////////////////////////////////////////////
//Move selected element to the front
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

var loopTimer;
function stopTimer() {
	clearTimeout(loopTimer);
}//removeTimers

function startTimer() {
	loopTimer = setInterval(function() {
		var num = Math.round(Math.random()*allNames.length);
		// changeName(allNames[num], allattributes[num]);
	}, 4000);
}//startTimer

//Focus the chart on a name
function changeName(name, sex) {
	if(attribute === sex) searchEvent(name);
	else {
		redraw(sex);
		// searchEvent(name);
		if (attribute === "issues") {
			d3.select("#issueButton").classed("active",true);
			d3.select("#startButton").classed("active",false);
		} else {
			d3.select("#issueButton").classed("active",false);
			d3.select("#startButton").classed("active",true);
		}//else
	}//else
}//changeName

//Reset the focus range years
function changeYears(start, end, sex) {
	if(attribute === sex) {
		// searchEvent("");
		gBrush.call(brush.extent([start, end])).call(brush.event);
	} else {
		redraw(sex);
		if (attribute === "issues") {
			d3.select("#issueButton").classed("active",true);
			d3.select("#startButton").classed("active",false);
		} else {
			d3.select("#issueButton").classed("active",false);
			d3.select("#startButton").classed("active",true);
		}//else
		gBrush.call(brush.extent([start, end])).call(brush.event);
	}//else
}//changeYears

//////////////////////////////////////////////////////////////
////////////////////////// Draw //////////////////////////////
//////////////////////////////////////////////////////////////

// This is where bug happens
function redraw(choice) {
	attribute = choice;
	//////////////////////////////////////////////////////////////
	//////////// Switch variables between attributes ////////////////
	//////////////////////////////////////////////////////////////

	flatData = (attribute === "issues" ? flatDataissues : flatDatastarts);
	maxPosition = (attribute === "issues" ? maxPositionissues : maxPositionstarts);

	nestedFlatData = d3.nest().key(function(d) { return d.name; }).entries(flatData);

	//Change the dataset
	var data = (attribute === "issues" ? issues : starts);

	//Change id mapping
	namesByID = (attribute === "issues" ? boyNamesByID : girlNamesByID);

	//Reset the color domain
	color = (attribute === "issues" ? colorissues : colorstarts);

	//Change the color legend gradient rectangle
	// Correct
	// This way be delete in the future, because two things are same in the future.
	colorLegend.selectAll(".colorkey")
		.attr("fill", function(d) {
			return "url(#legendGradientGirl)";
		});

	//////////////////////////////////////////////////////////////
	///////////////////////// Context ////////////////////////////
	//////////////////////////////////////////////////////////////

	// Todo: Context is the line in the brush

	//Add the lines to context chart

	var contextWrapper = context.selectAll(".context")
		.data(data, function(d) {
			return d.name; });

	//UPDATE
	contextWrapper.attr("class", function(d) {return "focus " + d.name ;});
	contextWrapper.selectAll(".line")
		.attr("d", function(d) { return lineAll(d.values); })
		.style("stroke", function(d) {return "url(#line-gradient-" + attribute + "-" + d.name + ")"; });

	//ENTER
	contextWrapper
		.enter().append("g")
		.attr("class", function(d) {return "context " + d.name ;})
		.append("path")
			.attr("class", "line")
			.attr("d", function(d) { return lineAll(d.values); })
			.style("stroke", function(d) {return "url(#line-gradient-" + attribute + "-" + d.name + ")"; })
			.style("stroke-width", 1.25)
			.attr("clip-path", "url(#clipContext)")
			.style("opacity", 0)
			.transition().duration(750).delay(500)
			.style("opacity", 1);

	//EXIT
	contextWrapper.exit()
		.transition().duration(750)
		.style("opacity", 0)
		.remove();

	//////////////////////////////////////////////////////////////
	////////////////////////// Focus /////////////////////////////
	//////////////////////////////////////////////////////////////

	// Add a new mapper function
	var newmapper = {};
	maxPosition.forEach(function(d){
		newmapper[d["key"]] = d["values"];
	})

	//Add a g element per name.
	var focusWrapper = focus.selectAll(".focus")
		.data(data, function(d) { return d.name; });

	//UPDATE

	focusWrapper.attr("class", function(d) {return "focus " + d.name ;});
	focusWrapper.selectAll(".line")
		// Bug fixsed by re-assign the line value.
		.data(data, function(d) { return d.name; })
		.attr("d", function(d) {
			// Second drawing, the problem is from here based on testing
			return lineBrush(d.values); })
		// .style("stroke-width", function(d) {return strokeWidth[maxPosition[namesByID[d.name]].values - 1]; })
		.style("stroke-width", function(d) {

			if (String(d.name) in newmapper){
				return strokeWidth[newmapper[String(d.name)]];
			}
			else {
				return 0;
			}

			return 10; })
		.style("stroke", function(d) {
			return (color_band[history_map[d.name]]);
			// return color(d.name);
		});

	//ENTER
	//Add the lines of the issues to focus chart
	var newmapper = {};
	maxPosition.forEach(function(d){
		newmapper[d["key"]] = d["values"];
	})

		// This is the problem in the area
	focusWrapper
		.enter().append("g")
		.attr("class", function(d) {return "focus " + d.name ;})
		.append("path")
			.attr("class", "line")
			.attr("clip-path", "url(#clip)")
			.style("pointer-events", "none")
			.style("stroke-linejoin", "round")
			.style("opacity", 0)
			.attr("d", function(d) {
				return lineBrush(d.values); })
			.style("stroke-width", function(d) {
				// Works in our design.
				if (String(d.name) in newmapper){
					return strokeWidth[newmapper[String(d.name)]];
				}
				else {
					return 0;
				}
			}
			)
			.style("stroke", function(d) {
				return (color_band[history_map[d.name]]);
				 });

	//Small delay so the brush can run first
	focusWrapper.selectAll(".line")
			.transition().duration(750).delay(500)
			.style("opacity", 0.7);

	//EXIT
	focusWrapper.exit()
		.transition().duration(750)
		.style("opacity", 0)
		.remove();

	//////////////////////////////////////////////////////////////
	///////////////////////// Voronoi ////////////////////////////
	//////////////////////////////////////////////////////////////

	//Remove the previous voronoi map
	voronoiGroup.selectAll("path").remove();

	//Create a new voronoi map including only the visible points
	// Correct work here.
	voronoiGroup.selectAll("path")
		.data(
			voronoi(flatData.filter(function(d) {
				return d.year >= xBrush.domain()[0] &  d.year <= xBrush.domain()[1]; })))
		.enter().append("path")
		.attr("d", function(d) { return "M" + d.join("L") + "Z"; })
		.datum(function(d) { return d.point; })
		.attr("class", "voronoiCells")
		.on("mouseover", mouseover)
		.on("mouseout", mouseout)
		.on("click", refresh);

	d3.select(".brush").moveToFront();

}//redraw

//////////////////////////////////////////////////////////////
/////////////////////// Swtich Name //////////////////////////
//////////////////////////////////////////////////////////////
function refresh(data){
	var introduction = lang_info[data["name"]]["info"];
	var user = lang_info[data["name"]]["user"];

	document.getElementById("usage").innerHTML = "Popular Project";
	document.getElementById("language_name").innerHTML = "<h2>" + data["name"]   +"</h2>" + "<h3>" + "First Appear: "+ language_year_map[data["name"]] + "</h3>";
	document.getElementById("introduction").innerHTML = introduction;
	document.getElementById("Description").innerHTML = user;
}


//////////////////////////////////////////////////////////////
/////////////////////////// Start ////////////////////////////
//////////////////////////////////////////////////////////////
$(document).ready(function(){
	//Create the lines

	redraw(attribute);
	setTimeout(newer, 400);
});

function newer(){
	redraw("issues");
}




}
