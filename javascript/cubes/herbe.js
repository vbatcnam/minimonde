/**
	Cycle de l'herbe :
		elle pousse (grandit)
		elle est mangée (disparaît)
		elle repousse
		....
*/
class Herbe extends Vegetal{
	constructor(num){
		super(num);
		this.id = "herbe_" + this.num;
		this.killMe = SC.evt("kill");

		/**methode JFS pour les murs
		this.drawer = {};
		Object.defineProperty(this.drawer, "drawSelf"
								, { enumerable:false
									, value:this.draw.bind(this)
									, writable: false
								}
							);*/
	}

	//Il faudra les positionner de manière aléatoire 
	calculePosition(){
		let x = Math.random();
		let y = Math.random();
		verifSiPlaceLibre(x,y);
	}
	
	verifSiPlaceLibre(x,y){
		if(true){
			setPosition(x,y);
		}else{
			calculePosition(x,y);
		}
	}
	
	setPosition(x,y){
		this.x = x;
		this.y = y;
	}
	
	draw(x,y){
		var prairie = document.getElementById("prairie");
		var zoneHerbe = document.createElement("object");
		zoneHerbe.id = this.id;
		zoneHerbe.className = "herbe";
		zoneHerbe.type = "image/svg+xml";
		zoneHerbe.data = "image/herbe.svg";
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
for(var i = 0; i<5; i++){
	let herbe = new Herbe(i+1);
	herbe.draw(i+2, i+4);
	window.addEventListener("load", function(evt){
		var eltSvg = herbe.getEltSVG();
		console.log("eltSvg après return de getEltSVG");
		console.log(eltSvg);
		herbe.getEchelle(eltSvg);
	})
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
	, SC.actionOn(jeMange, SC.my("eaten"), undefined, SC.forever)
	, SC.generate(drawMe, SC.my("me"), SC.forever)//se dessine
);


//les cubes d'herbe sont placés sur la prairi
for(var c = 0; c < nbreColonnes; c++) {
	for(var r = 0; r < nbreLigne; r++) {
		if(tab2d_prairie[c][r] == "herbe") {
			tab2d_prairie[c][r] = SC.cube(
					new Herbe(c,r)
					, SC.kill( SC.my("killMe"), progHerbe )
			);
		}
		//start and kill when ...
	}
}