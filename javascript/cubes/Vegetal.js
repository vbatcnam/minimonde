class Vegetal extends SCCube{
	constructor(espece, num){
		super();
		this.espece = espece; // herbe, fleur, arbre...
		this.num = num;
		this.id = this.espece + "_" + this.num;
		this.taille = 1; //bébé
		this.x = 0; 
		this.y = 0; 
		this.fabriqueIllustration();
		console.log("Je suis un végétal " + this.espece);
	}

	$on_dessineToiEnLayer1(){
		let prairie = document.getElementById("champCamera");
		// let herbe = 
		// if(!zoneVegetal){
			// zoneVegetal.data = "image/" + this.espece + ".svg";
			// zoneVegetal.style.position = "absolute";
			// zoneVegetal.style.left = this.x + 'px';
			// zoneVegetal.style.top = this.y + 'px';
			// prairie.appendChild(zoneVegetal);
		// }
	}
	
	$on_dessineToiEn3D(){}
	
	grandi(){
		if(this.taille < 5)
			this.taille += 1;
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
