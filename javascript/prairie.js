/**
	Pour simplifier dans un premier temps, je fais une grille.
	Par la suite, les herbes seront plantées aléatoirement sur la prairie
*/

//grille de la prairie 
var tab2d_prairie = [];
var nbreLigne = 5;
var nbreColonnes = 9 ; 


for(var c = 0; c < nbreColonnes; c++) {
	tab2d_prairie[c] = [];
	for(var r = 0; r < nbreLigne; r++) {
		if(r%2 == 0){
			tab2d_prairie[c][r] = 'herbe';// ici poussera une herbe
		}
		else{
			tab2d_prairie[c][r] = 'fleur';// ici poussera une fleur
		}
	}
}