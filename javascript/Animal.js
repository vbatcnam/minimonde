class Animal{
	constructor(){
		this.faim = 0; //n'a pas faim (100 a très faim)
	}
	mange(calorie){
		this.faim -= calorie;
	}
}
