class Ours extends Animal{
	constructor(){
		super();
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
}
