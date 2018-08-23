'use strict';

// les fonctions communes
//-------------------------------------
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

//Le viewPort : Objet qui contient la hauteur et la largeur du viewPort
//-------------------------------------
var viewPort = {'w':window.innerWidth, 'h':window.innerHeight};
console.log("largeur viewPort");
console.log(viewPort.w);
console.log("hauteur viewPort");
console.log(viewPort.h);

//les dessins svg
//-------------------------------------

//mise à l’échelle pour faciliter les translate
/**
	La plupart des SVG dessinés avec Inkscape contiennent des translate. Il faut donc en tenir compte.
*/
function array_getEchelle(elt){
	let s_transform = elt.getAttribute('transform');
	console.log("s_transform = " + s_transform);
	let array_stringMorceaux = s_transform.match(/\s*translate\s*\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)\s*scale\s*\(\s*(-?\d+)\s*\)/);
	console.log({
		'translate':{
			'x': parseFloat(array_stringMorceaux[1]), 
			'y': parseFloat(array_stringMorceaux[2])
		}, 
		'scale': array_stringMorceaux[3]
		});
	return {
		'translate':{
			'x': parseFloat(array_stringMorceaux[1]), 
			'y': parseFloat(array_stringMorceaux[2])
		}, 
		'scale': array_stringMorceaux[3]//ne s'y trouve pas toujours
	};
}

//calculer position des objets sur l'écran
function calculePosition(zone){
	// let x = Math.random();
	// let y = Math.random();
	let x = x * zone.w;
	let y = y * zone.h;
	verifSiPlaceLibre(x,y);
}

function verifSiPlaceLibre(x,y){
	if(true){
		setPosition(x,y);
	}else{
		calculePosition(x,y);
	}
}

//definir la position de l'objet
function setPosition(objet, x,y){
	objet.x = x;
	objet.y = y;
}

//les événements des cubes
//-------------------------------------

//	SC.evt("ce qui sera affiché lors du debug");
var drawMe = SC.evt("dessine-moi");//globale car diffusion broadcast (parle à tout le monde) Tous les objets disent cette phrase
