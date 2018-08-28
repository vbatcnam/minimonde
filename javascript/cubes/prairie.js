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
		console.log ("nbre lignes"); 
		console.log (this.surface.length); 
		let nbreLignes = 7 ;
		//calculée selon la largeur du viewport et la taille de l'image
		let nbreColonnes = 23 ;
		for(var c = 0; c < nbreColonnes; c++) {
			tab2d_prairie[c] = [];
			for(var r = 0; r < nbreLignes; r++) {
				if(r%2 == 0 && c%2 == 0){
					tab2d_prairie[c][r] = 'herbe';// ici poussera une herbe
				}
				else{
					tab2d_prairie[c][r] = 'fleur';// ici poussera une fleur
				}
			}
		}
		for(var c = 0; c < nbreColonnes; c++) {
			for(var r = 0; r < nbreLignes; r++) {
				console.log(tab2d_prairie[c][r]);
			}
		}
	}
}

//Je crée la prairie
var hauteurPrairie = Math.floor(viewPort.h * 0.60);//60% du viewport
var prairie = new Prairie('prairie', viewPort.w, hauteurPrairie);
//wMaxImage taille minimal acceptable pour voir l'objet
// trouver la taille du pixel de l'appareil du joueur
//prairie.fabriqueSurface(wMaxImage, hMaxImage);

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
var cubePrairie = SC.cube( prairie, progPrairie);
