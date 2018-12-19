'use strict';

/**
	Le ciel est en arrière plan. Il sera redimensionné par la camera
		xAstral va de 0 à 1 de gauche à droite
		yAstral va de 0 à 1 de haut en bas
*/
class Ciel extends SCCube{
	constructor(){
		super();
		this.id = "ciel";
		this.xAstral = 0; 
		this.yAstral = 0;
		this.zAstral = -100;//arrière plan
		this.illustration = `<rect id="${this.id}" x="0" y="0" width="1" height="1" />`;
		this.coloriage = {
			id:'gradiantCiel',
			x1:0,
			x2:0, 
			y1:0, 
			y2:1,
			listeStop:[
				{
					id:'fondCiel_part1',
					offset:0,
					style:'stop-color:#9cf;stop-opacity:1'
				},
				{
					id:'fondCiel_part2',
					offset:1,
					style:'stop-color:#69c;stop-opacity:1'
				}
			]
		}
	}
}