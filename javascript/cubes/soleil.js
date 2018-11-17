/**
	le soleil a un axe de déplacement dans le ciel
	Il rougit un peu lorsqu'il se couche
	Il grandit sur l'horizon puis rétrécit dans le ciel
	il se déplace d'est en ouest (la camera est orientée vers le sur pour le moment)
	
	Le soleil donne sa position, son dessin, le fait qu'il se dessine par rapport à l'écran et non à la réalité.
*/
class Soleil extends SCCube{
	constructor(){
		super();
		this.x = 50; //quelque part à l'est
		this.y = 50;
		this.id = "soleil";
		this.fabriqueIllustration();
		
	}
	
	$publicVar_monApparence(){
		return {//les infos envoyées
			repere:'ecran', x:this.x, y:this.y, z:0, dessin:this.illustration
		}
	}
	
	fabriqueIllustration(){
		this.illustration = SVG.vectorElement('path');
		this.illustration.setAttribute("d", 'm94.474 102.62-20.768-19.234 6.5042 27.549-14.176-24.501-1.9051 28.243-6.3245-27.591-10.145 26.426 2.0891-28.23-17.484 22.262 10.317-26.36-23.269 16.119 17.628-22.148-26.986 8.5447 23.373-15.968-28.306 0.21075 27.041-8.3687-27.111-8.142 28.307-0.026342-23.506-15.771 27.057 8.3184-17.813-21.999 23.403 15.924-10.538-26.272 17.67 22.115-2.3255-28.211 10.366 26.34 6.0932-27.643 2.1416 28.226 13.97-24.619-6.2732 27.603 20.606-19.407-14.131 24.528 25.411-12.471-20.732 19.273 27.958-4.4272-25.492 12.306 28.021 4.0104-27.987 4.245 25.594 12.092-27.995-4.1929 20.893 19.098-25.515-12.258z');
		this.illustration.setAttribute("style", 'fill:#ff0;opacity:1');

	}
	
	getEltSVG(){
		let eltObject = document.getElementById(this.id);
		console.log("eltObject dans la fonction getEltSVG :");
		console.log(eltObject);
		let eltSVG = eltObject.contentDocument;
		console.log("eltSVG dans la fonction getEltSVG :");
		console.log(eltSVG);
		return eltSVG;
	}
	
	getEchelle(elt){
		return array_getEchelle(elt);
	}
}


