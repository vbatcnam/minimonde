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
	constructor(x, y, z, ageEnMois, taille, poidsKg, sexe ){
		super(); //Cube
		
		//identité
		//---------
		this.espece = 'bovin';
		this.sexe = sexe;
		//création du numero
		this.constructor.total = this.constructor.total || 0
		this.constructor.total += 1
		this.num = this.constructor.total

		//création de l'id
		this.id = this.espece + "_" + this.num;
		
		//Gérer l'apparence
		//-----------------
		this.poidsEnGramme = poidsKg * 1000; //grammes (naissance : 40kg, 2-3 mois : 180Kg, 6 mois: 400kg, adulte de 500kg, à 900kg)
		this.taille = taille; // (bébé 1, jeune 2, adulte 3)
		this.age = ageEnMois; //adulte 24 mois
		this.illustration = {};
		this.createIllustration("vueProfil");
		//~ this.createIllustration("vueFace");
		//~ this.createIllustration("vueDos");//
		//~ this.createIllustration("vueTroisQuart");

		//Se nourrir
		//-----------
		this.faim = 0; //n'a pas faim (100 a très faim)
		this.eating = false; // sert à animer la mâchoire
		this.aTable = false; // n'est devant aucune nourriture
		this.nourritureVisee = null;
		this.mange; 
		
		this.jaugeDechets = 0;// quand elle est pleine, le bovin fait une bouse

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
			this.jaugePis = 0;//quand elle est pleine, la vache fait meuh. 
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
	
	createIllustration(vue){
		this.vueActuelle = vue;
		if(this.age<24){
			// console.log('veau');
			this.typeAnimal = 'veau';
		}else{//adulte
			if(this.sexe == 'M'){
				// console.log('taureau');
				this.typeAnimal = 'taureau';
			}else{
				// console.log('vache');
				this.typeAnimal = 'vache';
			}
		}

		//construction de l'illustration
		//==============================
		let debutGroupeVache = `<g  id="${this.id}" class="vache">`;
		let finGroupeVache = "</g>";
		
		//parties communes aux bovins:
		this.illustration.corps =  illustrationBovin[vue].corps;
		this.illustration.queue =  illustrationBovin[vue].queue; // de dos la mettre en dernier
		this.illustration.tete = illustrationBovin[vue].tete.leveTete(this.typeAnimal);//en premier si de dos
		//~ console.log(this.illustration.tete);
		
		//On rassemble les pattes back et front par rapport à l'écran.
		this.illustration.pattesFront = illustrationBovin[vue].pattes.pattesFront;
		this.illustration.pattesBack =  illustrationBovin[vue].pattes.pattesBack;
		
		//pré-assemblage dans l'ordre d'affichage axe Z 
		//===============================================
		//On définit ce qui va à l'arrière plan et ce qui vient à l'avant plan
		let inBack, inFront;
		if(vue=="vueDos"){
			inBack= this.illustration.tete;
			inFront= this.illustration.queue;
		}else{
			inBack= this.illustration.queue;
			inFront= this.illustration.tete;
		}
		//On assemble le tout
		this.illustration.animal = debutGroupeVache 
			+ inBack
			+ this.illustration.pattesBack;
		
		//on rajoute les pis si c'est une vache adulte
		if(this.typeAnimal=="vache"){
			this.illustration.pis =  illustrationBovin[vue].pis;
			this.illustration.animal += this.illustration.pis;
		}
		
		//On ajoute le reste
			this.illustration.animal += this.illustration.pattesFront
				+ this.illustration.corps
				+ inFront;

		//on ferme le groupeVache
		this.illustration.animal += finGroupeVache;
		//~ console.log(this.illustration.animal)

		//On enregiste la configurationactuelle
		this.teteActuelle = 'leveTete';
	}
	
	//construction
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
		this.jaugeBouse += 1;
		if(this.sexe == 'F' && this.age >= 2)
			this.jaugePie += 1;
		if(this.age < 2)
			this.taille += 1;
	}
	
	/**this.changements sert à changer l'apparence par exemple : 
	 * 		this.changements.oldClass: sert à aller chercher l'élément contenant la classe du dessin actuel, 
	 * 		this.changements.nouveau: sert à mettre la classe du nouvel élément SVG
	 */
	baisseTete(){ 
		this.changement = {oldClass:this.teteActuelle , nouveau:illustrationBovin[this.vueActuelle].tete.broute(this.typeAnimal)};
		//~ console.log("changement : ", this.changement);
		//~ console.log("tete : ", this.teteActuelle);
		this.teteActuelle ='teteBroute';
	}

	releveTete(){
		this.changement = {oldClass:this.teteActuelle , nouveau:illustrationBovin[this.vueActuelle].tete.leveTete(this.typeAnimal)};
		this.teteActuelle ='leveTete';
	}

	faisMeuh(){
		this.changement = {oldClass:this.teteActuelle , nouveau:illustrationBovin[this.vueActuelle].tete.meuh(this.typeAnimal)};
		this.teteActuelle ='teteMeuh';
	}

	neFaisPlusMeuh(){
		this.changement = {oldClass:this.teteActuelle , nouveau:illustrationBovin[this.vueActuelle].tete.broute(this.typeAnimal)};
		this.teteActuelle ='teteBroute';
	}

	//anime la mâchoire pour manger (A tester)
	//~ mange(){
		//~ var animer = document.querySelector(".boucheBroute");
		 //~ animer.rotate(angle:30)//voir syntaxe exacte
	
	//~ }
	
	// traireManuelement(){
		// this.jaugePis -= 1;
	// }
	
	// elimine(){
		// this.jaugeBouse =0;
	// }


}

