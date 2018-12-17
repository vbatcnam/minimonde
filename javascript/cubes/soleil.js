'use strict';

/**
	le soleil a un axe de déplacement dans le ciel
	Il rougit un peu lorsqu'il se couche
	Il grandit sur l'horizon puis rétrécit dans le ciel
	il se déplace d'est en ouest (la camera est orientée vers le sur pour le moment)
	
	Le soleil donne sa position, son dessin, le fait qu'il se dessine par rapport à l'écran et non à la réalité.
*/
class Soleil extends SCCube{
	constructor(){
		super();
		//Est = 0; West = 100
		/**
			les xCiel et yCiel sont des abscisses et ordonnées de notre système imaginaire qui ne correspondent pas au x et y des pixels
			Ils ont été créés pour le calcul du déplacement du soleil
			C'est la camera qui traduira pour positionner sur l'écran
		*/
		this.xCiel = 0; //quelque part à l'est
		this.yCiel = 0;
		this.zCiel = 0; // Arrière plan
		this.id = "soleil";
		this.illustration = `<path id="${this.id}" d="m94.474 102.62-20.768-19.234 6.5042 27.549-14.176-24.501-1.9051 28.243-6.3245-27.591-10.145 26.426 2.0891-28.23-17.484 22.262 10.317-26.36-23.269 16.119 17.628-22.148-26.986 8.5447 23.373-15.968-28.306 0.21075 27.041-8.3687-27.111-8.142 28.307-0.026342-23.506-15.771 27.057 8.3184-17.813-21.999 23.403 15.924-10.538-26.272 17.67 22.115-2.3255-28.211 10.366 26.34 6.0932-27.643 2.1416 28.226 13.97-24.619-6.2732 27.603 20.606-19.407-14.131 24.528 25.411-12.471-20.732 19.273 27.958-4.4272-25.492 12.306 28.021 4.0104-27.987 4.245 25.594 12.092-27.995-4.1929 20.893 19.098-25.515-12.258z" style="fill:#ff0;opacity:1" />`;
	}
	
	/** "repere" sert à savoir comment sera transformé le faux 3D en 2D 
			"ecran" est pour le ciel : quand z change l'objet ne bouge pas sur l’écran (il se trouve devant ou derrière un autre objet)
			"reel" est pour la prairie si z est plus grand il sera descendu par rapport à l'écran
		*/
	$publicVar_monApparence(){
		return {//les infos envoyées
			repere:'ecran',
			id:this.id,
			x:this.xCiel,
			y:this.yCiel,
			z:this.zCiel,
			dessin:this.illustration
		}
	}
	
	//fonction bouge selon sa trajectoire d'est en ouest
	$actionForever_bouge(){
	/**
		xCiel va de 0 à 1 de gauche à droite
		yCiel va de 0 à 1 de haut en bas
	*/
		const angleRad = this.calculeAngleRad();
		const xCercle = Math.sin(angleRad)// entre 1 et -1
		const yCercle = Math.cos(angleRad)// entre -1 et 1
		//on convertir pour avoir entre 0 et 1
		this.xCiel = 1-(xCercle+1)/2;
		this.yCiel = (yCercle+1)/2;
	}
	
	calculeAngleRad()
	{
		const nbreTours = horloge.getNbreJours();
		const portionTour = nbreTours % 1;
		return portionTour * 2 * Math.PI; //retourne l'angle en radiant
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


