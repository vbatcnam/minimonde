/**
	Cycle de l'herbe :
		elle pousse (grandit)
		elle est mangée (disparaît)
		elle repousse
		....
	IL faudra positionner l'herbe de manière aléatoire à un endroit libre de la prairie
*/
class Herbe extends Vegetal{
	constructor(espece, num){
		super(espece, num);
		this.killMe = SC.evt("kill");
	}
	
	fabriqueIllustration(){
		return `
			<g  id= ${this.id} class="herbe">
				<path d="m0 17.45 c6.0714-1.7307 17.976 2.1647 20.535 12.443 1.0873-19.537 8.9355-25.363 16.001-29.773-9.514 8.4555-14.393 15.42-13.091 32.636 4.3676-9.6715 13.121-13.107 21.317-8.3569-12.153-3.6682-19.183 8.0998-20.646 15.603h-3.4729c-1.9372-6.7905-1.4909-19.675-20.642-22.552z" style="fill:#003a00;stroke-width:1.7444"/>
				<path d="m44.9997 17.33 c-6.0714-1.7307-17.976 2.1647-20.535 12.443-1.0873-19.537-8.9355-25.363-16.001-29.773 9.514 8.4555 14.393 15.42 13.091 32.636-4.3676-9.6715-13.121-13.107-21.317-8.3569 12.153-3.6682 19.183 8.0998 20.646 15.603h3.4729c1.9372-6.7905 1.4909-19.675 20.642-22.552z" style="fill:#009d00;stroke-width:1.7444"/>
			</g>`
	}
	
	$publicVar_monApparence(){
		return {//les infos envoyées
			repere:'reel', x:this.x, y:this.y, z:0, dessin:this.illustration
		}
	}
	
	verifSiEaten(obj_all, machine){
		//si mangée
		if(true){
			eaten(machine);
		}
	}
	
	eaten(machine){
		machine.generateEvent(this.killMe)
	}
	
	renait(){
		this.taille = 1; //this.taille est défini dans Vegetal
	}
	
}

//test
//==================
// var n = 1;
// for(var c = 0; c < nbreColonnes; c++) {
	// for(var r = 0; r < nbreLigne; r++) {
		// if(tab2d_prairie[c][r] == "herbe") {
			// let herbe = new Herbe(n,c,r);
			// herbe.draw(herbe.x,herbe.y)
			// tab2d_prairie[c][r] = herbe;
			// n++;
		// }
	// }
// }
// for(var c = 0; c < nbreColonnes; c++) {
	// for(var r = 0; r < nbreLigne; r++) {
		// console.log(tab2d_prairie[c][r]);
		// console.log(tab2d_prairie[c][r].x);
		// console.log(tab2d_prairie[c][r].y);
	// }
// }

//================================================================
//							le cube 
//================================================================

//Événements de l'herbe
//----------------------
var eatMe = SC.evt("je suis commestible");

//le comportement du cube qui a l'herbe
var progHerbe = SC.par(
SC.generate(eatMe, SC.my("me"), SC.forever)//La vache vérifie si elle est adulte avant de la manger
//, SC.actionOn(jeMange, SC.my("eaten"), undefined, SC.forever)
, SC.generate(drawMe, SC.my("drawer"), SC.forever)//se dessine
);

