/**
	Cycle de l'herbe :
		elle pousse (grandit)
		elle est mangée (disparaît)
		elle repousse
		....
	IL faudra positionner l'herbe de manière aléatoire à un endroit libre de la prairie
*/
class Herbe extends Vegetal{
	constructor(espece, num){
		super(espece, num);
		this.killMe = SC.evt("kill");
	}
	
	verifSiEaten(obj_all, machine){
		//si mangée
		if(true){
			eaten(machine);
		}
	}
	
	eaten(machine){
		machine.generateEvent(this.killMe)
	}
	
	renait(){
		this.taille = 1; //this.taille est défini dans Vegetal
	}
}

//test
//==================
// var n = 1;
// for(var c = 0; c < nbreColonnes; c++) {
	// for(var r = 0; r < nbreLigne; r++) {
		// if(tab2d_prairie[c][r] == "herbe") {
			// let herbe = new Herbe(n,c,r);
			// herbe.draw(herbe.x,herbe.y)
			// tab2d_prairie[c][r] = herbe;
			// n++;
		// }
	// }
// }
// for(var c = 0; c < nbreColonnes; c++) {
	// for(var r = 0; r < nbreLigne; r++) {
		// console.log(tab2d_prairie[c][r]);
		// console.log(tab2d_prairie[c][r].x);
		// console.log(tab2d_prairie[c][r].y);
	// }
// }

//================================================================
//							le cube 
//================================================================

//Événements de l'herbe
//----------------------
var eatMe;
if(this.taille == 3){ 
	eatMe = SC.evt("mange moi");
}

//le comportement du cube qui a l'herbe
var progHerbe = SC.par(
	SC.generate(eatMe, SC.my("me"), SC.forever)//Si elle est adulte
	//, SC.actionOn(jeMange, SC.my("eaten"), undefined, SC.forever)
	, SC.generate(drawMe, SC.my("drawer"), SC.forever)//se dessine
);


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