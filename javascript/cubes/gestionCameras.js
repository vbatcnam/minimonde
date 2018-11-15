/** S'occupe de tout la visu (2D ou 3D) 
	Créer une fausse perspective : les objets diminuent de taille lorsqu'il s’éloignent et grossissent lorsqu'ils s'approchent
**/

class Camera2D extends SCCube{
	constructor(){
		super();
		this.createSvgElement();
		this.createLayer();
		this.createDivInfoJeu();
		this.fond = document.getElementById('arrierePlan');
		this.mettreFondArrierePlan(this.fond);
	}
	
	createSvgElement(){
		this.svgElement = newVectorElement('svg');
		this.svgElement.id = 'svgPrincipal';
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
			let layer = newVectorElement('g');
			layer.id = listeLayers[i];
			this.svgElement.appendChild(layer);
		}
	}

	mettreFondArrierePlan(layer_fond){
		let fond = newVectorElement('rect');
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


