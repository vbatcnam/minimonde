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
		console.log(eltObject);
		let eltSVG = eltObject.contentDocument;
		console.log(eltSVG);
		return eltSVG;
	}
	
	getEchelle(elt){
		return array_getEchelle(elt);
	}
	
}

//test
for(var i = 0; i<5; i++){
	let herbe = new Herbe(i+1);
	herbe.draw(i+2, i+4);
	var eltSvg = herbe.getEltSVG();
	var attributs = eltSvg;
	herbe.getEchelle(eltSvg);
}