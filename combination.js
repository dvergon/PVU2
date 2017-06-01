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
               "size":3238
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
               "size":3348
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



var map;
//testData
var colorArray = [883368, 836256, 280543, 6883563, 970419, 1007831, 1759167, 683203, 379709, 2036443, 104843, 575268, 183712, 718717, 158657];
//var colorArray= calculateQuantil(3,array);

//create leflet map 
function createMap(){
  // to remove the leaflet logo add ,{ attributionControl:false } after 'map'
  map = L.map('map',{ attributionControl:false ,zoomControl: false}).setView([-39.012948, -71.726907], 3);

  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();

  /**var southWest = L.latLng(-35.012948, -71.726907),
      northEast = L.latLng(-38.112948, -72.826907),
      bounds = L.latLngBounds(southWest, northEast);
  
  map.fitBounds(bounds);
  **/

  // with background world map : https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  L.tileLayer('', {
    maxZoom: 4,
    minZoom: 4,
   // maxBounds: bounds,
  }).addTo(map);

 
  //read geojson file
  var geojson = L.geoJson(chile, { weight: 1 }).addTo(map);

  // set color
  function style(feature) {
    return { 
      weight: 1.3,    
      color: 'white',
      fillOpacity: 0.6,
      fillColor: getColor(feature.properties.POBL2010)
    };
  }
    //add style
  L.geoJson(chile, {style: style}).addTo(map);

  geojson = L.geoJson(chile, {
    style:style,
    onEachFeature: onEachFeature
  }).addTo(map);

  var info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); 
    this.update();
    return this._div;
  };
  //info update  
  info.update = function (props) {
    this._div.innerHTML = '<h4>Regiones de Chile</h4>' +  (props ?
      '<b>' + props.NOM_REG + '</b><br />' 
      : 'Hover over a region');
  };

  info.addTo(map);
  //map.legendControl.addLegend(document.getElementById('legend').innerHTML);

  //define color 
  function getColor(d) {
    return  d < 280543 ? colorType[0] :
            d < 575268 ? colorType[1] :
            colorType[2];
  }
  var selected= null;

  //highlight surroundings
  function highlightFeature(e) {
    var layer = e.target;
/**
    layer.setStyle({
      color: '#666',
      dashArray: '',
      weight: 4,
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
    **/
    info.update(layer.feature.properties);
  }

  //highlight surroundings
  function clickHighlight(e) {
    geojson = L.geoJson(chile, {
      style:style,
      onEachFeature: onEachFeature
    }).addTo(map);

    var layer = e.target;

    layer.setStyle({
      color: '#666',
      dashArray: '',
      weight: 3,
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
    info.update(layer.feature.properties);
    
  }
  


  //reset surroundings
  function resetHighlight(e) {
    
     // geojson.resetStyle(e.target);
      info.update();

    }

  //zoom to clicked region
  function zoomToFeature(e) {
    //map.fitBounds(e.target.getBounds());
      //TODO call method for updating Data in this region
      //if(e.target.feature.properties.NOM_PROV == "Chiloe"){
        //d3.select("body").select("p").append("h2")
        //.text(e.target.feature.properties.NOM_REG)
        //updateGraphData('Typo');
        //updateDataRegion('Typo', data2, data4);
        //updateData(json_schools,colors_school); 
      //}
    }
  //hower over region
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      //click: zoomToFeature
      click: clickHighlight
    });
  }
}





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
  initializeBreadcrumbTrail();
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

  updateBreadcrumbs(sequenceArray, percentageString, colors);

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

//update D3 Chart 
function updateData(json, colors) {

  //remove graph:
  d3.selectAll("g#container").html("");
  //remove legend:
  //TODO
  //d3.select('#legend').selectAll('svg').remove();
  //redraw legend:  
  //TODO
  //drawLegend(colors);
  //redraw graph:
  //filter nodes to keep only those large enough to see.
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

