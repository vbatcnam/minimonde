'use strict';

//On démarre le monde
var monde = SC.machine(25);//Temps de l'animation et des calculs et pas le temps du monde. (vitesse d’exécution)

/*** POUR TEST */
// var monde = SC.machine();
// var instant = 25
// //broute à instant * 22
// for(var i = 1; i<=200; i++)
// for(var i = 1; i<=100; i++)
	//setTimeout(monde.react.bind(monde),instant * i);


/**25 est assez bien pour une fluidité des animations(40 tics/s). De plus c'est chiffre rond 1000 ms/25Ms tombe juste.*/

/***
	Temps du monde : 1 heure du miniMonde correspond à 1 mn temps IRL
	1 mn miniMonde = 1 seconde IRL
	Le soleil fait un tour complet tous les 57600 tics 
	1 jour du jeu = 1440 secondes IRL (24 mn)
*/
class Horloge extends SCCube{
	constructor(){
		super();
	}
	
	//renommer getTimeMinuteImaginaire
	getTimeMinute(){
		const timeIRL_MS = monde.delay * monde.instantNumber; //nbre de MS depuis que le jeu est lancé.
		const timeImaginaire_Mn = timeIRL_MS/1000; //nbre de secondes depuis que le jeu est lancé.
		return timeImaginaire_Mn; // retourne parfois chiffre à virgule
	}
	
	//renommer getTimeHeureImaginaire
	getTimeHeure(){
		return this.getTimeMinute()/60; // retourne parfois chiffre à virgule
	}
	
	//renommer getNbreJoursImaginaire
	getNbreJours(){
		return this.getTimeHeure()/24; // retourne parfois chiffre à virgule
	}
}

var horloge = new Horloge();