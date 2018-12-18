'use strict';

/** S'occupe de toute la visu (2D ou 3D) 
	Créer une fausse perspective : les objets diminuent de taille lorsqu'il s’éloignent et grossissent lorsqu'ils s'approchent
	
	z des differents elements :
	============================
	Le ciel -100,
	le soleil -80, 
	la lune -60, 
	les nuages de -40 à -20, 
	la prairie 0,
	les objets et animaux volants de 1 à 100,
	les objets sur la prairie de 1 à 100,
*/

const hauteurCiel = innerHeight * 0.3;

class Camera2D extends SCCube{
	constructor(){
		super();
		this.svgElement = SVG.svgElement(
			document.getElementById('champCamera')
			, innerWidth
			, innerHeight);
		//recevra tous les defs
		this.defsElement = SVG.balise(this.svgElement, 'defs');
		
		//affichage du ciel et de la prairie
		
		/**
		"infoJeu" recevra des messages au joueur 
			vous avez gagné, 
			attention vos vaches sont malheureuses,
			la boite à outil du joueur, 
			menu 
			....
	*/
		this.infoJeu = 'div' //div ou autre à créer
		
		
	}

	
	createDivInfoJeu(){
		//A implementer
	}
	
	//réactions
	$on_monApparence_draw(array_infosRecues){
		for( let info of array_infosRecues){
			let elementDessin = document.getElementById(info.id);
			let positionSurEcran = this.traduitPositionPourEcran(info.x, info.y);
			//Si pas encore dessiné
			if(!elementDessin) {
				if(info.repere == 'ecran'){ //info.x et info.y vont de 0 à 1
					elementDessin = SVG.innerSVG(this.svgElement, info.dessin);
				}
			}
			//if provisoire car tout ce qui ont envoyé "monApparence" n'est pas encore dessiné : Du coup ça bug "elementDessin is undefined"
			if(elementDessin){
				elementDessin.setAttribute('transform', `translate(${positionSurEcran.x},${positionSurEcran.y})`);
			}
		}
	}
	
	traduitPositionPourEcran(x, y){
		const xEcran = x * innerWidth;
		const yEcran = y * hauteurCiel ;
		return {x: xEcran, y: yEcran};
	}
	
}

class Camera3D extends SCCube{
	constructor(){super();}
	$publicConst_dessineToiEn3D() {return null}// en cours d'écriture
}


