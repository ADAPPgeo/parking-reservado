window.onload = function() {

    ui.bindEvts();

};

//script
var map;

var cartodb_man_hole, ocio;

//página recibida:

//<a href="http://url.pagina.destino/?variable1=valor1&variable2=valor2">


$(document).ready(function() {

    var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

 $(document).on("click", '.whatsapp', function() {
        if( isMobile.any() ) {
            var text = $(this).attr("data-text");
            var url = $(this).attr("data-link");
            var message = encodeURIComponent(text) + " - " + encodeURIComponent(url);
            var whatsapp_url = "whatsapp://send?text=" + message;
            window.location.href = whatsapp_url;
        } else {
            var text = $(this).attr("data-text");
            var url = $(this).attr("data-link");
            var message = encodeURIComponent(text) + " - " + encodeURIComponent(url);
            alert(message);
        }

    });


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

var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '+'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '+'Imagery © <a href="http://mapbox.com">Mapbox</a>'+' Powered by <a href="http://cartodb.com">CartoDB</a>',
    mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
var diurno = L.tileLayer(mbUrl, {id: 'adappgeo.i54gkmab', attribution: mbAttr});

 map = new L.Map("map", {
    //center: new L.LatLng(40.41075,-3.69366),
    center: centro,
    zoom: 17,
    layers: [
    //new L.TileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
    //new L.TileLayer('http://a.tiles.mapbox.com/v3/examples.map-20v6611k/{z}/{x}/{y}.png', { 
    new L.tileLayer(mbUrl, {
        id: 'adappgeo.i54gkmab',
        attribution: mbAttr,   
        maxZoom: 18,
        minZoom: 12
        })
    ]
  });

  var cartodb_man_hole = new lvector.CartoDB({
    user: "adappgeo",
    table: "parkingreservado",
    scaleRange: [16, 18],
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
        color: "#fff",
        fillColor: "#0F3B82",
        opacity: 1,
        fillOpacity: 0.8
      }
    },
    popupTemplate: function (properties) {
      var nombrecalle = properties.calle.split(",");
      var address = nombrecalle[1]+ " " + nombrecalle[2]+ " " + nombrecalle[0] + ", " + properties.portal;
      var link_url = 'lat='+ properties.lat + '&lon=' + properties.lon;

      var output ='<h2>'+address+'</h2>'

        + '<h3><a data-text="Parking reservado en '+address+'" data-link="http://adappgeo.net/mapa/parking/cartodb/'
        + '?' + link_url+'" class="whatsapp w3_whatsapp_btn w3_whatsapp_btn_large"><i class="fa fa-whatsapp"></i> Whatsapp</a></h3>'

        //+ '<a target="_blank" class="social-link" href="http://adappgeo.net/mapa/parking/cartodb/'
        //+ '?' + link_url +'">Compartir Punto</a>'

         +'<h3><a target="_blank" class="social-facebook" href=""> <i class="fa fa-facebook"></i> Facebook</a></h3>'
        
        + '<h3><a class="social-twitter" target="_blank" style="display: block;" href="https://twitter.com/intent/tweet?lat=' 
        + properties.lat
        + ';lon=' + properties.lon
        + ';button_hashtag=parkingreservado'
        + ';button_hashtag=accesibilidad&amp;via=adappgeo&amp;text='
        + address + '" data-lang="es" data-related="#parkingreservado #'
        + properties.distrito
        + '" data-url="" via="adappgeo"><i class="fa fa-twitter"></i> Twitter</a></h3>'
        

        +'<h3><a target="_blank" class="social-link" href="https://www.google.es/maps/place/'
        + address +',Madrid/@'+properties.lat+','+properties.lon+'"> <i class="fa fa-map-marker"></i> Google Maps</a></h3>'
        ;

      return output;
    },
    //popupTemplate: '<div ><h2>{calle}</h2><table class="condensed-table"><tr><th>Distrito</th><td>{distrito}</td></tr><tr><th>Barrio</th><td>{barrio}</td></tr></table></div><a class="social-twitter" target="_blank"style="display: block;"href="https://twitter.com/intent/tweet?lat={lat};lon={lon};button_hashtag=parkingreservado;via=adappgeo&amp;text={calle}{portal}"data-lang="es"data-related="#parkingreservado #accesibilidad"data-url="http://adappgeo.net/"via="adappgeo">GeoTweet</a><a target="_blank" class="social-link" href="https://www.google.es/maps/place/{calle},{portal},Madrid/@{lat}{lon}">Google Maps</a>',
    singlePopup: true
  });

//<a class="social-twitter" target="_blank"style="display: block;"href="https://twitter.com/intent/tweet?lat={lat};lon={lon};button_hashtag=parkingreservado;via=adappgeo&amp;text=https://www.google.es/maps/place/{calle},{portal},Madrid/@{lat}{lon}"data-lang="es"data-related="#parkingreservado #accesibilidad"data-url="http://adappgeo.net/"via="adappgeo">GeoTweet</a>
//https://www.google.es/maps/place/Calle+León,+14,+28014+Madrid/@40.4139052,-3.6989524,17z
//pone en marcha la capa de cartodb
  cartodb_man_hole.setMap(map);

  //L.latLngBounds( <LatLng> southWest, <LatLng> northEast )

    var southWest = L.latLng(40.3323,-3.8234),
        northEast = L.latLng(40.5336,-3.5494),
        bounds = L.latLngBounds(southWest, northEast);

    map.setMaxBounds(bounds);

    L.control.locate({
        onLocationOutsideMapBounds:  function(context) { // called when outside map boundaries
            alert('Estás fuera de Madrid');
    }
    }).addTo(map);
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

