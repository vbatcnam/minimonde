/**
	Elle s’occupe de créer les plantes, les animaux...
	Elle regarde si il y a de la place dans la prairie et fait naître une herbe ou une fleur
*/
class Nature extends SCCube{
	constructor(){
		super();
	}
	
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
}

var dameNature = new Nature();
//test
var numHerbe = 1;
//les cubes d'herbe sont placés sur la prairie
dameNature.faitNaitre(prairie, new Herbe('herbe', numHerbe));

// for(var c = 0; c < nbreColonnes; c++) {
	// for(var r = 0; r < nbreLigne; r++) {
		// if(tab2d_prairie[c][r] == "herbe") {
			// tab2d_prairie[c][r] = SC.cube(
					// herbe
					// , SC.kill( SC.my("killMe"), progHerbe )
			// );
			// numHerbe++;
		// }
	// }
// }		
