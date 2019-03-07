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
		this.pas = 0.5; // 0.5 pixel/25 milisecondes 
		this.nbreDePas = 0;
		this.destination = {};
		this.illustration =  `<g id="${this.id}" class="vache"> ${vacheCorpProfil + teteProfil} </g>`;
		 // this.illustration =  `	<g id="${this.id}" class="vache"> ${vacheFace} </g>`;
		// this.illustration =  `	<g id="${this.id}" class="vache"> ${vacheDos} </g>`;
	}

	//objet{idTete}
	//Écoute les herbes autour d'elle et trouve la plus proche
	$on_monApparence(pArray_apparences){
		let distanceMinimaleActuelle = Infinity;
		for(let apparence of pArray_apparences){
			if(apparence.espece == "herbe"){
				let distanceCourante = Calcule.getSqDistance2D(this.xTerrestre, this.zTerrestre, apparence.x, apparence.z);
				if(distanceCourante < distanceMinimaleActuelle){
					distanceMinimaleActuelle = distanceCourante;
					this.destination.x = apparence.x; this.destination.z = apparence.z;
				}
			}
		}
		this.setNbreDePas();
	}
	
	setNbreDePas(){
		let distance = Calcule.getSqDistance2D(this.xTerrestre, this.zTerrestre, this.destination.x, this.destination.z);
		this.nbreDePas = Math.round(distance/this.pas);

	}
	
	//anime l'animal, augmente la fatigue et la faim, diminue le poids
	$actionForever_bouge(){
		this.changement = undefined;
		//avance d'un pas en direction de l'herbe à manger
		if(this.nbreDePas > 0){
			this.xTerrestre += (this.destination.x - this.xTerrestre)/this.nbreDePas;
			this.zTerrestre += (this.destination.z- this.zTerrestre)/this.nbreDePas;
		}else{
			if(!this.mange){
				this.broute();
			}
		}
	}

	//anime la mâchoire, diminue la faim et la fatigue, augmente le poids
	broute(){
		this.mange = true;
		//si vache de profil
		// this.illustration = `<g id="${this.id}" class="vache"> ${vacheCorpProfil + teteBroute} </g>`;
		this.changement = { oldClass:"teteProfil" , nouveau:teteBroute};
		// var animer = document.getElementById("boucheBroute");
		
		//si vache de face
		//this.illustration =  `	<g id="${this.id}" class="vache"> ${vacheFace} </g>`;
		//var translater = document.getElementById("tete");
		this.faim -= 1;
		this.taille += 1;
		this.bouse += 1;
		this.lait += 1;
}

	//anime la mâchoire, son meuh
	// $actionForever_meugle(){
		// this.illustration = `<g id="${this.id}" class="vache"> ${vacheCorpProfil + teteMeuh} </g>`;
		// var animer = document.getElementById("boucheMeuh");
	// }

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

