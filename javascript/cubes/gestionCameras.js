'use strict';

/** S'occupe de toute la visu (2D ou 3D) 
	Créer une fausse perspective : les objets diminuent de taille lorsqu'il s’éloignent et grossissent lorsqu'ils s'approchent
**/
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
		this.CreateCiel();
		this.CreatePrairie();
		
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


	CreateCiel(){
		//dégradé du ciel
		this.fondCiel = SVG.gradiant(this.defsElement, 'gradiantCiel', 0, 0, 0, 1);
		let fondCiel_part1 = SVG.stop(gradiantCiel, 'fondCiel_part1', 0, 'stop-color:#9cf;stop-opacity:1');
		let fondCiel_part2 = SVG.stop(gradiantCiel, 'fondCiel_part2', 1, 'stop-color:#69c;stop-opacity:1');
		
		// le ciel
		let ciel = SVG.rect(
			this.svgElement, 0, 0, 
			innerWidth, hauteurCiel, 
			'url(#gradiantCiel)', '');
		ciel.setAttribute("id", "ciel");
	}
	
	CreatePrairie(){
		//dégradé de la prairie
		this.prairie = SVG.gradiant(this.defsElement, 'gradiantPrairie', 0, 0, 0, 1);
		let prairie_part1 =SVG.stop(gradiantPrairie, 'horizon_part2', 0, 'stop-color:#595;stop-opacity:1');
		let prairie_part2 = SVG.stop(gradiantPrairie, 'prairie', 1, 'stop-color:#590;stop-opacity:1');
		
		// la prairie
		let prairie = SVG.rect(
			this.svgElement, 0, hauteurCiel, 
			innerWidth, innerHeight-hauteurCiel, 
			'url(#gradiantPrairie)', '');
		prairie.setAttribute("id", "prairie");
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


