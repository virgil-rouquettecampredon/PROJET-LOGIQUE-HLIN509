import * as ARBRE from "./Arbre";

class Branche {
    /**Contructeur d'une branche
     * @param pere : Element renseignant le pere de cette branche
     * @param contenu : Element renseignant le contennu de la branche
     * @param container : Element renseignant l'élément contenant la branche (pour un meilleur affichage)**/
    constructor(pere, contenu, container){
        this.pere = pere;
        this.contenu = contenu;
        this.container = container;
        this.fils = [];
    }
    /**Fonction permettant d'ajouter un fils à une branche
     * @param fils : Branche fils de this**/
    addFils(fils){
        //Ajout a la liste
        this.fils.push(fils);
        //Ajout du container du nouveau fils comme fils du container du pere
        this.container.append(fils.container);
    }
}