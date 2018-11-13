# minimonde
Mini monde simple pour tester la programmation avec sugarCubes.

Cette branche est écrite en utilisant une librairie qui permet de coder plus facilement du SugarCubes avec JavaScript.

Avec SugarCubes je devais créer des objets JS puis des cubes SC dans lesquels je mettait mes objets JS.
Ici, on crée un objet SCCube qui s’occupe de tout.

# La librairie syntaxeSimplifieeSC
Cette syntaxe facilite l'utilisation de sugarCubes

Pour raccourcir je vais l'appeler "SCEasy"

# Ce qui change avec SCEasy.
Ce fichier contient dejà la machine donc pas la peine de la créer de nouveau dans notre programme.
````javascript
var monde = SC.machine(30);
monde.addActor = monde.addProgram;
````

*monde* m'est plus parlant que *machine* car je ne sais pas bien ce qu'on entend par machine. 

Du coup, *addActor* me parait plus intuitif : J'ajoute les acteurs de mon monde.

## création des objets
Maintenant, pour créer mes objets, j'utilise la syntaxe suivante :

````javascript
class MaClasse extends SCCube{
	constructor(p1, pn){
		super();
		this.1 = p1;
		this.n = pn;
	}
````

## Action sur les événement.
Pour appeler les fonctions de SugarCubes, j'utilise les syntaxes suivante 

````javascript
	$actionForever_descriptionAction(){} // si l'action est forever
	$on_nomEvenement_descriptionAction(){}
	$onNo_nomEvenement_descriptionAction(){}
	$publicConst_nomEvenement() {return valAEnvoyer} //permet de faire un SC.generate()
````