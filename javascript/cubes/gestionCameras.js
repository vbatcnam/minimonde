/** S'occupe de tout la visu (2D ou 3D) **/

class Camera2D extends SCCube{
	constructor(){
		super();
		this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		this.svgElement.id = 'svgPrincipal';
		this.svgElement.setAttribute("width", innerWidth);
		this.svgElement.setAttribute("height", innerHeight);
		document.getElementById('champCamera').appendChild(this.svgElement);
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


