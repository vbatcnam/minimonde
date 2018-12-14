'use strict';

//On démarre le monde
var monde = SC.machine(25);//Temps de l'animation et des calculs et pas le temps du monde. 
/**25 est assez bien pour une fluidité des animations(40 tics/s). De plus c'est chiffre rond 1000 ms/25Ms tombe juste.*/

/***
	Temps du monde : 1 heure du miniMonde correspond à 1 mn temps IRL
	Le soleil fait un tour complet tous les 57600 tics 
	1 jour = 1440 secondes 
*/
class Horloge extends SCCube{
	constructor(){
		super();
	}
}

