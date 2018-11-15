/** S'occupe de tout la visu (2D ou 3D) 
	Créer une fausse perspective : les objets diminuent de taille lorsqu'il s’éloignent et grossissent lorsqu'ils s'approchent
**/

class Camera2D extends SCCube{
	constructor(){
		super();
		this.createSvgElement();
		this.createDefElement();
		this.createLayer();
		this.createDivInfoJeu();
		this.fond = document.getElementById('arrierePlan');
		this.mettreFondArrierePlan(this.fond);
	}
	
	createSvgElement(){
		this.svgElement = newVectorElement('svg');
		this.svgElement.setAttribute("width", innerWidth);
		this.svgElement.setAttribute("height", innerHeight);
		document.getElementById('champCamera').appendChild(this.svgElement);
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
		let fond = newVectorElement('rect');
		fond.setAttribute('x',0);
		fond.setAttribute('y',0);
		fond.setAttribute('width',innerWidth);
		fond.setAttribute("height", innerHeight);
		fond.setAttribute("fill", 'url(#gradiantFond)');
	}
	
	createDefElement(){
		this.defElement = newVectorElement('defs');
		this.svgElement.appendChild(this.defElement);
	}
	
	createGradiantFond(){
		let gradiant = newVectorElement('linearGradient');
		gradiant.id = 'gradiantFond';
		this.svgElement.appendChild(gradiant);
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
}


class Camera3D extends SCCube{
	constructor(){super();}
	$publicConst_dessineToiEn3D() {return null}// en cours d'écriture
}


