class Vache extends Animal{
	constructor(){
		super();
		this.lait = 0;
		this.bouse = 0;
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

//test
new Vache().draw(10,10, "prairie", "face");