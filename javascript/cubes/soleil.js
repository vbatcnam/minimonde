/**
	le soleil a un axe de déplacement dans le ciel
	Il rougit un peu lorsqu'il se couche
	Il grandit sur l'horizon puis rétrécit dans le ciel
*/
class Soleil extends SCCube{
	constructor(){
		super();
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
