class Vache extends Animal{
	constructor(){
		super();
		this.lait = 0;
		this.bouse = 0;
	}
	
	draw(x,y, présentation){
		var image = "image/vache_" + présentation + ".svg";
		var prairie = document.getElementById("prairie");
		var vache = document.createElement("object");
		vache.id = "vache";
		vache.type = "image/svg+xml";
		vache.data = image;
		prairie.appendChild(vache);
	}

	produit(quoi){
	
	}
	
	elimine(){}
}

//test
new Vache().draw(10,10, "face");