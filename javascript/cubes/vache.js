/**
	vache et taureaux
	gestation 280 jours
	
	En mode broutage dessin broute. Qunand elle a plus faim elle releve la tête
*/
class Vache extends Animal{
	constructor(num, x, y, z){
		super('vache', num, 'F', x, y, z);
		this.poids = 50000; //grammes (adulte F 500kg, M 900kg)
		this.taille = 85; // cm (adulte 130 cm )
		this.lait = 0;
		this.bouse = 0;
		this.illustration =  `	<g id="vache"> ${vacheCorpProfil + teteBroute} </g>`;
	}

	//anime la mâchoire, diminue la faim et la fatigue, augmente le poids
	$actionForever_broute(){
		this.faim -= 1;
		this.taille += 1;
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

