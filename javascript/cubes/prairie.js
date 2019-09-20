'use strict';

/**
	C'est le fond de la prairie (un carré vert) qui sera redimensionné par la camera
	Ce carré sera animé : il foncera ou s’éclaircira en fonction du jour et de la nuit.
*/

class Prairie extends SCCube{
	constructor(){
		super();
		this.id="prairie";
		this.xAstral = 0;
		this.yAstral = 1;
		this.zAstral = 0;
		this.illustration = `<rect id="${this.id}" x="0" y="0" width="1" height="1"/>`;
		this.coloriage = {
			id:'gradiantPrairie',
			x1:0,
			x2:0, 
			y1:0, 
			y2:1,
			listeStop:[
				{
					id:'horizon_part2',
					offset:0,
					style:'stop-color:#595;stop-opacity:1'
				},
				{
					id:'horizon_part2',
					offset:1,
					style:'stop-color:#590;stop-opacity:1'
				}
			]
		}
	}

	$publicVar_monApparence(){
		return {//les infos envoyées
			repere:'astral',
			id:this.id,
			x:this.xAstral,
			y:this.yAstral,
			z:this.zAstral,
			dessin:this.illustration,
			coloriage: this.coloriage
		}
	}

}
