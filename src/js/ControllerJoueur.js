/**Récupération du conteneur de l'expression complexe actuelle : Il s'agira de l'expression qui sera donnée au joueur et qu'il aura soin de décomposer.
 * Lors d'une décomposition, le joueur va générer une ou plusieurs autres expressions complexes qui seront à leur tour marquée d'un TAG permettant de les reconnaitre.
 * L'ancienne expression complexe qui va engendrer la décomposition souhaitée par le joueur sera alors marquée d'un nouveau TAG permettant de l'identifier (elle ne pourra plus être traitée, et aucune action ne pourra l'affecter par la suite).**/

/*==============================
 === GESTION DES OPERATIONS ===
 ==============================*/
/**TAG des expressions complexes restant à traiter par le joueur : **/  let TAG_operationATraiter = "operationsATraiter";
/**TAG des expressions complexes déjà traitée par le joueur : **/       let TAG_operatioTraitee = "operationsTraitee";

//Récupération de(ou des) expression(s) complexe(s) à traiter :
//operationsAtraiter = HTMLElement renseignant la dic dans laquelle le ou les expressions complexes à traiter sont stockées
let operationsAtraiter = document.getElementsByClassName(TAG_operationATraiter);



