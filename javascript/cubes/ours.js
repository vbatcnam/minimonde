class Ours extends Animal{
	constructor(){
		super();
		this.faim = 0; //n'a pas faim
	}
	
	draw(x,y, présentation){
		var image = "image/ours_" + présentation + ".svg";
		var prairie = document.getElementById("prairie");
		var ours = document.createElement("object");
		ours.id = "vache";
		ours.type = "image/svg+xml";
		ours.data = image;
		prairie.appendChild(ours);
	}
             
	mange(){}
}
