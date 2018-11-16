/** S'occupe de tout la visu (2D ou 3D) 
	Créer une fausse perspective : les objets diminuent de taille lorsqu'il s’éloignent et grossissent lorsqu'ils s'approchent
**/

class Camera2D extends SCCube{
	constructor(){
		super();
		this.svgElement = createSvgElement(
			document.getElementById('champCamera')
			, innerWidth
			, innerHeight);
		//recevra tous les defs
		this.defsElement = createBalise(this.svgElement, 'defs');

		//recevra le fond (le ciel et la prairie)
		this.arrierePlan = createBalise(this.svgElement, 'g', 'arrierePlan');
		this.drawFondArrierePlan(this.arrierePlan);
		
		//recevra les objets (animaux, vegetaux...)
		this.avantPlan = createBalise(this.svgElement, 'g', 'avantPlan');
		
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

	drawFondArrierePlan(layer_fond){
		this.CreatGradiantFond(); 
		//dessiner le fond
		let fond = createRect(
			arrierePlan, 0, 0, 
			innerWidth, innerHeight, 
			'url(#gradiantFond)', '');
	}

	CreatGradiantFond(){
		//couleur du fond
		this.gradiantFond = createGradiant(this.defsElement, 'gradiantFond', 0, 0, 0, 1);
		let ciel = createStop(gradiantFond, 'ciel', 0, 'stop-color:#9cf;stop-opacity:1');
		let horizon_part1 = createStop(gradiantFond, 'horizon_part1', 0.3, 'stop-color:#69c;stop-opacity:1');
		let horizon_part2 = createStop(gradiantFond, 'horizon_part2', 0.3, 'stop-color:#595;stop-opacity:1');
		let prairie = createStop(gradiantFond, 'prairie', 1, 'stop-color:#590;stop-opacity:1');
	}
	
	createDivInfoJeu(){
	
		//A implementer
	}
	
	//réactions
	$on_monApparence_draw(array_infosRecues){
		for( let info of array_infosRecues){
			//teste si dejà dessiné
			if(!document.body.contains(info.dessin)){
				if(info.repere == 'ecran'){
					this.arrierePlan.appendChild(info.dessin);
				}
			}

		}
	}
}


class Camera3D extends SCCube{
	constructor(){super();}
	$publicConst_dessineToiEn3D() {return null}// en cours d'écriture
}


