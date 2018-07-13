class Herbe extends Vegetal{
	constructor(){
		super();
	}
	
	//Il faut les positionner de manière aléatoire 
	draw(x,y){
		var prairie = document.getElementById("prairie");
		var zoneHerbe = document.createElement("object");
		zoneHerbe.className = "herbe";
		zoneHerbe.type = "image/svg+xml";
		zoneHerbe.data = "image/herbeSFW.svg";
		prairie.appendChild(zoneHerbe);
	}
}

//test
for(var i = 0; i<5; i++){
	new Herbe().draw(i+2, i+4);
}