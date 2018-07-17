'use strict';
//les dessins svg
//-------------------------------------


function calculeTailleZone(pourcentageDuViewPort) {
	let pourcent = pourcentageDuViewPort /100;
	let w =  Math.floor(window.innerWidth * pourcent);
	let h =  Math.floor(window.innerHeight * pourcent);
	return {'w': w, 'h': h};
}

console.log("taille prairie");
console.log(calculeTailleZone(60));

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



//les événements des cubes
//-------------------------------------

//	SC.evt("ce qui sera affiché lors du débug");
var drawMe = SC.evt("dessine-moi");//globale car diffusion broadcast (parle à tout le monde) Tous les objets disent cette phrase

