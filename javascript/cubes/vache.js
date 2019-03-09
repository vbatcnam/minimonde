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
		this.pie = 0;
		this.bouse = 0;
		this.pas = 0.5; // 0.5 pixel/25 milisecondes 
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
			if(apparence.espece == "herbe" && apparence.taille > 0.01){
				let distanceCourante = Calcule.getSqDistance2D(this.xTerrestre, this.zTerrestre, apparence.x, apparence.z);
				if(distanceCourante < distanceMinimaleActuelle){
					distanceMinimaleActuelle = distanceCourante;
					this.nourritureVisee = apparence;
				}
			}
		}
		//console.log("J'ai trouvé " + this.nourritureVisee.id + " à manger : " , this.teteActuelle);
	}
	
	//augmente la fatigue et la faim, diminue le poids
	$actionForever_deplacement(){
		//calculer le nombre de pas jusqu'à la cible
		const distance = Calcule.getSqDistance2D(this.xTerrestre, this.zTerrestre, this.nourritureVisee.x, this.nourritureVisee.z);
		const nbreDePas = Math.round(distance/this.pas);

		//avance d'un pas en direction de l'herbe à manger
		if(nbreDePas > 0){ 
			this.xTerrestre += (this.nourritureVisee.x - this.xTerrestre)/nbreDePas;
			this.zTerrestre += (this.nourritureVisee.z- this.zTerrestre)/nbreDePas;
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
		if(this.aTable){
			//manger l'herbe
			this.nourritureVisee.mangeMoi();
			//console.log("Je broute" , this.teteActuelle);
			this.faim -= 1;
			this.taille += 1;
			this.bouse += 1;
			this.pie += 1;
		};
	}
	
	//amélioration future ??
	// appetissante(nourriture){
		// return this.nourritureVisee.taille > 0.5;
	// }
	
	$actionForever_mouvementTete(){
		if(this.aTable && this.teteActuelle!='teteBroute'){
			this.changement = {oldClass:this.teteActuelle , nouveau:teteBroute};
			this.teteActuelle ='teteBroute';
			
			// var animer = document.getElementById("boucheBroute");
		}else if(!this.aTable && this.teteActuelle=='teteBroute'){
			this.changement = {oldClass:this.teteActuelle , nouveau:teteProfil};
			this.teteActuelle ='teteProfil';
		}else{
			this.changement = undefined;
		}
		//anime la mâchoire, son meuh
		// $actionForever_meugle(){
			// this.illustration = `<g id="${this.id}" class="vache"> ${vacheCorpProfil + teteMeuh} </g>`;
			// var animer = document.getElementById("boucheMeuh");
		// }
	}

	// produit(){
		// this.lait -= 1;
	// }
	
	// elimine(){
		// this.bouse -= 1;
	// }
	// produit(quoi){
		// this[quoi] -= 1;
	// }

}

