'use strict';

class Vegetal extends SCCube{
	constructor(espece, num, x, z){
		super();
		this.espece = espece; // herbe, fleur, arbre...
		this.num = num;
		this.id = this.espece + "_" + this.num;
		this.xTerrestre = x; 
		this.yTerrestre = 0; // sur le sol
		this.zTerrestre = z; 
	}

	/** "repere" sert à savoir comment sera transformé le faux 3D en 2D 
			"ecran" est pour le ciel : quand z change l'objet ne bouge pas sur l’écran (il se trouve devant ou derrière un autre objet)
			"reel" est pour la prairie si z est plus grand il sera descendu par rapport à l'écran
		*/
	$publicVar_monApparence(){
		return {//les infos envoyées
			repere:'terrestre',
			id:this.id,
			espece:this.espece,
			x:this.xTerrestre,
			y:this.yTerrestre,
			z:this.zTerrestre,
			dessin:this.illustration,
		}
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
