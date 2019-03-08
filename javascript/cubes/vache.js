/**
	vache et taureaux
	gestation 280 jours
	
	En mode broutage dessin broute. Qunand elle a plus faim elle releve la tête
*/
class Vache extends SCCube{
	constructor(num, x, y, z){
		super();
		this.espece = 'vache';
		this.num = num;
		this.id = this.espece + "_" + this.num;
		this.teteActuelle = 'teteProfil';
		this.illustration =  `<g id="${this.id}" class="vache"> ${vacheCorpProfil + teteProfil} </g>`;
		 // this.illustration =  `	<g id="${this.id}" class="vache"> ${vacheFace} </g>`;
		// this.illustration =  `	<g id="${this.id}" class="vache"> ${vacheDos} </g>`;
		this.xTerrestre = x; 
		this.yTerrestre = y;
		this.zTerrestre = z; 
		this.poids = 50000; //grammes (adulte F 500kg, M 900kg)
		this.taille = 85; // cm (adulte 130 cm )
		this.age = 0; 
		this.faim = 0; //n'a pas faim (100 a très faim)
		this.eating = false;
		this.nourritureVisee = {};
		this.fatigue = 0; //n'est pas fatigué (100 est épuisé)
		this.dort = false;
		this.lait = 0;
		this.bouse = 0;
		this.pas = 0.5; // 0.5 pixel/25 milisecondes 
		this.destination = {};
	}

	$publicVar_monApparence(){
		return {//les infos envoyées
			repere:'terrestre',
			id:this.id,
			x:this.xTerrestre,
			y:this.yTerrestre,
			z:this.zTerrestre,
			dessin:this.illustration,
			changement : this.changement,
			mange: this.mange
		}
	}
	
	//Écoute les herbes autour d'elle et trouve la plus proche
	$on_monApparence(pArray_apparences){
		//console.log("J'écoute les herbes : " , this.teteActuelle);
		
		let distanceMinimaleActuelle = Infinity;
		for(let apparence of pArray_apparences){
			if(apparence.espece == "herbe" && this.nourritureVisee.taille > 0.01){
				let distanceCourante = Calcule.getSqDistance2D(this.xTerrestre, this.zTerrestre, apparence.x, apparence.z);
				if(distanceCourante < distanceMinimaleActuelle){
					distanceMinimaleActuelle = distanceCourante;
					this.destination.x = apparence.x; this.destination.z = apparence.z;
					this.nourritureVisee = apparence;
				}
			}
		}
		//console.log("J'ai trouvé " + this.nourritureVisee.id + " à manger : " , this.teteActuelle);
	}
	
	//augmente la fatigue et la faim, diminue le poids
	$actionForever_deplacement(){
		//calculer le nombre de pas jusqu'à la cible
		const distance = Calcule.getSqDistance2D(this.xTerrestre, this.zTerrestre, this.destination.x, this.destination.z);
		const nbreDePas = Math.round(distance/this.pas);

		//avance d'un pas en direction de l'herbe à manger
		if(nbreDePas > 0){ 
			this.xTerrestre += (this.destination.x - this.xTerrestre)/nbreDePas;
			this.zTerrestre += (this.destination.z- this.zTerrestre)/nbreDePas;
			//console.log("J'avance d'un pas vers l'herbe à manger : " , this.teteActuelle);

		}else{
			// console.log("===================================")
			// console.log("Je suis sur l'herbe à manger : " , this.teteActuelle);
		}
		this.aTable = nbreDePas <= 0;
	}

	//anime la mâchoire, diminue la faim et la fatigue, augmente le poids
	$actionForever_nutrition(){
	//On ne se nourrit que si on est à table
		if(!this.aTable){return};
		
		//y-a-t-il encore quelque chose à manger ?
		// console.log("L'herbe  ",this.nourritureVisee.id);
		// console.log("L'herbe est mangeable ? ",this.nourritureVisee.mangeable);
		// console.log("ais-je commencé à manger ? " , this.eating);
		if(){
			this.eating = true;
			
			//manger l'herbe
			this.nourritureVisee.mangeMoi();
			//console.log("Je broute" , this.teteActuelle);

		}else{
			//fini de brouter l'herbe en cours
			this.eating = false;
		}
		
		// var animer = document.getElementById("boucheBroute");
		
		//si vache de face
		//this.illustration =  `	<g id="${this.id}" class="vache"> ${vacheFace} </g>`;
		//var translater = document.getElementById("tete");
		this.faim -= 1;
		this.taille += 1;
		this.bouse += 1;
		this.lait += 1;
		
	}
	
	appetissante(nourriture){
		return this.nourritureVisee.taille > 0.5;
	}
	
	$actionForever_mouvementTete(){
		if(!this.eating && this.teteActuelle != "teteProfil"){
			consol("++++++++++++++++++++++++ ");
			console.log("Je dois changer de tête ! ");
			this.changement = {oldClass:this.teteActuelle , nouveau:teteProfil};
			this.teteActuelle ='teteProfil';
		}
		//vérifie si la tête actuelle est celle par défaut (teteProfil)
		console.log("Tête actuelle" , this.teteActuelle);
		if(this.teteActuelle == "teteProfil"){
			this.changement = undefined;
		}else{
			// this.changement = {oldClass:this.teteActuelle, nouveau:teteProfil};
			// this.teteActuelle = "teteProfil";
		}
			//Dois-je changer de tête ?
			if(this.teteActuelle == "teteProfil"){
				console.log("Je commence à manger")
				this.changement = {oldClass:'teteProfil', nouveau:teteBroute};
				this.teteActuelle = "teteBroute";
			}else{
				console.log("Je suis en plein repas ! ");
				this.changement = undefined; //aucun changement de tête
			}
			if(!this.eating){
				console.log("j'ai fini de manger !");
				if(this.teteActuelle == "teteBroute"){
					console.log("je doit changer : teteProfil");
					this.changement = {oldClass:'teteBroute', nouveau:teteProfil};
					this.teteActuelle = "teteProfil";
				}
			}
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

