'use strict';
//Le viewPort

var viewPort = {'w':window.innerWidth, 'h':window.innerHeight};
console.log("largeur viewPort");
console.log(viewPort.w);
console.log("hauteur viewPort");
console.log(viewPort.h);
//les dessins svg
//-------------------------------------

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

//mise à l’échelle pour faciliter les translate
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

//calculer position sur l'écran
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

function setPosition(objet, x,y){
	objet.x = x;
	objet.y = y;
}

//les événements des cubes
//-------------------------------------

//	SC.evt("ce qui sera affiché lors du débug");
var drawMe = SC.evt("dessine-moi");//globale car diffusion broadcast (parle à tout le monde) Tous les objets disent cette phrase

