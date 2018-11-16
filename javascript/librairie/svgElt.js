/** Librairie pour simplifier la génération des éléments SVG*/

function newVectorElement(elt){
	return document.createElementNS('http://www.w3.org/2000/svg', elt);
}

/** les balises */
function createSvgElement(elt_parent, w, h ){
	svgElement = newVectorElement('svg');
	svgElement.id = 'idDuSVG';
	svgElement.setAttribute("width", w);
	svgElement.setAttribute("height", h);
	elt_parent.appendChild(svgElement);
	return svgElement;
}

function createLayer(elt_parent, tab_idLayers ){
	let tab_layers = [];
	for (var i = 0; i<tab_idLayers.length ; i++){
		let layer = newVectorElement('g');
		layer.id = tab_idLayers[i];
		elt_parent.appendChild(layer);
		tab_layers[i]= layer;
	}
	return tab_layers;
}

//g, defs,
function createBalise(elt_parent, s_balise, id){
		let balise = newVectorElement(s_balise);
		balise.id = id;
		elt_parent.appendChild(balise);
		return balise;
}

/** les formes */
function createRect(elt_parent, x, y, w, h, fill, stroke){
	let rect = newVectorElement('rect');
		rect.setAttribute('x',x);
		rect.setAttribute('y',y);
		rect.setAttribute('width',w);
		rect.setAttribute("height", h);
		rect.setAttribute("fill", fill);
		rect.setAttribute("stroke", stroke);
		elt_parent.appendChild(fond);
		return rect;
}

function createCercle(){}

/** les gradiants */
function createGradiant(elt_def, id, x1, x2, y1, y2){
	let gradiant = newVectorElement('linearGradient');
	gradiant.id = id;
	gradiant.setAttribute('gradientUnits',"objectBoundingBox");
	gradiant.setAttribute('x1',x1);
	gradiant.setAttribute('x2',x2);
	gradiant.setAttribute('y1',y1);
	gradiant.setAttribute('y2',y2);
	elt_def.appendChild(gradiant);
	return gradiant;
}

function createStop(elt_gradiant, id, offset, style){
	let stop = newVectorElement('stop');
	stop.id = id;
	stop.setAttribute('offset', offset);
	stop.setAttribute('style', style);
	elt_gradiant.appendChild(stop);
	return stop;
}
