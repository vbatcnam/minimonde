'use strict';
/**
	Librairie de géométrie
*/

/*
	Repositionnement des objets scale et translate 
	supposons qu'on a un objet en (2,1) et qu'on fait un scale de 3 
	Il faudra faire un translate de (?,?) pour que l'objet se retrouve à son point de départ (2/3, 1/3) dans les nouvelles coordonnées. Or il reste par défaut en (2,1). Il se retrouve plus loin
			xAvantTranslate = objet.x;
			yAvantTranslate = objet.y;
			xVoulu = xAvantTranslate / scale;
			yVoulu = yAvantTranslate / scale;
			differenceX = xVoulu - xAvantTranslate;
			differenceY = yVoulu - yAvantTranslate;
			translate( differenceX, differenceY);
			
*/

function calculeTranslate(scale, x, y){
	let xAvantTranslate = x;
	let yAvantTranslate = y;
	let xVoulu = xAvantTranslate / scale;
	let yVoulu = yAvantTranslate / scale;
	let differenceX =  xVoulu - xAvantTranslate;
	let differenceY =  yVoulu - yAvantTranslate;
	return {x: differenceX ,y: differenceY};
}
