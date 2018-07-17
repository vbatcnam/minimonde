/**
	Cycle de l'herbe :
		elle pousse (grandit)
		elle est mangée (disparaît)
		elle repousse
		....
*/
class Herbe extends Vegetal{
	constructor(num, x, y){
		super(num, x, y);
		this.id = "herbe_" + this.num;
		this.killMe = SC.evt("kill");
	}
	
	//Positionner l'herbe de manière aléatoire à un endroit libre de la prairie
	calculePosition(){
		let x = Math.random();
		let y = Math.random();
		verifSiPlaceLibre(x,y);
	}
	
	setPosition(x,y){
		this.x = x;
		this.y = y;
	}
	verifSiPlaceLibre(x,y){
		if(true){
			setPosition(x,y);
		}else{
			calculePosition(x,y);
		}
	}
	
	//afficher l'herbe
	draw(x,y){
		var prairie = document.getElementById("prairie");
		var zoneHerbe = document.createElement("object");
		zoneHerbe.id = this.id;
		zoneHerbe.className = "herbe";
		zoneHerbe.type = "image/svg+xml";
		zoneHerbe.data = "image/herbe.svg";
		zoneHerbe.style.position = "absolute";
		zoneHerbe.style.left = '' + (x*45) + 'px';
		zoneHerbe.style.top = '' + (y*40) + 'px';
		prairie.appendChild(zoneHerbe);
	}
	
	getEltSVG(){
		let eltObject = document.getElementById(this.id);
		console.log("eltObject dans la fonction getEltSVG :");
		console.log(eltObject);
		let eltSVG = eltObject.contentDocument;
		console.log("eltSVG dans la fonction getEltSVG :");
		console.log(eltSVG);
		return eltSVG;
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