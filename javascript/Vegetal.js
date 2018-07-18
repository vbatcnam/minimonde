class Vegetal{
	constructor(espece, num){
		this.espece = espece;
		this.num = num;
		this.id = this.espece + "_" + this.num;
		this.taille = 1; //bébé
		this.drawer = {};
		
		Object.defineProperty(this.drawer, "drawSelf"
			, { enumerable:false
				, value:this.draw.bind(this)
				, writable: false
			}
		);
	}

	
	draw(x,y){
		let prairie = document.getElementById("prairie");
		let zoneVegetal = document.createElement("object");
		zoneVegetal.id = this.id;
		zoneVegetal.className = this.espece;
		zoneVegetal.type = "image/svg+xml";
		zoneVegetal.data = "image/" + this.espece + ".svg";
		zoneVegetal.style.position = "absolute";
		zoneVegetal.style.left = x + 'px';
		zoneVegetal.style.top = y + 'px';
		prairie.appendChild(zoneVegetal);
	}
	
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
