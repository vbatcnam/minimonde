/**
	le soleil a un axe de déplacement dans le ciel
	Il rougit un peu lorsqu'il se couche
	Il grandit sur l'horizon puis rétrécit dans le ciel
*/
class Soleil{
	constructor(){
		this.id = "soleil";
		
		/**methode JFS pour les murs
		this.drawer = {};
		Object.defineProperty(this.drawer, "drawSelf"
								, { enumerable:false
									, value:this.draw.bind(this)
									, writable: false
								}
							);*/
	}
	
	draw(x,y){
		var ciel = document.getElementById("ciel");
		var zoneSoleil = document.createElement("object");
		zoneSoleil.id = this.id;
		zoneSoleil.className = "soleil";
		zoneSoleil.type = "image/svg+xml";
		zoneSoleil.data = "image/soleil.svg";
		ciel.appendChild(zoneSoleil);
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
}

//test
//==================
var soleil = new Soleil();
soleil.draw(0,0);
// window.addEventListener("load", function(evt){
	// var eltSvg = herbe.getEltSVG();
	// console.log("eltSvg après return de getEltSVG");
	// console.log(eltSvg);
	// herbe.getEchelle(eltSvg);
// })


//================================================================
//							le cube 
//================================================================

//le comportement du cube qui a le soleil
