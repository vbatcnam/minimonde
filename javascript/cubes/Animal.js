class Animal extends SCCube{
	constructor(espece, num){
		super();
		this.espece = espece;
		this.num = num;
		this.id = this.espece + "_" + this.num;
		this.x = 0;
		this.y = 0;
		this.age = 0; 
		this.faim = 0; //n'a pas faim (100 a très faim)
		this.drawer = {};
	
		Object.defineProperty(this.drawer, "drawSelf"
			, { enumerable:false
				, value:this.draw.bind(this)
				, writable: false
			}
		);
	}
	
	// les animaux volants se déplace dans la zone de jeu, les non volants dans la zone prairie
	draw(x, y, zone, attitude){
		let prairie = document.getElementById("prairie");//non volant
		let zoneAnimal = document.createElement("object");
		zoneAnimal.id = this.id;
		zoneAnimal.className = this.espece;
		zoneAnimal.type = "image/svg+xml";
		zoneAnimal.data = "image/" + this.espece + "_" + attitude + ".svg";
		zoneAnimal.style.position = "absolute";
		zoneAnimal.style.left = x + 'px';
		zoneAnimal.style.top = y + 'px';
		zone.appendChild(zoneAnimal);
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
