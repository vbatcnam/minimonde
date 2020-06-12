'use strict';
/** 
	miseEnScene.js
	Fonctions communes au jeu "minimonde" 
	Auteur : Véronique Lion
	Date création : 13/11/2018
	Copyright : © Véronique Lion 2018
*/

/**
	C'est le fichier centrale qui ajoute tous tous les cubes au monde.
	
	Les systèmes de coordonnées de MiniMonde
	========================================
	- Système ASTRAL de cordonnées :
		Dans ce système si le X et Y reste le même et que le Z augmente, 
		on se retrouvera au même endroit sur l'écran :
			un objet en cache un autre.
		xAstral va de 0 à 1 de gauche à droite
		yAstral va de 0 à 2 de haut en bas
		zAstral va de 
			0 (la prairie)
			++ (derrière la prairie)

	- Système TERRESTRE de cordonnées :
		xTerrestre va de 
			-- (à gauche de l'observateur caméra)
			0 (au niveau de l'observateur) 
			++ (à droite de l'observateur) 
		yTerrestre va de 
			0 (au sol)
			1 (yeux de l'observateur caméra) 
			++ (au dessus des yeux de l'observateur)
		zTerrestre va de 
			0 (observateur derrière la vitre infinie) 
			1 (la vitre infinie) 
			++ (jusqu'à l'horizon)

	- Système PIXEL (de l'écran) de cordonnées.
	
*/
monde.addActor = monde.addProgram;
monde.addActor(new Camera());
monde.addActor(new Ciel());
monde.addActor(new Prairie());
monde.addActor(new Soleil());

//Ajout des herbes :
for(var i=1; i<=10; i++){
	for(var j=-10; j<=10; j++){
		monde.addActor(new Herbe(i+','+j,j+Math.random(),i+Math.random()));
	}
}

/*** Pour La création du chapitre 1 du jeu : ajout d'une première famille de vaches*/
monde.addActor(new Bovin(1, 6,0,5, 24, 3, 500, "F")); // vache
//~ monde.addActor(new Bovin(2, 4,0,10, 24, 3, 600, "M")); // taureau
//~ monde.addActor(new Bovin(3, -2,0,2, 1, 1, 40,"F"));//veau

monde.addActor(new Horloge());

//lancer une série de réaction
reactMultiple(monde);
