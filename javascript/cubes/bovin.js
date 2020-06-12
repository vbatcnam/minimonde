'use strict';
/** 
	Auteur : Véronique Lion
	Date création : 13/11/2018
	Copyright : © Véronique Lion 2018
*/

/**
	vache et taureaux : durée de vie 10 ans.
	gestation 280 jours : Elles peuvent être fécondées tous les 12 mois.
	Le veau est sevré à 6 mois il devient adulte à 2 ans
	* Production de lait : 8.500 litres par vache. Le veau boit 6 litres de lait par jour (3 * 2l).
	* S'occuper de sa vache : les vaches ont besoin de nourriture, d'eau, d'un abri et d'un espace pour se déplacer en toute liberté. Vous devez lui donner un abri aménagé pour qu'elle puisse y passer la nuit et s'y abriter pendant les intempéries.
	* En mode broutage dessin broute. Quand elle n'a plus faim, elle relève la tête

*/
class Bovin extends SCCube{
	constructor(num, x, y, z, ageEnMois, taille, poidsKg, sexe ){
		super(); //Cube
		
		//identité
		//---------
		this.espece = 'bovin';
		this.num = num;
		this.id = this.espece + "_" + this.num;
		this.sexe = sexe;
		
		//Gérer l'apparence
		//-----------------
		this.poidsEnGramme = poidsKg * 100; //grammes (naissance : 40kg, 2-3 mois : 180Kg, 6 mois: 400kg, adulte de 500kg, à 900kg)
		this.taille = taille; // (bébé 1, jeune 2, adulte 3)
		this.age = ageEnMois; //adulte 24 mois
		this.illustration = {};
		
		/**Sert à changer l'apparence par exemple : 
		 * 	{
		 * 		oldClass: sert à aller chercher l'élément contenant la classe du dessin actuel, 
		 * 		nouveau: sert à mettre la classe du nouvel élément SVG
		 * }*/
		this.changement = {oldClass:'', nouveau:''};
		
		this.createIllustrationInitiale();

		//Se nourrir
		//-----------
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

		//Gérer la géstation
		//~ this.fabriqueMalOuFemelle();// pour naissance

		//Gérer la lactation
		this.createPis();
	}

	createPis(){
		if(this.sexe == "F"){
			this.pis = 0;
		}
	}
	
	//pour la naissance d'un veau (si femelle)
	decideMalOuFemelle(){
		if(this.sexe == "M")
			return 
		let r = Calcule.getRandomInt(3);
		if(r == 2){
			return 'M';
		}else{
			return 'F';
		}
	}
	
	createIllustrationInitiale(){
		let typeAnimal = '';// veau ou adulte 
		//veau
		if(this.age<24){
			// console.log('veau');
			typeAnimal = 'veau';
		}else{//adulte
			if(this.sexe == 'M'){
				// console.log('taureau');
				typeAnimal = 'adulte';
			}else{
				// console.log('vache');
				typeAnimal = 'adulte';
			}
		}

		//construction de l'illustration
		//==============================
		let debutGroupeVache = `<g  id="${this.id}" class="vache">`;
		let finGroupeVache = "</g>";
		
		this.illustration.corps =  illustrationBovin[typeAnimal].vueProfil.corps;
		this.illustration.queue =  illustrationBovin[typeAnimal].vueProfil.queue.debout;
		this.illustration.tete = illustrationBovin[typeAnimal].vueProfil.tete.profil;
		this.illustration.patteArriereBack = illustrationBovin[typeAnimal].vueProfil.patte.patteArriereBack;
		this.illustration.patteArriereFront = illustrationBovin[typeAnimal].vueProfil.patte.patteArriereFront;
		this.illustration.patteAvantBack = illustrationBovin[typeAnimal].vueProfil.patte.patteAvantBack;
		this.illustration.patteAvantFront = illustrationBovin[typeAnimal].vueProfil.patte.patteAvantFront;
		
		//assemblage dans l'ordre d'affichage axe Z 
		this.illustration.animal = debutGroupeVache+ 
									this.illustration.patteArriereBack+
									this.illustration.patteAvantBack+
									this.illustration.queue;
		
		//on rajoute les pis si c'est une vache adulte
		if(this.sexe == "F" && this.age >=24){
			this.illustration.pis =  illustrationBovin[typeAnimal].vueProfil.pis;
			this.illustration.animal += this.illustration.pis;
		}
		
		//On ajoute le reste
		this.illustration.animal += this.illustration.corps +
									this.illustration.patteArriereFront +
									this.illustration.patteAvantFront +
									this.illustration.tete;
		
		//on ferme le groupeVache
		this.illustration.animal += finGroupeVache;

		//On enregiste la configurationactuelle (à suprimer ) : aller chercher className dans illustration
		this.teteActuelle = 'teteProfil';
	}
	
