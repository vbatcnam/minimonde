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
	ciel: {width: innerWidth, height: innerHeight * 0.3, transformOrigine : 'top left'},
	soleil:{width: 0.5, height: 0.5, transformOrigine : 'center'},
	// soleil:{width: 1, height: 1, transformOrigine : 'center'},
	prairie: {width: innerWidth, height: innerHeight - (innerHeight * 0.3),transformOrigine : 'top left'},
	// herbe:{width: 0.5, height: 0.5, transformOrigine : 'center'},//provisoire
	// fleur{width: 0.5, height: 0.5, transformOrigine : 'center'},//provisoire
	// vache:{width: 0.5, height: 0.5, transformOrigine : 'center'},//provisoire
	// bouse:{width: 0.5, height: 0.5, transformOrigine : 'center'},//provisoire
	// ours:{width: 0.5, height: 0.5, transformOrigine : 'center'},//provisoire
	// abeille:{width: 0.5, height: 0.5, transformOrigine : 'center'},//provisoire
	// lait:{width: 0.5, height: 0.5, transformOrigine : 'center'},//provisoire
	// miel:{width: 0.5, height: 0.5, transformOrigine : 'center'}//provisoire
};


class Camera2D extends SCCube{
	constructor(){
		super();
		this.svgElement = SVG.svgElement(
			document.getElementById('champCamera')
			, innerWidth
			, innerHeight);
		//recevra tous les defs
		this.defsElement = SVG.balise(this.svgElement, 'defs');
		
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
		for( let info of array_infosRecues){
			let elementDessin = document.getElementById(info.id);
			let positionSurEcran = this.traduitPositionPourEcran(info.x, info.y);
			//Si pas encore dessiné
			if(!elementDessin) {
				if(info.repere == 'astral'){ //info.x et info.y vont de 0 à 1
					elementDessin = SVG.innerSVG(this.svgElement, info.dessin);
					
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
				let scale = scaleObjetsDeLaScene[elementDessin.id].width;
				//On le positionne sur l'écran
				elementDessin.setAttribute(
					'transform', 
					`translate(${positionSurEcran.x},${positionSurEcran.y})` +
					` scale(${scale})`
				);
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
	
	traduitPositionPourEcran(x, y){
		const xEcran = x * innerWidth;
		const yEcran = y * scaleObjetsDeLaScene.ciel.height;
		return {x: xEcran, y: yEcran};
	}
	
}

class Camera3D extends SCCube{
	constructor(){super();}
	$publicConst_dessineToiEn3D() {return null}// en cours d'écriture
}


