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
			les xAstral et yAstral sont des abscisses et ordonnées de notre système imaginaire qui ne correspondent pas au x et y des pixels
			Ils ont été créés pour le calcul du déplacement du soleil
			C'est la camera qui traduira pour positionner sur l'écran
		*/
		this.xAstral = 0.5; //Sous l'horizon(nadir)
		this.yAstral = 2;
		this.zAstral = 80;
		this.id = "soleil";
		//centre du soleil defini autour du (0,0)
		this.illustration = `<path id="${this.id}" d="m30.53 39.551-18.504-17.728 5.4655 25.036-12.457-22.395-2.157 25.535-5.3023-25.072-9.5877 23.765 2.3233-25.521-16.167 19.883 9.7424-23.702-21.309 14.235 16.296-19.777-24.558 7.3212 21.401-14.095-25.625-0.24268 24.605-7.161-24.415-7.785 25.623 0.40962-21.036-14.636 24.364 7.9439-15.787-20.186 20.94 14.772-9.1359-23.942 15.655 20.288-1.6729-25.571 8.9798 24.001 5.9387-24.928 1.5063 25.582 13.023-22.07-6.101 24.889 18.949-17.251-13.166 21.985 23.193-10.9-19.061 17.128 25.375-3.5792-23.263 10.748 25.303 4.0592-25.398 3.4138 22.982 11.337-25.276-4.2239 18.619 17.607-22.908-11.486z"/>`;
		this.coloriage = {fill:"#ff0",opacity:1};
	}
	
	/** "repere" sert à savoir comment sera transformé le faux 3D en 2D 
			"astral" est pour le ciel : quand z change l'objet ne bouge pas sur l’écran (il se trouve devant ou derrière un autre objet)
			"terrestre" est pour la prairie si z est plus grand il sera descendu par rapport à l'écran
		*/
	$publicVar_monApparence(){
		return {//les infos envoyées
			repere:'astral',
			id:this.id,
			x:this.xAstral,
			y:this.yAstral,
			z:this.zAstral,
			dessin:this.illustration,
			coloriage: this.coloriage,
		}
	}
	
	//fonction bouge selon sa trajectoire d'est en ouest
	$actionForever_bouge(){
	/**
		xAstral va de 0 à 1 de gauche à droite
		yAstral va de 0 à 2 de haut en bas de la zone (préciser quelle zone)
	*/
		const angleRad = this.calculeAngleRad();
		const xCercle = Math.sin(angleRad)// entre 1 et -1
		const yCercle = Math.cos(angleRad)// entre -1 et 1
		//on converti pour avoir entre 0 et 1
		this.xAstral = 1-(xCercle+1)/2;
		this.yAstral = (yCercle+1);
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


