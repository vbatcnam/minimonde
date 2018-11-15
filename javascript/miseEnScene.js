/**
	C'est le fichier centrale qui ajoute tous tous les cubes au monde.
*/

monde.addActor(cubePrairie);
monde.addActor(new Camera2D());
monde.addActor(new Soleil());
monde.addActor(new Herbe('herbe', 1));


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