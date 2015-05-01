# Aparcamiento Reservado en Madrid

# Versión Web App

Aplicación HTML5 para localizar plazas de aparcamiento reservado a personas con discapacidad en la ciudad de Madrid

##Funcionalidades

* Visualizar puntos en un mapa correspondientes a las plazas de aparcamiento reservado en Madrid
* Consultar dirección postal de cada punto mediante _popup_, así como el número de plazas correspondentes en ese lugar.
* Localizar y representar la posición del usuario
* Compartir el punto mediante redes sociales como Whatsapp, Facebook, Twitter
* Representar mediante Google Maps un punto correspondiente a una plaza reservada para poder usar sus servicios, como el cálculo de rutas o Google Street View.

## Dependencias

_Incluidas en la carpeta dist_

* JQuery: jquery-1.8.1.min.js

* [Leaflet](http://leafletjs.com) Librería Javascript de visualización de mapas. Copyright (c) 2010-2015, Vladimir Agafonkin; Copyright (c) 2010-2011, CloudMade. [All rights reserved](https://github.com/Leaflet/Leaflet/blob/master/LICENSE).

* [Leaflet Vector Layers:](http://jasonsanford.github.io/leaflet-vector-layers/) Complemento para Leaflet de conexión con el servicio CartodDB

* [leaflet-locatecontrol _(próximamente)_:](https://github.com/domoritz/leaflet-locatecontrol) Complemento para Leaflet con funcionalidades de localización

* [Font Awesome:](http://fortawesome.github.io/Font-Awesome/) Biblioteca de iconos abierta

## Fuente de los datos

Los datos corresponden al juego de datos que ofrece el **Ayuntamiento de Madrid** a través de su portal de datos abiertos:

[Portal de datos abiertos de Madrid](http://datos.madrid.es/portal/site/egob/menuitem.c05c1f754a33a9fbe4b2e4b284f1a5a0/?vgnextoid=dd5900ac205a7410VgnVCM2000000c205a0aRCRD&vgnextchannel=374512b9ace9f310VgnVCM100000171f5a0aRCRD)

Estos datos han pasado un proceso de limpieza de errores, principalmente en el campo de número de portal.

## Acceso a los datos

Los datos se alojan como base de datos PostGIS en una cuenta de **cartodb.com**

Se emplean dos tablas:

* **parking:** Puntos geolocalizados correspondientes a las plazas de parking reservado de la ciudad de Madrid
* **distritos:** Polígonos correspondientes a los límites de los distintis distritos de la ciudad de Madrid

## Descripción de los datos

Para una descripción detallada de las tablas de datos con sus campos, consultar el documento **_descrip_datos.md_**



