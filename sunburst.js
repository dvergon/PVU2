
//testdata
var json_gender={
   "children":[
      {
         "name":"feminino",
         "children":[
            {
               "name":"Finalizado",
               "size":28
            },
            {
               "name":"Avanzando",
               "size":38
            },
            {
               "name":"Sin avance",
               "size": 34
            }
         ],
      },
      {
         "name":"masculino",
         "children":[
            {
               "name":"Finalizado",
               "size": 22
            },
            {
               "name":"Avanzando",
               "size": 48
            },
            {
               "name":"Sin avance",
               "size": 30
            }
         ],
      }
   ]
};

var json_general={
   "children":[
      {
         "name":"Finalizado",
         "size":399
      },
      {
         "name":"Avanzando",
         "size":394
      },
      {
         "name":"Sin avance",
         "size":33
      }
   ]
};

var json_schools={
   "children":[
      {
         "name":"Finalizado",
         "children":[
            {
               "name":"Muncipal",
               "size":5
            },
            {
               "name":"Subvencionado",
               "size":2128
            },
            {
               "name":"Particular",
               "size":282
            }
         ],

      },
      {
         "name":"Avanzando",
         "children":[
            {
               "name":"Muncipal",
               "size":3378
            },
            {
               "name":"Subvencionado",
               "size":2118
            },
            {
               "name":"Particular",
               "size":56
            }
         ]
      },
      {
         "name":"Sin avance",
         "children":[
            {
               "name":"Muncipal",
               "size":788
            },
            {
               "name":"Subvencionado",
               "size":359
            },
            {
               "name":"Particular",
               "size":332
            }
         ]
      }
   ]
};


// Dimensions of sunburst.
var width = 206;
var height = 200;
var radius = Math.min(width, height) / 2;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
  w: 85, h: 30, s: 3, t: 10
};

// Mapping colors.
var colors_school = {
  "Avanzando": colorType[1],
  "Sin avance": colorType[2],
  "Finalizado": colorType[0],
  "Muncipal": colorSchools[0],
  "Subvencionado": colorSchools[1],
  "Particular": colorSchools[2],  
};
var colors_gender = {
  "Avanzando": colorType[1],
  "Sin avance": colorType[2],
  "Finalizado": colorType[0],
  "feminino": colorGender[0],
  "masculino": colorGender[1] 
};
// Total size of all segments; we set this later, after loading the data.
var totalSize = 0; 

var vis = d3.select("#chart").append("svg:svg")
.attr("width", width)
.attr("height", height)
.append("svg:g")
.attr("id", "container")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.layout.partition()
.size([2 * Math.PI, radius * radius])
.value(function (d) {
  return d.size;
});

var arc = d3.svg.arc()
.startAngle(function(d) { return d.x; })
.endAngle(function(d) { return d.x + d.dx; })
.innerRadius(function(d) { return Math.sqrt(d.y); })
.outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });


//draw and set up the visualization
function createVisualization(json,colors) {
  console.log('createVisu')
  // Basic setup 
  //initializeBreadcrumbTrail();
  //drawLegend(colors);
  vis.append("svg:circle")
  .attr("r", radius)
  .style("opacity", 0);

  //filter nodes: keep only large enough values
  var nodes = partition.nodes(json)
  .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
    });

  var path = vis.data([json]).selectAll("path")
  .data(nodes)
  .enter().append("svg:path")
  .attr("display", function(d) { return d.depth ? null : "none"; })
  .attr("d", arc)
  .attr("fill-rule", "evenodd")
  .style("fill", function(d) { return colors[d.name]; })
  .style("opacity", 1)
  .on("mouseover", mouseover);

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.node().__data__.value;
};

// Fade all but the current sequence, and show it in breadcrumb trail
function mouseover(d, colors) {

  var percentage = (100 * d.value / totalSize).toPrecision(3);
  var percentageString = percentage + "%";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }

  d3.select("#percentage")
  .text(percentageString);

  d3.select("#explanation")
  .style("visibility", "");

  var sequenceArray = getAncestors(d);

  //updateBreadcrumbs(sequenceArray, percentageString, colors);

  // Fade all the segments.
  //TODo
  d3.selectAll("container")
  .style("opacity", 0.6);

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("#container").select("path")
    .filter(function(node) {
      return (sequenceArray.indexOf(node) >= 0);
    })
    .style("opacity", 1); 
 }

