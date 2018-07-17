class Vegetal{
	constructor(espece, num, x, y, img){
		this.espece = espece;
		this.num = num;
		this.id = this.espece + "_" + this.num;
		this.x = x;
		this.y = y;
		this.taille = 1; //bébé
		this.img = img;
		this.drawer = {};
		
		Object.defineProperty(this.drawer, "drawSelf"
			, { enumerable:false
				, value:this.draw.bind(this)
				, writable: false
			}
		);
	}

	draw(x,y){
		var prairie = document.getElementById("prairie");
		var zoneVegetal = document.createElement("object");
		zoneVegetal.id = this.id;
		zoneVegetal.className = this.espece;
		zoneVegetal.type = "image/svg+xml";
		zoneVegetal.data = "image/" + this.espece + ".svg";
		zoneVegetal.style.position = "absolute";
		zoneVegetal.style.left = '' + (x*45) + 'px';
		zoneVegetal.style.top = '' + (y*40) + 'px';
		prairie.appendChild(zoneVegetal);
	}
	
	grandi(){
		if(this.taille < 5)
			this.taille += 1;
	}
	
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
