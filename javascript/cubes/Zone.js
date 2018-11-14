/**
	Ce sont des zones physiques indépendament de la camera :
		Le ciel
		La prairie
		...
**/

class Zone extends SCCube{
	constructor(nom, w, h){
		super();
		this.nom = nom;
		this.w = w;
		this.h = h;
	}
	
	$on_dessineToiEnLayer0_draw(){}

}
