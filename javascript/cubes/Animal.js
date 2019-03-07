class Animal extends SCCube{
	constructor(espece, num, sexe, x, y, z){
		super();
		this.espece = espece;
		this.num = num;
		this.id = this.espece + "_" + this.num;
		this.xTerrestre = x; 
		this.yTerrestre = y;
		this.zTerrestre = z; 
		this.sexe = sexe; 
		this.age = 0; 
		this.faim = 0; //n'a pas faim (100 a très faim)
		this.mange = false;
		this.fatigue = 0; //n'est pas fatigué (100 est épuisé)
		this.dort = false;
	}
	
	// les animaux volants se déplacent dans la zone de jeu, les non volants dans la zone prairie
	$publicVar_monApparence(){
		return {//les infos envoyées
			repere:'terrestre',
			id:this.id,
			x:this.xTerrestre,
			y:this.yTerrestre,
			z:this.zTerrestre,
			dessin:this.illustration,
			changement : this.changement
		}
	}
	
	//diminue la fatigue, augmente la faim
	$actionForever_dort(){}
	//augmente la taille, l'age
	$actionForever_viellit(){}

}
