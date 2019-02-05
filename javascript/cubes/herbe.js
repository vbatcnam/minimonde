'use strict';

/**
	Cycle de l'herbe :
		elle pousse (grandit)
		elle est mangée (disparaît)
		elle repousse
		....
	IL faudra positionner l'herbe de manière aléatoire à un endroit libre de la prairie
*/
class Herbe extends Vegetal{
	constructor(num, x, z){
		super("herbe", num, x, z);
		this.killMe = SC.evt("kill");
		this.illustration =   `
			<g  id="${this.id}" class="herbe">
				<path d="m-22.449-2.6183c6.0894-1.7358 18.029 2.1712 20.596 12.48 1.0905-19.595 8.9621-25.438 16.049-29.862-9.5423 8.4806-14.435 15.466-13.13 32.733 4.3806-9.7003 13.16-13.146 21.381-8.3818-12.189-3.6791-19.24 8.1239-20.708 15.649h-3.4832c-0.7684-6.8486-1.4953-19.734-20.703-22.619z" style="fill:#003a00;stroke-width:1.7496"/>
				<path d="m22.449-2.6183c-6.0895-1.7358-18.029 2.1712-20.596 12.48-1.0905-19.595-8.9621-25.438-16.049-29.862 9.5423 8.4806 14.435 15.466 13.13 32.733-4.3806-9.7003-13.16-13.146-21.381-8.3818 12.189-3.6791 19.24 8.1239 20.708 15.649h3.4832c1.943-6.8107 1.4953-19.734 20.703-22.619z" style="fill:#009d00;stroke-width:1.7496"/>
			</g>`
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
var eatMe = SC.evt("je suis commestible");

//le comportement du cube qui a l'herbe
var progHerbe = SC.par(
SC.generate(eatMe, SC.my("me"), SC.forever)//La vache vérifie si elle est adulte avant de la manger
//, SC.actionOn(jeMange, SC.my("eaten"), undefined, SC.forever)
, SC.generate(drawMe, SC.my("drawer"), SC.forever)//se dessine
);

