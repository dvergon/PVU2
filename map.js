
var map;

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
  //redraw
  function override(feature) {
    return { 
      weight: 4,    
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

  var info = L.control({
     position : 'topleft'
  });

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
  

  //highlight surroundings
  function highlightFeature(e) {
    var layer = e.target;
    info.update(layer.feature.properties);
  }

  //highlight surroundings
  function clickHighlight(e) { 
    
    selectedRegion = e;
    var layer = e.target;
    if(choosedRegion== false | choosedRegion != layer.feature.properties.NOM_REG ){

      choosedRegion = layer.feature.properties.NOM_REG
      document.getElementById("breadcrumbRegion").innerHTML = layer.feature.properties.NOM_REG;

      geojson = L.geoJson(chile, {
        style:override,
        onEachFeature: onEachFeature
      }).addTo(map);

      geojson = L.geoJson(chile, {
        style:style,
        onEachFeature: onEachFeature
      }).addTo(map);

      layer.setStyle({
        color: '#666',
        weight: 3,
        fillOpacity: 0.6
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      info.update(layer.feature.properties);
    }
    updateInterfaceRegion();
  }
  
  function resetMap(){
    geojson = L.geoJson(chile, {
        style:override,
        onEachFeature: onEachFeature
      }).addTo(map);

      geojson = L.geoJson(chile, {
        style:style,
        onEachFeature: onEachFeature
      }).addTo(map);
  }

  //reset surroundings
  function resetHighlight(e) {
      info.update();
    }

  //zoom to clicked region
  //function zoomToFeature(e) {
    //map.fitBounds(e.target.getBounds());
      //TODO call method for updating Data in this region
      //if(e.target.feature.properties.NOM_PROV == "Chiloe"){
        //d3.select("body").select("p").append("h2")
        //.text(e.target.feature.properties.NOM_REG)
        //updateGraphData('Typo');
        //updateDataRegion('Typo', data2, data4);
        //updateData(json_schools,colors_school); 
      //}
  // }
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







