/**
	S’occupe de gérer l'herbe, les fleurs, les bouses...
	Pour simplifier dans un premier temps, je fais une grille.
	Par la suite, les herbes seront plantées aléatoirement sur la prairie
*/
class Prairie extends Zone{
	constructor(nom, w, h){
		super(nom, w, h);
	}
	
	afficheLesEltsDeLaPrairie(){
		//grille de la prairie 
		let tab2d_prairie = [];
		//calculée selon la hauteur du viewport et la taille de l'image
		let nbreLigne = 7; 
		//calculée selon la largeur du viewport et la taille de l'image
		let nbreColonnes = 23 ;
		for(var c = 0; c < nbreColonnes; c++) {
			tab2d_prairie[c] = [];
			for(var r = 0; r < nbreLigne; r++) {
				if(r%2 == 0 && c%2 == 0){
					tab2d_prairie[c][r] = 'herbe';// ici poussera une herbe
				}
				else{
					tab2d_prairie[c][r] = 'fleur';// ici poussera une fleur
				}
			}
		}
		for(var c = 0; c < nbreColonnes; c++) {
			for(var r = 0; r < nbreLigne; r++) {
				console.log(tab2d_prairie[c][r]);
			}
		}
		
		//les cubes d'herbe sont placés sur la prairie
		var numHerbe = 1;

		for(var c = 0; c < nbreColonnes; c++) {
			for(var r = 0; r < nbreLigne; r++) {
				if(tab2d_prairie[c][r] == "herbe") {
					let herbe = new Herbe('herbe', numHerbe);
					herbe.x = c;// il faudra calculer de manière aléatoire
					herbe.y = r;// il faudra calculer de manière aléatoire
					tab2d_prairie[c][r] = SC.cube(
							herbe
							, SC.kill( SC.my("killMe"), progHerbe )
					);
					numHerbe++;
				}
			}
		}		
	}
}

//================================================================
//							le cube 
//================================================================

// le comportement du cube de la zone de jeu
var progPrairie = SC.actionOn(
        drawMe
        , SC.my("afficheLesEltsDeLaPrairie")
        , undefined
        , SC.forever
);

//on met l'objet dans un cube
//la prairie
var hauteurPrairie = Math.floor(viewPort.h * 0.60);//60% du viewport
var prairie = new Prairie('prairie', viewPort.w, hauteurPrairie);

var cubePrairie = SC.cube( prairie, progPrairie);
