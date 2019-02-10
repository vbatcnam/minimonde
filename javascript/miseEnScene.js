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
for(var i=1; i<=10; i++){
	for(var j=0; j<=10; j++){
		monde.addActor(new Herbe(i+','+j,j,i+1));
	}
}


/**			Brouillon
	//l'herbe
	for(let tab_CubeHerbe of cubePrairie){
	  for(let cube of tab_CubeHerbe){
		monde.addActor(cube);
		}
	}

	var numHerbe = 1;
	var nbreColonnes = 10;
	var nbreLigne = 4;
	//les cubes d'herbe sont placés sur la prairie
	for(var c = 0; c < nbreColonnes; c++) {
		for(var r = 0; r < nbreLigne; r++) {
			if(tab2d_prairie[c][r] == "herbe") {
				tab2d_prairie[c][r] = SC.cube(
						herbe
						, SC.kill( SC.my("killMe"), progHerbe )
				);
				numHerbe++;
			}
		}
	}
	//affecte une position sur la zone
	faitNaitre(zone, objetAfaireNaitre){
		let position = this.donnePositionPlaceLibre(zone.surface);
		objetAfaireNaitre.x = position.x;
		objetAfaireNaitre.y = position.y;
	}
	
	donnePositionPlaceLibre(surfaceZone){
		//parcourir la surface de la zone
		//elle peut écouter les evts des cubes déjà sur cette zone.
		
		return {x:0, y:0};
		//return false si aucune place n'est libre
	}
*/