/**
	vache et taureaux
	gestation 280 jours
*/
class Vache extends Animal{
	constructor(num, x, y, z){
		super('vache', num, 'F', x, y, z);
		this.poids = 50000; //grammes (adulte F 500kg, M 900kg)
		this.taille = 85; // cm (adulte 130 cm )
		this.lait = 0;
		this.bouse = 0;
		this.illustration =  vacheProfil;
	}

	mange(calorie){
		this.faim -= calorie;
		this.age += 1;
		this.bouse += 1;
		this.lait += 1;
	}

	// produit(){
		// this.lait -= 1;
	// }
	
	// elimine(){
		// this.bouse -= 1;
	// }
	produit(quoi){
		this[quoi] -= 1;
	}

}

