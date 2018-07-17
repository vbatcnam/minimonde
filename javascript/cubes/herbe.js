/**
	Cycle de l'herbe :
		elle pousse (grandit)
		elle est mangée (disparaît)
		elle repousse
		....
*/
class Herbe extends Vegetal{
	constructor(espece, num, x, y, img){
		super(espece, num, x, y, img);
		this.killMe = SC.evt("kill");
	}
	
	//Positionner l'herbe de manière aléatoire à un endroit libre de la prairie
	
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
		this.taille = 0;
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
if(this.taille = 3){ 
	eatMe = SC.evt("mange moi");
}

//le comportement du cube qui a l'herbe
var progHerbe = SC.par(
	SC.generate(eatMe, SC.forever)//Si elle est adulte
	//, SC.actionOn(jeMange, SC.my("eaten"), undefined, SC.forever)
	, SC.generate(drawMe, SC.my("drawer"), SC.forever)//se dessine
);


//les cubes d'herbe sont placés sur la prairie
var numHerbe = 1;

for(var c = 0; c < nbreColonnes; c++) {
	for(var r = 0; r < nbreLigne; r++) {
		if(tab2d_prairie[c][r] == "herbe") {
			tab2d_prairie[c][r] = SC.cube(
					new Herbe(numHerbe,c,r)
					, SC.kill( SC.my("killMe"), progHerbe )
			);
			numHerbe++;
		}
	}
}