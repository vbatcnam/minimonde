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
		this.fatigue = 0; //n'est pas fatigué (100 est épuisé)
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
		}
	}
	
	//anime l'animal, augmente la fatigue et la faim, diminue le poids
	$actionForever_bouge(){}
	//anime la mâchoire, diminue la faim et la fatigue, augmente le poids
	$actionForever_mange(){}
	//diminue la fatigue, augmente la faim
	$actionForever_dort(){}
	//augmente la taille, l'age
	$actionForever_viellit(){}

}
