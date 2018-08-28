class Zone{
	constructor(nom, w, h){
		this.nom = nom;
		this.w = w;
		this.h = h;
	}
	
	fabriqueSurface(wMaxImage, hMaxImage){
		var nbreLignes = this.h/hMaxImage;
		var nbreColonnes = this.w/wMaxImage;
		this.surface = [nbreLignes][nColonnes];
	}
}
