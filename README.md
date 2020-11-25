# PROJET-LOGIQUE-HLIN509
## Projet de logique :

### Concevoir un jeu entre un joueur et un Oracle. Les étapes du jeu sont les suivantes :

1. L’Oracle présente une formule (non valide) à un joueur.
2. Pour la première étape, il suffit au joueur de cliquer sur la formule pour démarrer le jeu. Pour les étapes suivantes, plusieurs formules sont offertes au choix au joueur qui doit choisir une formule à développer (cf. méthode des arbres).
3. Lorsque le joueur choisit une formule à développer, l’Oracle applique la décomposition de la méthode des arbres.
4. A tout moment du jeu, si le joueur observe une contradiction, il la signale à l’Oracle.
5. Le jeu prend fin lorsque toutes les contradictions auraient été détectées.

-----------------
> A l’issue du jeu, vous retournerez un résultat qui permet de départager les joueurs (Réfléhissez à des critères d’évaluation d’une partie de jeu).


#### Lien du PDF : [Enonce-Projet.pdf](https://moodle.umontpellier.fr/pluginfile.php/1252115/mod_resource/content/1/Enonce-Projet.pdf)

-----------------

## Élément de détermination du score

Comme il s'agit là d'implémenter un jeu entre différents joueurs, il va falloir mettre en place un système de **calcul de score** et **gestions de scores enregistrés**.
Concernant la gestion du ***calcul des scores***, plusieurs parametres peuvent rentrer en compte :
* Le temps :
  * plus le joueur met de temps à répondre, moins il aura de points bonus.
  * a partir d'un certain temps, il n'a plus de points bonus pour cette décomposition.
* Le nombre de fermetures au bon moment :
  * plus le joueur détectera de contradictions justes, et plus il aura de points *(autant que ceux affectés à ce tel sous-problème).*
  * si le joueur détecte une contadiction qui n'a pas lieu d'être, alors il ne gagnera pas de points.
  * si le joueur détecte une bonne fermeture alors qu'il reste encore des formules à développer dans cette branche de l'arbre, il gagnera des points bonus équivalents aux nombres de sous-formules non encore développées restantes dans cette branche.
* Les ALT+TAB :
  * si le joueur fait trop de manipulations visant à tricher ou pouvant être assimiler à de la triche par l'oracle, il aura un malus proportionnel aux nombres de tentatives de triche.
  