//Restore everything to full opacity when moving off the visualization.
function mouseleave(d, colors) {

  // Hide the breadcrumb trail
  d3.select("#trail")
  .style("visibility", "hidden");

  // Deactivate all segments during transition
  d3.selectAll("#container").select("path").on("mouseover", null, colors);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll("#container").select("path")
  .transition()
  .duration(1000)
  .style("opacity", 1)
  .each("end", function() {
    d3.select(this).on("mouseover", mouseover);
  });

  d3.select("#explanation")
  .style("visibility", "hidden");
}

// nodes, highest first, but excluding the root node
function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}


/**
function initializeBreadcrumbTrail() {
  // Add the svg area
  var trail = d3.select("#sequence").append("svg:svg")
  .attr("width", width)
  .attr("height", 50)
  .attr("id", "trail");
  // Add the label at the end, for the percentage
  trail.append("svg:text")
  .attr("id", "endlabel")
  .style("fill", "#000");
}


// Generate a string that describes the points of a breadcrumb polygon
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
  points.push(b.t + "," + (b.h / 2));
}
return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage
function updateBreadcrumbs(nodeArray, percentageString, colors) {

  // Data join; key function combines name and depth (= position in sequence).
  var g = d3.select("#trail")
  .selectAll("g")
  .data(nodeArray, function(d) { return d.name + d.depth + colors[d.name] ; });

  // Add breadcrumb and label for entering nodes.
  var entering = g.enter().append("svg:g");

  entering.append("svg:polygon")
  .attr("points", breadcrumbPoints)
  .style("fill", function(d) { return colors[d.name]; });

  entering.append("svg:text")
  .attr("x", (b.w + b.t) / 2)
  .attr("y", b.h / 2)
  .attr("dy", "0.35em")
  .attr("text-anchor", "middle")
  .text(function(d) { return d.name; });

  // Set position for entering and updating nodes.
  g.attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Remove exiting nodes.
  g.exit().remove();

  // Now move and update the percentage at the end.
  d3.select("#trail").select("#endlabel")
  .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
  .attr("y", b.h / 2)
  .attr("dy", "0.35em")
  .attr("text-anchor", "middle")
  .text(percentageString);

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
  .style("visibility", "");
}

function drawLegend(colors) {
// Dimensions of legend item: width, height, spacing, radius of rounded rect.
  var li = {
    w: 120, h: 30, s: 3, r: 3
  };

  var legend = d3.select("#legend").append("svg:svg")
  .attr("width", li.w)
  .attr("height", d3.keys(colors).length * (li.h + li.s));

  var g = legend.selectAll("g")
  .data(d3.entries(colors))
  .enter().append("svg:g")
  .attr("transform", function(d, i) {
    return "translate(0," + i * (li.h + li.s) + ")";
  });

  g.append("svg:circle")
  .attr("r","0.4em")
  .style("fill", function(d) { return d.value; });

  g.append("svg:text")
  .attr("x", li.w / 2)
  .attr("y", li.h / 2)
  .attr("dy", "0.35em")
  .attr("text-anchor", "middle")
  .text(function(d) { return d.key; });
}
**/

//update D3 Chart 
function updateData(json, colors) {

  //remove graph:
  d3.selectAll("g#container").html("");
  var nodes = partition.nodes(json)
  .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
    });

  var path = vis.data([json]).selectAll("path")
  .data(nodes)
    //.data(nodes)
    .enter().append("svg:path")
    .attr("display", function(d) { return d.depth ? null : "none"; })
    .attr("d", arc)
    .attr("fill-rule", "evenodd")
    .style("fill", function(d) { return colors[d.name]; })
    .style("opacity", 1)
    .on("mouseover", mouseover);     
}