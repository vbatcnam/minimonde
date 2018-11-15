/** S'occupe de tout la visu (2D ou 3D) **/

class Camera2D extends SCCube{
	constructor(){
		super();
		this.createSvgElement();
		document.getElementById('champCamera').appendChild(this.svgElement);
		this.tab_layers = [];
		this.remplirTabDeLayers();
	}
	
	createSvgElement(){
		this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		this.svgElement.id = 'svgPrincipal';
		this.svgElement.setAttribute("width", innerWidth);
		this.svgElement.setAttribute("height", innerHeight);

	}
	
	remplirTabDeLayers(){
		for (var i = 0; i<5; i++){
			this.tab_layers[i] = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			this.tab_layers[i].id = 'layer_'+i;
			this.svgElement.appendChild(this.tab_layers[i]);
		}
	}
	
	//Le fond
	$publicConst_dessineToiEnLayer0() {return null}// en cours d'écriture
	//Les herbes
	$publicConst_dessineToiEnLayer1() {return null}// en cours d'écriture
	//Les crottes
	$publicConst_dessineToiEnLayer2() {return null}// en cours d'écriture
	//Les vaches
	$publicConst_dessineToiEnLayer3() {return null}// en cours d'écriture
	//Les abeilles
	$publicConst_dessineToiEnLayer4() {return null}// en cours d'écriture
}

class Camera3D extends SCCube{
	constructor(){super();}
	$publicConst_dessineToiEn3D() {return null}// en cours d'écriture
}


