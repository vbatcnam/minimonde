'use strict';

/** Librairie pour simplifier la génération des éléments SVG*/
var SVG ={

	// comme innerHTML mais ajoute à la fin au lieu de tout effacer
	innerSVG: function(elt_parent, string_dessin){
		var arrayStringDessin = string_dessin.split(' ');
		arrayStringDessin.splice(1, 0, 'xmlns="http://www.w3.org/2000/svg"');

		var newStringDessin = arrayStringDessin.join(' ');
		var dessinSvg = new DOMParser().parseFromString(
			newStringDessin,
			'application/xml'
		);
		var elt = document.importNode(dessinSvg.documentElement, true);
		elt_parent.appendChild(elt);
		return elt;
	},
	
	xmlns: 'http://www.w3.org/2000/svg',
	
	vectorElement: function(elt){
		return document.createElementNS(this.xmlns, elt);
	},

	/** les balises */
	svgElement: function(elt_parent, w, h, id ){
		let svg = this.vectorElement('svg');
		if(id)
			svgElement.id = id;
		svg.setAttribute("width", w);
		svg.setAttribute("height", h);
		elt_parent.appendChild(svg);
		return svg;
	},

	layersMultiple: function(elt_parent, tab_idLayers ){
		let tab_layers = [];
		for (var i = 0; i<tab_idLayers.length ; i++){
			let layer = this.vectorElement('g');
			layer.id = tab_idLayers[i];
			elt_parent.appendChild(layer);
			tab_layers[i]= layer;
		}
		return tab_layers;
	},

	//g, defs...
	balise: function(elt_parent, s_balise, id){
			let balise = this.vectorElement(s_balise);
			if(id)
				balise.id = id;
			elt_parent.appendChild(balise);
			return balise;
	},

	/** les formes */
	rect: function(elt_parent, x, y, w, h, fill, stroke){
		let rect = this.vectorElement('rect');
			rect.setAttribute('x',x);
			rect.setAttribute('y',y);
			rect.setAttribute('width',w);
			rect.setAttribute("height", h);
			if(fill)
				rect.setAttribute("fill", fill);
			if(stroke)
				rect.setAttribute("stroke", stroke);
			elt_parent.appendChild(rect);
			return rect;
	},

	cercle: function(){},

	/** les gradiants */
	gradiant: function(elt_def, id, x1, x2, y1, y2){
		let gradiant = this.vectorElement('linearGradient');
		gradiant.id = id;
		gradiant.setAttribute('gradientUnits',"objectBoundingBox");
		gradiant.setAttribute('x1',x1);
		gradiant.setAttribute('x2',x2);
		gradiant.setAttribute('y1',y1);
		gradiant.setAttribute('y2',y2);
		elt_def.appendChild(gradiant);
		return gradiant;
	},


	stop: function(elt_gradiant, id, offset, style){
		let stop = this.vectorElement('stop');
		stop.id = id;
		stop.setAttribute('offset', offset);
		stop.setAttribute('style', style);
		elt_gradiant.appendChild(stop);
		return stop;
	}
}
