class Animal{
	constructor(espece){
		this.espece = espece;
		this.faim = 0; //n'a pas faim (100 a très faim)
	}
	mange(){
		this.faim += 1;
	}
}
