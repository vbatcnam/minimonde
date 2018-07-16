class Vegetal{
	constructor(num, x, y){
		this.num = num;
		this.x = x;
		this.y = y;
		this.taille = 0; //Naissance (De 0 à 5 étapes)
	}
	grandi(){
		this.taille += 1;
	}
}
