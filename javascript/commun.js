'use strict';

// les fonctions communes
//-------------------------------------
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

//Le viewPort : Objet qui contient la hauteur et la largeur du viewPort
//-------------------------------------
var viewPort = {'w':innerWidth, 'h':innerHeight};
console.log("Taille du iewPort");
console.log("largeur : " + viewPort.w + " px, hauteur : " + viewPort.h);
console.log("========================================================");

// Afficher les infos de l'objet Windows
console.log("largeur disponible de l'ecran ");
console.log("largeur : " + screen.availWidth + " px, hauteur : " + screen.availHeight);
console.log("========================================================");

console.log("taille de l'écran");
console.log("largeur : " + screen.width + " px, hauteur : " + screen.height);
console.log("========================================================");

console.log("devicePixelRatio : " + devicePixelRatio);
console.log("========================================================");

console.log("navigateur : " + navigator.userAgent);
console.log("========================================================");
 
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
var drawMe = SC.evt("dessine-moi");//globale car diffusion broadcast (parle à tout le monde) Tous les objets disent cette phrase
