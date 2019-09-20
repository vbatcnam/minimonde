# Système ASTRAL de cordonnées
xAstral va de 0 à 1 de gauche à droite
yAstral va de 0 à 2 de haut en bas
zAstral va de 0 (la prairie) ++ (derrière la prairie)

Dans ce système si X et Y restent le même et que Z augmente : 
- on se retrouvera au même endroit sur l'écran :
- un objet en cache un autre.

# Système TERRESTRE
xTerrestre va de :
* -- (à gauche de l'observateur caméra)
* 0 (au niveau de l'observateur) 
* ++ (à droite de l'observateur) 

yTerrestre va de 
* 0 (au sol)
* 1 (yeux de l'observateur caméra) 
* ++ (au dessus des yeux de l'observateur)

zTerrestre va de 
* 0 (observateur derrière la vitre infinie) 
* 1 (la vitre infinie) 
* ++ (jusqu'à l'horizon)

# Vitre infinie
Devant l'observateur il y a une vitre transparente infinie en hauteur et largeur et d'épaisseur nulle. 
On dessine sur la vitre ce que voit l'observateur.

Notre image svg principale se trouve dans le div "chamCamera" : C'est le dessin de ce que l'utilisateur est sensé voir... C'est notre principe de 3D.

La vitre infinie se trouve en z=1 (entre la caméra et le paysage).
On va calculer sur cette vitre où l'objet est vu.
les coordonnées seront xVitre et yVitre


#champCamera (div)
C'est un morceau de la vitre qui dépend du champ de vision de l'oeil
Il est déterminé par la zone client du navigateur.

# Coordonnée écran
On doit délimiter une portion de la vitre infinie en haut et en bas en fonction de la hauteur de l'écran
Le y=1 de la vitre = 0.7 de hauteur de l'écran (horizon)
Il reste 0.3 de hauteur de l'écran :
- On coupe la vitre en bas en y=O (on ne coupe pas vraiment on dessine une limite)
- On coupe la vitre en haut en y = 10/7.
Il faudra adapter cette portion de vitre à notre écran.
Il faudra faire correspondre la hauteur du viewport à 10/7

# Caméra
C'est l’œil de l'observateur : l'observateur n'a qu'un œil central (cyclope)