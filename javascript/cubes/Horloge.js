'use strict';
/** 
	Horloge.js
	Auteur : Véronique Lion 
	Participation : Claude Lion.
	Date création : 03/03/2019 20h15
	Copyright : © Véronique Lion 2018
*/

//On démarre le monde
var monde = SC.machine(undefined, {init:SC.par()});//Temps de l'animation et des calculs et pas le temps du monde. (vitesse d’exécution)

/*** POUR TEST 
var monde = SC.machine();
var instant = 25
//broute à instant * 22
for(var i = 1; i<=100; i++)
	setTimeout(monde.react.bind(monde),instant * i);
*/


/***
	Temps du monde : 1 heure du miniMonde correspond à 1 mn temps IRL
	1 mn miniMonde = 1 seconde IRL
	Le soleil fait un tour complet tous les 57600 tics 
	1 jour du jeu = 1440 secondes IRL (24 mn)
*/

//lancer les signaux des étapes
/**25 est assez bien pour une fluidité des animations(40 tics/s). De plus c'est chiffre rond 1000 ms/25Ms tombe juste.
 * Tous les 25 millisecondes il va relancer un signal "step" pendant 100 fois*/

//~ //lancer une série de réaction
//~ reactMultiple(monde);

class Horloge extends SCCube{
	constructor(){
		super();
	}

	getTimeMinuteImaginaire(){
		const timeIRL_MS = monde.delay * monde.instantNumber; //nbre de MS depuis que le jeu est lancé.
		const timeImaginaire_Mn = timeIRL_MS/1000; //nbre de secondes depuis que le jeu est lancé.
		return timeImaginaire_Mn; // retourne parfois chiffre à virgule
	}

	getTimeHeureImaginaire(){
		return this.getTimeMinuteImaginaire()/60; // retourne parfois chiffre à virgule
	}

	getNbreJoursImaginaire(){
		return this.getTimeHeureImaginaire()/24; // retourne parfois chiffre à virgule
	}
	
	$_steps(){
		//~ return SC.multiDifferGen(SC.forever, 50, SCSENSOR('tick'));
		return SC.multiDifferGen(30, 500, SCSENSOR('tick'));//pour debug
	}
}

var horloge = new Horloge();
