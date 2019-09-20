/**
	vache et taureaux
	gestation 280 jours
	
	En mode broutage dessin broute. Quand elle n'a plus faim, elle relève la tête
*/
class Vache extends SCCube{
	constructor(num, x, y, z){
		super(); //Cube
		
		//identité
		//---------
		this.espece = 'vache';
		this.num = num;
		this.id = this.espece + "_" + this.num;
		this.fabriqueMalOuFemelle();
		//this.sexe = 'M';//pour debug
		
		//Gérer l'apparence
		//-----------------
		this.poids = 50000; //grammes (adulte F 500kg, M 900kg)
		this.taille = 85; // cm (adulte 130 cm )
		this.age = 3; 
		this.changement // Sert à changer l'apparence
		this.DessineMoi();
		 // this.illustration =  `	<g id="${this.id}" class="vache"> ${vacheFace} </g>`;
		// this.illustration =  `	<g id="${this.id}" class="vache"> ${vacheDos} </g>`;
		
		//Se nourrir
		//-------------
		this.faim = 0; //n'a pas faim (100 a très faim)
		this.eating = false; // sert à animer la mâchoire
		this.aTable = false; // n'est devant aucune nourriture
		this.nourritureVisee = null;
		this.mange; 
		
		this.bouse = 0;
		
		//Gérer l'état de veille
		//----------------------
		this.fatigue = 0; //n'est pas fatigué (100 est épuisé)
		this.sleeping = false; //est en train de dormir
		
		//Gérer les déplacements
		//---------------------
		this.xTerrestre = x; 
		this.yTerrestre = y;
		this.zTerrestre = z; 
		this.pas = 0.5; // 0.5 pixel/25 milisecondes 
	}

	fabriqueMalOuFemelle()
	{
		let r = Calcule.getRandomInt(3);
		if(r == 2){
			this.sexe = 'M';
			}else{
			this.sexe = 'F';
			this.pis = 0;
		}
	}
	
	DessineMoi(){
		if(this.sexe == 'F'){
			console.log('vache');
			this.teteActuelle = 'teteProfil';
			this.illustration =  `<g id="${this.id}" class="vache"> ${vacheCorpProfil + teteProfil} </g>`;
			}else{
				console.log('taureau');
				this.teteActuelle = 'teteProfil';
				this.illustration =  `<g id="${this.id}" class="vache"> ${taureauCorpProfil + teteProfil} </g>`;
		}
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
			age: this.age // pour réduire si c'est un jeune veau
		}
	}
	
	//Écoute les herbes autour d'elle et trouve la plus proche
	$on_monApparence(pArray_apparences){
		//console.log("J'écoute les herbes : " , this.teteActuelle);
		const herbeEtDistPlusProche
			= pArray_apparences
				.filter(herbeEnCours =>
					herbeEnCours.espece == "herbe" && herbeEnCours.taille > 0.01
				)
				.map(herbeEnCours => ({
					herbe: herbeEnCours,
					distance: Calcule.getSqDistance2D(this.xTerrestre, this.zTerrestre, herbeEnCours.x, herbeEnCours.z)
				}))
				.reduce(
					(herbeEtDistPlusProche, herbeEtDistEnCours) => 
						(herbeEtDistEnCours.distance < herbeEtDistPlusProche.distance)
						? herbeEtDistEnCours : herbeEtDistPlusProche
					,
					{herbe: null, distance: Infinity}
				)
		this.nourritureVisee = herbeEtDistPlusProche.herbe;
	}
	
	/**
		Il y a plusieurs raisons de déplacement :
		1) Si elle a faim, la vache part à la recherche de nourriture
			1-1) Si c'est un adulte, elle se dirige vers l'herbe la plus porche,
			1-2) Si c'est un jeune veau, il se dirige vers sa mère.
		2) Quand le soir tombe, la vache appelle le joueur pour être conduite à l'étable, le veau suit sa mère à la trace.
		
		Pour l'instant je n'ai programmé que le cas 1.1
	*/
	//augmente la fatigue et la faim, diminue le poids
	$actionForever_deplacement(){
		//pas de nourriture
		if(!this.nourritureVisee){
			this.aTable = false;
			return;
		}
		//calculer le nombre de pas jusqu'à la cible
		const distance = Calcule.getSqDistance2D(this.xTerrestre, this.zTerrestre, this.nourritureVisee.x, this.nourritureVisee.z);
		const nbreDePas = distance/this.pas;

		//avance d'un pas en direction de l'herbe à manger
		if(nbreDePas > 1){ //fait 1 pas
			this.xTerrestre += (this.nourritureVisee.x - this.xTerrestre)/nbreDePas;
			this.zTerrestre += (this.nourritureVisee.z - this.zTerrestre)/nbreDePas;
		}
		else if(nbreDePas <= 1 && nbreDePas > 0){// tu es presque arrivé (<1pas)
			this.xTerrestre = this.nourritureVisee.x;
			this.zTerrestre = this.nourritureVisee.z;
		}
		this.aTable = nbreDePas <= 0;
		//Pour 1 pas
		this.fatigue += 0.1; 
		this.faim += 0.1;
		this.poids -= 0.1
	}

	//diminue la faim et la fatigue, augmente le poids, augmente le lait pour les femelles adultes
	$actionForever_nutrition(){
	//On ne se nourrit que si on est à table
		if(this.aTable){
			//manger l'herbe
			this.nourritureVisee.mangeMoi();
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

