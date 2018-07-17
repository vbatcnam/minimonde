class Vegetal{
	constructor(num, x, y){
		this.num = num;
		this.x = x;
		this.y = y;
		this.taille = 0; //Naissance (De 0 à 5 étapes)
		this.drawer = {};
	}
	
	grandi(){
		this.taille += 1;
	}
	
	Object.defineProperty(this.drawer, "drawSelf"
						, { enumerable:false
							, value:this.draw.bind(this)
							, writable: false
						}
					);
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
