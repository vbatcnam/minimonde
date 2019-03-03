class Animal extends SCCube{
	constructor(espece, num, x, y, z){
		super();
		this.espece = espece;
		this.num = num;
		this.id = this.espece + "_" + this.num;
		this.xTerrestre = x; 
		this.yTerrestre = y;
		this.zTerrestre = z; 
		this.age = 0; 
		this.faim = 0; //n'a pas faim (100 a très faim)
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
}
