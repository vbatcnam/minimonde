/**
	Pour simplifier dans un premier temps, je fais une grille.
	Par la suite, les herbes seront plantées aléatoirement sur la prairie
*/
class Prairie extends Zone{
	constructor(nom, w, h){
		super(nom, w, h);
	}
}

var hauteurPrairie = Math.floor(viewPort.h * 0.60);//60% du viewport
var prairie = new Prairie('prairie', viewPort.w, hauteurPrairie);

//grille de la prairie 
var tab2d_prairie = [];
var nbreLigne = 7; //calculée selon la hauteur du viewport
var nbreColonnes = 23 ; //calculée selon la largeur du viewport


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

// for(var c = 0; c < nbreColonnes; c++) {
	// for(var r = 0; r < nbreLigne; r++) {
		// console.log(tab2d_prairie[c][r]);
	// }
// }
