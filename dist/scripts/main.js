!function(e,t,a,i){"use strict";a.Icon.Default.imagePath="images/";var o=new a.LatLngBounds(new a.LatLng(14.658129,-82.200288),new a.LatLng(12.400129,-79.866288)),n=a.map("map",{center:o.getCenter(),zoom:10}),r=a.rectangle(o).getLatLngs();a.polyline(r.concat([r[0]])).addTo(n),n.setMaxBounds(o);var c=a.geoCsv(null,{fieldSeparator:",",firstLineTitles:!0,onEachFeature:function(e,t){t.bindPopup(e.properties.popup)},pointToLayer:function(e,t){return a.marker(t,{icon:a.icon({iconUrl:e.properties.icon,iconSize:[32,32]})})}});$.ajax({type:"GET",dataType:"text",url:"../datos.csv",error:function(){alert("No se pudieron cargar los datos")},success:function(e){function t(e){var t="",a="",i="",o="";if("undefined"==typeof e[0])return null;if(e[0].constructor===Object)for(var n in e)for(var r in e[n])if("lat"===r&&(a=e[n][r]),"lng"===r&&(i=e[n][r]),"name"===r){o=e[n][r];var c=function(e){return e.replace(/[^a-z0-9-]/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").toLowerCase()},s=c(o);t+="<li id="+s+'><a href="#"data-zoom="15"data-position='+a+","+i+">"+o+"</a></li>\r\n"}return t}c.addData(e),n.addLayer(c);var a=e,i=$.csv.toObjects(a),o=t(i);$("#csv-list").empty(),$("#csv-list").html(o),$("#csv-list li").each(function(){$(this).addClass("item-list")})}});var s=new a.tileLayer("https://api.mapbox.com/styles/v1/heyjoeb/cio4kq5k6004xafm06nm1pg4g/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGV5am9lYiIsImEiOiJjaW5vemYzeGgxMDUwdHZseXVicXZwbTAzIn0.7GJ_d9Xk-m50NUgRsOcnXg",{maxZoom:16,minZoom:10,useCache:!0,tileSize:512,zoomOffset:-1,attribution:'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});s.on("tilecachehit",function(e){console.log("Cache hit: ",e.url)}),s.on("tilecachemiss",function(e){console.log("Cache miss: ",e.url)}),s.addTo(n);var p=($("#sidebar").sidebar(),"https://api.mapbox.com/styles/v1/heyjoeb/cio4kq5k6004xafm06nm1pg4g/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGV5am9lYiIsImEiOiJjaW5vemYzeGgxMDUwdHZseXVicXZwbTAzIn0.7GJ_d9Xk-m50NUgRsOcnXg"),l='Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',m=new a.TileLayer(p,{minZoom:0,maxZoom:13,useCache:!0,attribution:l});new a.Control.MiniMap(m,{toggleDisplay:!0}).addTo(n);t.getElementById("map-navigation").onclick=function(e){var t=e.target.getAttribute("data-position"),a=e.target.getAttribute("data-zoom");if(t&&a){var i=t.split(","),o=parseInt(a);return n.setView(i,o,{animation:!0}),!1}}}(window,document,L),$(document).ready(function(){});