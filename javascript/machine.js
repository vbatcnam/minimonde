//le moteur qui exécute les programmes
//-------------------------------------
var moteur = SC.machine(30);// toutes les 30 millisecondes il y a une macro étape (ou instant)

//On ajoute les cubes au moteur
//-------------------------------------
//moteur.addProgram(cube);

//l'herbe
for(let tab_CubeHerbe of tab2d_prairie){
  for(let prog of tab_CubeHerbe){
    moteur.addProgram(prog);
    }
  }
