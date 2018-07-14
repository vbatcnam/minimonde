class Herbe extends Vegetal{
	constructor(num){
		super(num);
		this.id = "herbe_" + this.num;
	}
	
	//Il faudra les positionner de manière aléatoire 
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
	
	getEchelle(elt){
		return array_getEchelle(elt);
	}
	
	verifSiEaten(obj_all, machine){
		this.alive = false;
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
	, SC.actionOn(vacheMange, SC.my("me"), SC.my("eaten"), undefined, SC.forever)
	, SC.generate(drawMe, SC.my("me"), SC.forever)//se dessine
);