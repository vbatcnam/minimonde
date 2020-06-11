'use strict';

/** S'occupe de toute la visu (2D ou 3D) 
	Créer une fausse perspective : les objets diminuent de taille lorsqu'il s’éloignent et grossissent lorsqu'ils s'approchent
	
	z des différents éléments :
	============================
	Le ciel -100,
	le soleil -80, 
	la lune -60, 
	les nuages de -40 à -20, 
	la prairie 0,
	les objets et animaux volants de 1 à 100,
	les objets sur la prairie de 1 à 100,
*/

var scaleObjetsDeLaScene = {
	ciel: {width: innerWidth, height: innerHeight * 0.3},
	soleil:{width: 0.5, height: 0.5},
	prairie: {width: innerWidth, height: innerHeight - (innerHeight * 0.3)},
	herbe:{width: 2, height: 2},
	// fleur{width: 0.5, height: 0.5},//herbe adulte
	vache: {width: 1.5, height: 1.5},//vache adulte
	// bouse:{width: 0.5, height: 0.5},
	// ours:{width: 0.5, height: 0.5},
	// abeille:{width: 0.5, height: 0.5},
	// lait:{width: 0.5, height: 0.5},
	// miel:{width: 0.5, height: 0.5}
};


class Camera extends SCCube{
	constructor(){
		super();
		this.svgElement = SVG.svgElement(
			document.getElementById('champCamera')
			, innerWidth
			, innerHeight);
		//recevra tous les defs
		this.defsElement = SVG.balise(this.svgElement, 'defs');
		this.largeur = innerWidth;
		this.hauteur = innerHeight;
		/**
		"infoJeu" recevra des messages au joueur 
			vous avez gagné, 
			attention vos vaches sont malheureuses,
			la boite à outil du joueur, 
			menu 
			....
	*/
		this.infoJeu = 'div' //div ou autre à créer
	}

	
	createDivInfoJeu(){
		//A implementer
	}
	
	
	//réactions
	$on_monApparence_draw(array_infosRecues){
		//trier le tableau par z
		array_infosRecues.sort(function(a,b){
			if(a.repere < b.repere) return -1;
			else if(a.repere > b.repere) return 1;
			else return b.z - a.z;
		});
		// console.log("infosRecues");
		// console.log(array_infosRecues);
		for( let info of array_infosRecues){
			let elementDessin = document.getElementById(info.id);
			const positionSurEcran = this.traduitPositionPourEcran(info.repere,info.x, info.y, info.z);
			//Si pas encore dessiné
			if(!elementDessin){
				elementDessin = SVG.innerSVG(this.svgElement, info.dessin);
				if(info.repere == 'astral'){ //info.x et info.y vont de 0 à 1
					//coloriage
					if(info.coloriage.listeStop){//recherche de gradients
						elementDessin.setAttribute('fill','url(#'+info.coloriage.id +')');
						//création du gradiant
						this.createGradiant(info.coloriage);
					}else{
						elementDessin.setAttribute('fill',info.coloriage.fill);
					}
				}
			}
			//if provisoire car tout ce qui ont envoyé "monApparence" n'est pas encore dessiné : Du coup ça bug "elementDessin is undefined"
			if(elementDessin){
				//On redimensionne le dessin
				console.log( elementDessin.getAttribute('class'));
				let scale = (scaleObjetsDeLaScene[elementDessin.id]) 
					? scaleObjetsDeLaScene[elementDessin.id].width 
					: scaleObjetsDeLaScene[elementDessin.getAttribute('class')].width ;
				if(info.taille){
					scale *= info.taille;
					// console.log( 'scale : ' + scale);
					// console.log( 'espece : ' + info.espece);
					// console.log( 'taille : ' + info.taille);
				}
				if(info.repere == 'terrestre')
					scale /= info.z;
				//On le positionne sur l'écran
				if(info.changement){
					const oldElt = elementDessin.getElementsByClassName(info.changement.oldClass)[0];
					const nouveauElt = SVG.createSvgElt(info.changement.nouveau);
					//console.log('$$oldElt : ', oldElt, info.changement.oldClass);
					if(oldElt && nouveauElt) {
						elementDessin.replaceChild(nouveauElt, oldElt);
					}
				}
				elementDessin.setAttribute(
					'transform', 
					`translate(${positionSurEcran.x},${positionSurEcran.y})` +
					` scale(${scale})`
				);
				this.svgElement.removeChild(elementDessin);
				this.svgElement.appendChild(elementDessin);
			}
		}
	}
	
	createGradiant(obj_coloriage){
		//dégradé du ciel
		let gradiant = SVG.gradiant(this.defsElement, 
									obj_coloriage.id, 
									obj_coloriage.x1, 
									obj_coloriage.x2, 
									obj_coloriage.y1, 
									obj_coloriage.y2);
		for(var stop of obj_coloriage.listeStop){
			SVG.stop(gradiant,
						stop.id, 
						stop.offset,
						stop.style);
		}
	}
	
	traduitPositionPourEcran(repere, x, y, z){
		let xEcran, yEcran;
		if(repere=="astral"){
			xEcran = x * this.largeur;
			yEcran = y * scaleObjetsDeLaScene.ciel.height;
		} else if(repere=="terrestre"){
			/*
				Une vitre infinie se trouve en z=1 (entre la caméra et le paysage)
				On va calculer sur cette vitre où l'objet est vu.
				les coordonnées seront xVitre et yVitre
			*/
			//Pour info : zVitre vaut 1
			const xVitre = x/z;
			const yVitre = (y-1)/z+1 ;
			
			//On met tout ça en coordonnée écran
			/*
				On doit délimiter une portion de la vitre infinie en haut et en bas en fonction de la hauteur de l'écran
				Le y=1 de la vitre = 0.7 de hauteur de l'écran (horizon)
				Il reste 0.3 de hauteur de l'écran
					On coupe la vitre en bas en y=O 
					On coupe la vitre en haut en y = 10/7.
				Il faudra adapter cette portion de vitre à notre écran.
				Il faudra faire correspondre la hauteur du viewport à 10/7
			*/
			const hauteurPortionVitre = 10/7;
			
			//On doit délimiter la vitre sur les côtés en fonction de la largeur de l'écran.
			const largeurPortionVitre = this.largeur * hauteurPortionVitre / this.hauteur;
			/*
				On coupe la vitre :
					à gauche en 
						x = -1/2*largeurPortionVitre
					à droite
						x = 1/2*largeurPortionVitre
			*/
			xEcran = (xVitre/largeurPortionVitre + 0.5)*this.largeur;
			yEcran = (1-0.7*yVitre)*this.hauteur;
		}
		return {x: xEcran, y: yEcran};
	}
}
