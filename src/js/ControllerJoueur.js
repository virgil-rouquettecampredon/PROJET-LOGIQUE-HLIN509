/**TAG des branches de l'arbre restant à traiter par le joueur : **/    export let TAG_BranchesATraiter = "bracheATraiter";
/**TAG des branches déjà traitées par le joueur : **/                   export let TAG_BranchesTraitees = "BrancheTraitee";
/**TAG des branches fermées par le joueur : **/                         export let TAG_BranchesFermees = "BrancheFermee";

import TAG_expressionComplexeATraiter from "./Oracle";
import TAG_expressionComplexeTraitee from "./Oracle";

//Classe modélisant les controles alloués au joueur
class ControllerJoueur{

    /*==============================
     ====== METHODES ONCLICK ======
     ==============================*/
    //Fonction renseignant le comportement à adopter en cas de clic sur une expression encore developable
    ONCLK_expressionADev(event){
        //On récupère l'élément
        let element = event.currentTarget;
        //On lui enlève le TAG_expressionComplexeATraiter
        element.classList.remove(TAG_expressionComplexeATraiter);
        //On lui enlève l'élément on_click
        element.onclick = null;

    }

    //Fonction d'initialisation des controles du joueur
    //On va ici mettre à jour les éléments cliquables par le joueur
    init() {
        /**Récupération du conteneur de l'expression complexe actuelle : Il s'agira de l'expression qui sera donnée au joueur et qu'il aura soin de décomposer.
         * Lors d'une décomposition, le joueur va générer une ou plusieurs autres branches qui seront à leur tour marquée d'un TAG permettant de les reconnaitre.
         * L'ancienne branche (et expression complexe) qui va engendrer la décomposition souhaitée par le joueur sera alors marquée d'un nouveau TAG permettant de l'identifier
         * (elle ne pourra plus être traitée, et aucune action ne pourra l'affecter par la suite).**/

        /*==============================
         === GESTION DES OPERATIONS ===
         ==============================*/

        //Récupération de(ou des) branche(s) complexe(s) à traiter :
        //BranchesAtraiter = HTMLElement renseignant la div dans laquelle le ou les expressions complexes restant à traiter sont stockées
        let branchesAtraiter = document.getElementsByClassName(TAG_BranchesATraiter);
        //Pour chaque operations de branchesAtraiter, il faut regarder si elles sont encore traitables
        //Pour cela, on va regarder les TAG correspondant
        //operationsATraiter : HTMLElement renseignant toutes les operations encore a traiter
        let operationsATraiter = document.getElementsByClassName(TAG_expressionComplexeATraiter);
    }

}
