var obtenerUbicacion = function (e) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(mostrarPosicion);
	} else {
		alert("Actualice su navegador");
	}
};
var mostrarPosicion = function (posicion) {

	var coordenadas = {
		lat: posicion.coords.latitude, 
		lng: posicion.coords.longitude
	};
	mostrarMapa(coordenadas);
};

var mostrarMapa = function (coordenadas) {
	var map = new google.maps.Map($('#map')[0], {
      zoom: 17,
      center: coordenadas
    });
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: map
    });
}




var restaurantes= [
{
    "nombre": "Chilanguita",
	"direccion": "Av de los Insurgentes Sur 895, Nápoles, 03840 Ciudad de México, CDMX",
	"foto": "http://via.placeholder.com/250x250",
	"categoria": "comida mexicana",
	"coordenadas":{
		lng:-99.1873782,
		lat:19.4024011
	}
},
{
    "nombre":'Casa toño',
	"direccion": "Londres 144, Cuauhtémoc, Juárez, 06600 Ciudad de México, CDMX",
	"foto": "http://via.placeholder.com/250x250",
	"categoria": "comida mexicana",
	"coordenadas":{
		lng:-99.1686517,
		lat:19.4209275
	}
},
{
    "nombre": "sushitto",
	"direccion": "Hamburgo 141, Cuauhtémoc, Colonia Juárez, Juárez, 06600 Ciudad de México, CDMX",
	"foto": "http://via.placeholder.com/250x250",
	"categoria": "comida oriental",
	"coordenadas":{
		lng:-99.1679987,
		lat:19.425898
	}
},
{
    "nombre": "moshi moshi",
	"direccion": "Plaza Villa de Madrid 22, Cuauhtémoc, Roma, Roma Nte., 06700 Ciudad de México, CDMX",
	"foto": "http://via.placeholder.com/250x250",
	"categoria": "comida oriental",
	"coordenadas":{
		lng:-99.1677102,
		lat:19.4184159
	}
},
{
    "nombre": "italianis",
	"direccion": "Centro Comercial Plaza La Rosa, Calle Londres 127 Locales 64-67, Cuauhtémoc, Juárez, 06600 Ciudad de México, CDMX",
	"foto": "http://via.placeholder.com/250x250",
	"categoria": "comida italiana",
	"coordenadas":{
		lng:-99.1667453,
		lat:19.4254844
	}
},
{
    "nombre": "olive garden",
	"direccion": "Av. Paseo de la Reforma No. 250, Local 2F-02, primer nivel, Cuahutémoc, Juárez, 06600 Ciudad de México, CDMX",
	"foto": "http://via.placeholder.com/250x250",
	"categoria": "comida italiana",
	"coordenadas":{
		lng:-99.1820663,
		lat:19.4254835
	}
 }
];

var plantilla= '<article class="item-restaurant">'+
				'<div class="row">'+
					'<div class="col s12">'+
					    '<div class="card horizontal">'+
					      '<div class="card-image">'+
					        '<img src="http://via.placeholder.com/250x250">'+
					      '</div>'+
					      '<div class="card-stacked">'+
					        '<div class="card-content">'+
					          '<h4>__nombre__</h4>'+
					          '<h6>__direccion__</h6>'+
					          '<p>__categoria__</p>'+
					          '<div class="card-action">'+
					          	'<a class="newUbication" href="#" data-lng="__lng__" data-lat="__lat__">Ver mapa</a>'+
					          '</div>'+
					        '</div>'+
					      '</div>'+
					    '</div>'+
					  '</div>'+
				  '</div>'+
				'</div>'+
		 '</article>';
	
var cargarPagina=function(){
	obtenerUbicacion();
	mostrarPlantilla(restaurantes);
	$(".newUbication").click(ubicacionActual);
	$("#search-form").submit(filtrarRestaurantes);
}
	var filtrarRestaurantes = function (e) {
	e.preventDefault();
	var palabraClave = $("#search").val().toLowerCase();
	var filtrados = restaurantes.filter(function (nombre) {
		return nombre.nombre.toLowerCase().indexOf(palabraClave) >= 0;
		console.log(filtrados);
	});
	mostrarPlantilla(filtrados);
};
	
	var mostrarPlantilla = function(restaurantes){
		var plantillaFinal=" ";
		restaurantes.forEach(function(remplaza){
			plantillaFinal += plantilla.replace("__nombre__", remplaza.nombre)
			.replace("__direccion__", remplaza.direccion)
			.replace("__categoria__", remplaza.categoria)
			.replace("__lng__", remplaza.coordenadas.lng)
			.replace("__lat__", remplaza.coordenadas.lat);
	});
		$("#list-restaurants").html(plantillaFinal);
};

var ubicacionActual=function(){
	var latitud = $(this).data("lat");
  	var longitud = $(this).data("lng");

  	var coordenadas = {
    lat: latitud,
    lng: longitud

  };

  mostrarMapa(coordenadas);
}



$(document).ready(cargarPagina);