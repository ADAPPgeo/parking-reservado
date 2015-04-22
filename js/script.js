window.onload = function() {


    ui.bindEvts();

    //map.loadCartoDb();

    //gMapInit()
};

//script
var map;

var cartodb_man_hole, ocio;



//página recibida:

//<a href="http://url.pagina.destino/?variable1=valor1&variable2=valor2">





$(document).ready(function() {

//geo.init();

//Detecta si en la url hay coordenadas y centra el mapa en dichas coordenadas:
var centro = new L.LatLng(40.41075,-3.69366);
var cadVariables = location.search.substring(1,location.search.length);

if (cadVariables.length>0){
  var arrVariables = cadVariables.split("&");
  for (i=0; i<arrVariables.length; i++){

        arrVariableActual = arrVariables[i].split("=");
        if (isNaN(parseFloat(arrVariableActual[1])))
          eval(arrVariableActual[0]+"='"+unescape(arrVariableActual[1])+"';");

        else{
          eval(arrVariableActual[0]+"="+arrVariableActual[1]+";");
        }      
    }
  centro = new L.LatLng(lat,lon)    
}




 map = new L.Map("map", {
    //center: new L.LatLng(40.41075,-3.69366),
    center: centro,
    zoom: 17,
    layers: [
    //new L.TileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
    new L.TileLayer('http://a.tiles.mapbox.com/v3/examples.map-20v6611k/{z}/{x}/{y}.png', {
      
            maxZoom: 18,
            minZoom: 12,
            subdomains: ["otile1", "otile2", "otile3", "otile4"],
            attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
        })
    ]
  });

var info = function (feature) {
    var nombrecalle = feature.properties.calle.split(",");
    var address = nombrecalle[1]+ " " + nombrecalle[2]+ " " + nombrecalle[0] + " " + feature.properties.portal;
    var output ='<h2>'+address+'</h2>'
      + '<a target="_blank" class="social-link" href="http://adappgeo.net/mapa/parking/cartodb/'
      + '?lat='+ feature.properties.lat + '&lon=' + feature.properties.lon +'">Compartir Punto</a>'
      + '<a class="social-twitter" target="_blank" style="display: block;" href="https://twitter.com/intent/tweet?lat=' 
      + feature.properties.lat
      + ';lon=' + feature.properties.lon
      + ';button_hashtag=parkingreservado'
      + ';button_hashtag=accesibilidad&amp;via=adappgeo&amp;text='
      + address + '" data-lang="es" data-related="#parkingreservado #accesibilidad #'
      + feature.properties.distrito
      + '" data-url="" via="adappgeo">GeoTweet</a>'
      +'<a target="_blank" class="social-link" href="https://www.google.es/maps/place/'
      + address +',Madrid/@'+feature.properties.lat+','+feature.properties.lon+'">Google Maps</a>';
    return output;
    };

  var cartodb_man_hole = new lvector.CartoDB({
    user: "adappgeo",
    table: "parkingreservado",
    scaleRange: [16, 20],
    popupOptions:{
      keepInView:true,
      zoomAnimation:false      
    },
    
    symbology: {
      type: "single",
      vectorOptions: {
        label:'{calle}',
        circleMarker: true,
        radius: 10,
        color: "#404040",
        fillColor: "#e0e0e0",
        opacity: 1,
        fillOpacity: 0.5
      }
    },
    popupTemplate: function (properties) {
    var nombrecalle = properties.calle.split(",");
    var address = nombrecalle[1]+ " " + nombrecalle[2]+ " " + nombrecalle[0] + " " + properties.portal;
    var output ='<h2>'+address+'</h2>'
      + '<a target="_blank" class="social-link" href="http://adappgeo.net/mapa/parking/cartodb/'
      + '?lat='+ properties.lat + '&lon=' + properties.lon +'">Compartir Punto</a>'
      + '<a class="social-twitter" target="_blank" style="display: block;" href="https://twitter.com/intent/tweet?lat=' 
      + properties.lat
      + ';lon=' + properties.lon
      + ';button_hashtag=parkingreservado'
      + ';button_hashtag=accesibilidad&amp;via=adappgeo&amp;text='
      + address + '" data-lang="es" data-related="#parkingreservado #accesibilidad #'
      + properties.distrito
      + '" data-url="" via="adappgeo">GeoTweet</a>'
      +'<a target="_blank" class="social-link" href="https://www.google.es/maps/place/'
      + address +',Madrid/@'+properties.lat+','+properties.lon+'">Google Maps</a>';
    return output;
    },
    //popupTemplate: '<div ><h2>{calle}</h2><table class="condensed-table"><tr><th>Distrito</th><td>{distrito}</td></tr><tr><th>Barrio</th><td>{barrio}</td></tr></table></div><a class="social-twitter" target="_blank"style="display: block;"href="https://twitter.com/intent/tweet?lat={lat};lon={lon};button_hashtag=parkingreservado;via=adappgeo&amp;text={calle}{portal}"data-lang="es"data-related="#parkingreservado #accesibilidad"data-url="http://adappgeo.net/"via="adappgeo">GeoTweet</a><a target="_blank" class="social-link" href="https://www.google.es/maps/place/{calle},{portal},Madrid/@{lat}{lon}">Google Maps</a>',
    singlePopup: true
  });

//<a class="social-twitter" target="_blank"style="display: block;"href="https://twitter.com/intent/tweet?lat={lat};lon={lon};button_hashtag=parkingreservado;via=adappgeo&amp;text=https://www.google.es/maps/place/{calle},{portal},Madrid/@{lat}{lon}"data-lang="es"data-related="#parkingreservado #accesibilidad"data-url="http://adappgeo.net/"via="adappgeo">GeoTweet</a>
//https://www.google.es/maps/place/Calle+León,+14,+28014+Madrid/@40.4139052,-3.6989524,17z
//pone en marcha la capa de cartodb
  cartodb_man_hole.setMap(map);

    //map.addLayer(ocio);

});
       
//fin script


var ui = {
    bindEvts: function() {
        // toggle sidebar display
        $('#show-sidebar').click(function() {
            $('#sidebar').toggleClass('act');
            $('body').toggleClass('sidebarAct');
            setTimeout(function() {
                map.data.map.invalidateSize(true);
            }, 1200);
        });

        $('.closeForm').click(function() {

            $('.bl-slide-pnl.active').removeClass('active');
        });

        $('.openForm').click(function() {

            var target = $(this).data('target');

            $('.bl-slide-pnl.active').removeClass('active');
            $('.bl-slpnl-' + target).addClass('active');
        });

        $('.hidebtn').click(function() {

            $('#sidebar').removeClass('act');

        });
    }
};





var geo = {

    init: function() {
        // geolocation gist https://gist.github.com/paulirish/366184
        ;
        (function(geolocation) {

            if (geolocation) return;

            var cache;

            geolocation = window.navigator.geolocation = {};
            geolocation.getCurrentPosition = function(callback) {

                if (cache) callback(cache);

                $.getScript('//www.google.com/jsapi', function() {

                    // sometimes ClientLocation comes back null
                    if (google.loader.ClientLocation) {
                        cache = {
                            coords: {
                                "latitude": google.loader.ClientLocation.latitude,
                                "longitude": google.loader.ClientLocation.longitude
                            }
                        };
                    }

                    callback(cache);
                });

            };

            geolocation.watchPosition = geolocation.getCurrentPosition;

        })(navigator.geolocation);
    },

    query: function() {

        navigator.geolocation.watchPosition(
            function(pos) {
                return pos;
            }, function(error) {
                console.log('Error locatin: ' + error);
                return false;
            }
        );

        return false;
    }

};



/*  */