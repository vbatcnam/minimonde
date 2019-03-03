'use strict';

/**
	C'est le fichier centrale qui ajoute tous tous les cubes au monde.
	
	Les systèmes de coordonnées de MiniMonde
	========================================
	- Système ASTRAL de cordonnées :
		Dans ce système si le X et Y reste le même et que le Z augmente, 
		on se retrouvera au même endroit sur l'écran :
			un objet cache un autre.
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
//les herbes
for(var i=1; i<=10; i++){
	for(var j=-10; j<=10; j++){
		monde.addActor(new Herbe(i+','+j,j+Math.random(),i+Math.random()));
	}
}
monde.addActor(new Vache(1, 0,0,5));
monde.addActor(new Vache(2, 4,0,10));
monde.addActor(new Vache(3, -4,0,2));