	$publicVar_monApparence(){
		return {//les infos envoyées
			repere: 'terrestre',
			espece: this.espece,
			id: this.id,
			age: this.age,
			taille: this.taille, //pour le mettre à l’échelle à l'écran
			x: this.xTerrestre, 
			y: this.yTerrestre,
			z: this.zTerrestre, 
			dessin: this.illustration.animal,
			changement: this.changement
		}
	}
	
	//Écoute les herbes autour d'elle et trouve la plus proche
	trouveHerbeProche(pArray_apparences){
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
		//~ console.log('nourritureVisee', this.nourritureVisee.id)
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
	deplacement(){
		//pas de nourriture
		if(!this.nourritureVisee){
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
		if (nbreDePas <= 0) monde.generateEvent(this.SCSENSOR('aTable'))
	}
	
	comportementInit() {return [
		SC.action(
			()=> externalEvent( monde, document.getElementById(this.id), 'click', this.SCSENSOR('click') )
		),
	]}
	
	comportementHabituel() {return [
		SC.actionIfAllEvent_(['monApparence'], this, 'trouveHerbeProche'),
		SC.kill(this.SCSENSOR('aTable'),
			SC.action_(this, 'deplacement', SC.forever),
		),
		SC.action_(this, 'baisseTete'),
		SC.kill(this.SCSENSOR('assietteVide'),
			SC.repeatForever(
				SC.kill(this.SCSENSOR('click'),
					SC.action_(this, 'nutrition', SC.forever),
					SC.seq(
						SC.action_(this, 'faisMeuh'),
						SC.waitMs(5000),
						SC.action_(this, 'neFaisPlusMeuh'),
					)
				),
			),
		),
		SC.action_(this, 'releveTete'),
	]}
	
	$_comportement() {
		return SC.seq(
			SC.waitMs(0),
			...this.comportementInit(),
			SC.repeatForever(
				...this.comportementHabituel()
			)
		)
	}
	
	/**
	Pour être digérée, l’herbe parcourt un voyage de 3 jours entre la bouche de la vache et son système gastro-intestinal. 
	* La vache mange 100 kg d'herbe par jour.
	* La vache saisit l’herbe avec sa langue et l’avale rapidement sans la mâcher.
	*  Puis elle se couche et commence à ruminer. elle boive jusqu’à 180 litres d’eau au rythme de 25 litres par minute! 
	* Au terme de ce processus de digestion, les éléments nutritifs passent dans le sang et la sécrétion du lait peut commencer dans le pis.
	* 
	 * */
	//diminue la faim et la fatigue, augmente le poids, augmente le lait pour les femelles adultes
	nutrition(){
		//manger l'herbe
		this.nourritureVisee.mangeMoi();
		if(this.nourritureVisee.getTaille() <= 0.01) {
			monde.generateEvent(this.SCSENSOR('assietteVide'))
		}
		//Pour 1 pas
		this.fatigue += 0.1; 
		this.faim += 0.1;
		this.poids -= 0.1
		this.bouse += 1;
		if(this.sexe == 'F' && this.age >= 2)
			this.pie += 1;
		if(this.age < 2)
			this.taille += 1;
	}
	
	// Pourquoi ne pas écraser simplement la variable this.illustration.tete par la nouvelle tête ?
	baisseTete(){ 
		this.changement = {oldClass:this.teteActuelle , nouveau:illustrationBovin.adulte.profil.tete.broute};
		this.teteActuelle ='teteBroute';
		//pourquoi ne pas faire simplement :
		//this.illustration.tete = illustrationBovin.adulte.profil.tete.broute;
		//il faudra voir si ma vache est de face, de profil ou de dos pour mettre la bonne tête qui broute)
	}

	releveTete(){
		this.changement = {oldClass:this.teteActuelle , nouveau:illustrationBovin.adulte.profil.tete.profil.main};
		this.teteActuelle ='teteProfil';
	}

	faisMeuh(){
		this.changement = {oldClass:this.teteActuelle , nouveau:illustrationBovin.adulte.profil.tete.profil.meuh};
		this.teteActuelle ='teteMeuh';
	}

	neFaisPlusMeuh(){
		this.changement = {oldClass:this.teteActuelle , nouveau:illustrationBovin.adulte.profil.tete.profil.broute};
		this.teteActuelle ='teteBroute';
	}

	//anime la mâchoire pour manger (A tester)
	//~ mange(){
		//~ var animer = document.querySelector(".boucheBroute");
		 //~ animer.rotate(angle:30)//voir syntaxe exacte
	
	//~ }
	
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
