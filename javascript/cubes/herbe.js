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
		this.drawer = {};

		Object.defineProperty(this.drawer, "drawSelf"
								, { enumerable:false
									, value:this.draw.bind(this)
									, writable: false
								}
							);
	}
	
/**
Explication de Object.defineProperty()

Object.defineProperty(objet, propriété, objetQuiIndiqueLesCaracteristiqueDeLaPropriete)

objetQuiIndiqueLesCaracteristiqueDeLaPropriete contient  value, enumerable, writable
On pourrait ecrire objet[propriété]= value mais on ne pas configurer l'attribut writable ou enumerable

Object.defineProperty(this.drawer, "drawSelf"
						, { enumerable:false
							, value:this.draw.bind(this)
							, writable: false
						}
					);
On pourrait écrire 
	this.drawer.drawSelf = this.draw.bind(this)
	mais on ne peux pas configurer enumerable ni writable
la propriété enumerable = false veut dire que lorsqu'on parcourt les propriété celle ci ne sera pas prise en compte.
*/

	//Positionner l'here de manière aléatoire à un endroit libre de la prairie
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
var n = 1;
for(var c = 0; c < nbreColonnes; c++) {
	for(var r = 0; r < nbreLigne; r++) {
		if(tab2d_prairie[c][r] == "herbe") {
			let herbe = new Herbe(n,c,r);
			herbe.draw(herbe.x,herbe.y)
			tab2d_prairie[c][r] = herbe;
			n++;
		}
	}
}
for(var c = 0; c < nbreColonnes; c++) {
	for(var r = 0; r < nbreLigne; r++) {
		console.log(tab2d_prairie[c][r]);
		console.log(tab2d_prairie[c][r].x);
		console.log(tab2d_prairie[c][r].y);
	}
}

//================================================================
//							le cube 
//================================================================

//Événements de l'herbe
//----------------------
var iAmGrass = SC.evt("Je suis une herbe");

//le comportement du cube qui a l'herbe
var progHerbe = SC.par(
	SC.generate(iAmGrass, SC.forever)//parle pour signaler qu'elle est en vie
	//, SC.actionOn(jeMange, SC.my("eaten"), undefined, SC.forever)
	, SC.generate(drawMe, SC.my("me"), SC.forever)//se dessine
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