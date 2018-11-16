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
		this.defsElement = createBalise(this.svgElement, 'defs', '');
		this.createLayer();
		this.createDivInfoJeu();
		this.fond = document.getElementById('arrierePlan');
		this.mettreFondArrierePlan(this.fond);
	}
	
	
	createLayer(){
		let listeLayers = ['arrierePlan', 'avantPlan'];
	/**
		"arrierePlan" recevra le fond (le ciel et la prairie),
		"avantPlan" recevra les objets (animaux, vegetaux...),
	*/
		for (var i = 0; i<listeLayers.length ; i++){
			this[listeLayers[i]] = newVectorElement('g');
			this[listeLayers[i]].id = listeLayers[i];//pour débogage
			this.svgElement.appendChild(this[listeLayers[i]]);
		}
	}

	mettreFondArrierePlan(layer_fond){
		this.createGradiantFond();
		let fond = newVectorElement('rect');
		fond.setAttribute('x',0);
		fond.setAttribute('y',0);
		fond.setAttribute('width',innerWidth);
		fond.setAttribute("height", innerHeight);
		fond.setAttribute("fill", 'url(#gradiantFond)');
		this.arrierePlan.appendChild(fond)
	}
	
	createGradiantFond(){
		let gradiant = newVectorElement('linearGradient');
		gradiant.id = 'gradiantFond';
		gradiant.setAttribute('gradientUnits',"objectBoundingBox");
		gradiant.setAttribute('x1',0);
		gradiant.setAttribute('x2',0);
		gradiant.setAttribute('y1',0);
		gradiant.setAttribute('y2',1);
		this.defElement.appendChild(gradiant);
		
		let ciel = newVectorElement('stop');
		ciel.id = 'ciel';
		ciel.setAttribute('offset',0);
		// ciel.setAttribute('style','stop-color:#55cfff;stop-opacity:1');
		ciel.setAttribute('style','stop-color:#9cf;stop-opacity:1');
		gradiant.appendChild(ciel);
		
		let horizon = newVectorElement('stop');
		horizon.id = 'horizon';
		horizon.setAttribute('offset',0.3);
		// horizon.setAttribute('style','stop-color:#1d7d17;stop-opacity:1');
		horizon.setAttribute('style','stop-color:#69c;stop-opacity:1');
		gradiant.appendChild(horizon);
		
		let horizon2 = newVectorElement('stop');
		horizon2.id = 'horizon';
		horizon2.setAttribute('offset',0.3);
		// horizon2.setAttribute('style','stop-color:#1d7d17;stop-opacity:1');
		horizon2.setAttribute('style','stop-color:#595;stop-opacity:1');
		gradiant.appendChild(horizon2);
		
		
		let prairie = newVectorElement('stop');
		prairie.id = 'prairie';
		prairie.setAttribute('offset',1);
		// prairie.setAttribute('style','stop-color:#359500;stop-opacity:1');
		prairie.setAttribute('style','stop-color:#590;stop-opacity:1');
		gradiant.appendChild(prairie);
	}
	
	createDivInfoJeu(){
	/**
		"infoJeu" recevra des messages au joueur 
			vous avez gagné, 
			attention vos vaches sont malheureuses,
			la boite à outil du joueur, 
			menu 
			....
	*/
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


