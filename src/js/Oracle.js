/**Scenario représentant notre oracle de jeu**/
//Role : Il va avoir le role de centraliser les informations qui lui parviendront via le
//       joueur pour ensuite appeler l'action adéquate.

/*==============================
 ======== VARIABLES TAG ========
 ==============================*/
//Tag à appliquer au expressions à traiter
export let TAG_expressionComplexeATraiter = "expressionComplexeATraiter";
//Tag à appliquer au expressions qui ont été traitées (et ne sont plus traitable par le joueur)
export let TAG_expressionComplexeTraitee = "expressionComplexeTraitee";