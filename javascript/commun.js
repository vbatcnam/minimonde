'use strict';
/** 
	commun.js
	Fonctions communes au jeu "minimonde" 
	Auteur : Véronique Lion
	Date création : 13/07/2018
	Copyright : © Véronique Lion 2018
*/
// les fonctions communes
//-------------------------------------

/**

//Affiche la taille du viewPort
//-------------------------------------
var viewPort = {'w':innerWidth, 'h':innerHeight};
console.log("Taille du viewPort");
console.log("largeur : " + viewPort.w + " px, hauteur : " + viewPort.h);
console.log("========================================================");

// Affiche les infos de l'objet Windows
console.log("Taille disponible de l'ecran ");
console.log("largeur : " + screen.availWidth + " px, hauteur : " + screen.availHeight);
console.log("========================================================");

console.log("taille de l'écran");
console.log("largeur : " + screen.width + " px, hauteur : " + screen.height);
console.log("========================================================");

console.log("devicePixelRatio : " + devicePixelRatio);
console.log("========================================================");

console.log("navigateur : " + navigator.userAgent);
console.log("========================================================");
*/

//-------------------------------------
//les dessins svg
//-------------------------------------
/**
	Dessiner les dessins dans inkscape en évitant de laisser les translate qu'il fabrique par défaut pour ne pas à avoir à utiliser les fonctions ci-dessous.
*/

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

/**
	Fonctions non encore utilisées : Vérifier avec Claude si utiles.
*/

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

/**
	A retirer quand plus utiliser (code retravaillé et nettoyé)
*/
//les événements des cubes
//-------------------------------------
var drawMe = SC.evt("dessine-moi");//globale car diffusion broadcast (parle à tout le monde) Tous les objets disent cette phrase
