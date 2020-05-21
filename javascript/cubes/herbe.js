'use strict';

/**
	Cycle de l'herbe :
		elle pousse (grandit)
		elle est mangée (disparaît)
		elle repousse
		....
	IL faudra positionner l'herbe de manière aléatoire à un endroit libre de la prairie
*/
class Herbe extends SCCube{
	constructor(num, x, z){
		super();
		this.espece = "herbe";
		this.num = num;
		this.id = this.espece + "_" + this.num;
		this.xTerrestre = x; 
		this.yTerrestre = 0; // sur le sol
		this.zTerrestre = z; 
		this.taille = 1;
		this.illustration =   `
			<g  id="${this.id}" class="herbe">
				<path d="m-22.449-2.6183c6.0894-1.7358 18.029 2.1712 20.596 12.48 1.0905-19.595 8.9621-25.438 16.049-29.862-9.5423 8.4806-14.435 15.466-13.13 32.733 4.3806-9.7003 13.16-13.146 21.381-8.3818-12.189-3.6791-19.24 8.1239-20.708 15.649h-3.4832c-0.7684-6.8486-1.4953-19.734-20.703-22.619z" style="fill:#003a00;stroke-width:1.7496"/>
				<path d="m22.449-2.6183c-6.0895-1.7358-18.029 2.1712-20.596 12.48-1.0905-19.595-8.9621-25.438-16.049-29.862 9.5423 8.4806 14.435 15.466 13.13 32.733-4.3806-9.7003-13.16-13.146-21.381-8.3818 12.189-3.6791 19.24 8.1239 20.708 15.649h3.4832c1.943-6.8107 1.4953-19.734 20.703-22.619z" style="fill:#009d00;stroke-width:1.7496"/>
			</g>`
	}

	/** "repere" sert à savoir comment sera transformé le faux 3D en 2D 
			"ecran" est pour le ciel : quand z change l'objet ne bouge pas sur l’écran (il se trouve devant ou derrière un autre objet)
			"reel" est pour la prairie si z est plus grand il sera descendu par rapport à l'écran
		*/
	//$publicVar génère un événement 
	$publicVar_monApparence(){
		return {//les infos envoyées
			repere:'terrestre',
			id:this.id,
			espece:this.espece,
			x:this.xTerrestre,
			y:this.yTerrestre,
			z:this.zTerrestre,
			dessin:this.illustration,
			taille:this.taille,
			getTaille:this.getTaille.bind(this),
			mangeMoi: this.mangeMoi.bind(this)
		}
	}
	
	// pousse(){
		// if(this.taille < 1)
			// this.taille += 0.01;
	// }
	
	getTaille(){
		return this.taille
	}
	
	mangeMoi(){
		this.taille -= 0.05;
	}
}


