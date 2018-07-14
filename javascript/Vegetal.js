class Vegetal{
	constructor(num){
		this.num = num;
		this.taille = 0; //Naissance (De 0 à 5 étapes)
		this.alive = true;
		this.killMe = SC.evt("kill");
	}
	grandi(){
		this.taille += 1;
	}
}
