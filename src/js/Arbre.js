//import * as ORACLE from "./Oracle";

//Classe modélisant les controles alloués au joueur et l'arborescence des branches de l'arbre
class Arbre{
    //Nombre de branches dans l'Arbre
    //static cptBranche = 0;
    //Branches dans l'arbre
    static arborescence = [];

    /**Fonction permettant de construire un arbre
     * @param expDep : [][] renseignant l'expression de départ (=> [["aOUb",true],["c",false]])
     * @param HTMLelem : Element renseignant l'élément dans lequel l'arbre va s'afficher**/
    static Creer(expDep,HTMLelem){
        Arbre.addBranche(HTMLelem,null,expDep);
    }

    /**Fonction permettant d'ajouter une nouvelle branche à l'arbre
     @param container : HTMLElement renseignant l'endroit ou mettre la branche
     @param pere : Branche renseignant le pere de la branche à générer, lui meme une branche
     @param branche : [][] renseignant toutes les expressions dans l'une des branches resultante avec pour chacune
             d'elle l'information de si elles sont encore developpable ou non.
     //@param expressionsRestantes : Element[] renseignant les expressions à mettre dans la ou les branches resultantes de
            l'op choisie par le joueur
     **/
     static addBranche(container,pere,branche){
         //Arbre.cptBranche++;
         //Générer le wrapper
         let wrapper = document.createElement("div");
         wrapper.classList.add(TAGS.TAG_Wrapper);
         wrapper.id = "wb" + (Arbre.arborescence.length + 1);
         wrapper.style.width = "100%";

         //Générer la branche
         //Nouvelle branche
         let nvllBranche = document.createElement("div");
         //elements encore developpable au sein de la branche ?
         let nbencoreDev = false;
         for (let i = 0; i <branche.length; i++) {
             //Pour chaque elements de branches, on va créer une div que l'on va inclure à la div de la branche
             //l'arbre en entier
             let htmlelem = document.createElement("div");
             nvllBranche.appendChild(htmlelem);
             htmlelem.textContent = branche[i][0];
             //Si cette expression est encore developpable, alors
             if(branche[i][1]){
                 nbencoreDev = true;
                 htmlelem.classList.add(TAGS.TAG_expressionComplexeATraiter);
             }else{
                 htmlelem.classList.add(TAGS.TAG_expressionComplexeTraitee);
             }
             //Dans tous les cas, c'est une expression :
             htmlelem.classList.add(TAGS.TAG_expression);
         }
        //S'il reste au moins une expression encore develloppable dans la nouvlle branche créée
        if(nbencoreDev){
            nvllBranche.classList.add(TAGS.TAG_BranchesATraiter);
        }else{
            nvllBranche.classList.add(TAGS.TAG_BranchesTraitees);
        }
        nvllBranche.classList.add(TAGS.TAG_Branche);
        //L'ID d'une nouvelle branche correspond à son ordre d'apparation dans l'arborescence
        nvllBranche.id = "b"+(Arbre.arborescence.length+1);

        //Encapsuler la branche dans le wrapper
        wrapper.append(nvllBranche);

        //Encapsuler le wrapper dans le container
        container.append(wrapper);

        //Gestion au niveau de la classe Arbre
        let branch_br;
        if(pere!=null){
            branch_br= new Branche(pere.contenu, nvllBranche, container);
            pere.addFils(branch_br);
        }else{
            //racine de l'arborescence
            branch_br = new Branche(null, nvllBranche, container);
        }
        Arbre.arborescence.push(branch_br);
        //this.arborescence.push(branche_br);
    }

    /**Fonction d'initialisation des controles du joueur
    On va ici mettre à jour les éléments cliquables par le joueur**/
    static init() {
        /**Récupération du conteneur de l'expression complexe actuelle : Il s'agira de l'expression qui sera donnée au joueur et qu'il aura soin de décomposer.
         * Lors d'une décomposition, le joueur va générer une ou plusieurs autres branches qui seront à leur tour marquée d'un TAG permettant de les reconnaitre.
         * L'ancienne branche (et expression complexe) qui va engendrer la décomposition souhaitée par le joueur sera alors marquée d'un nouveau TAG permettant de l'identifier
         * (elle ne pourra plus être traitée, et aucune action ne pourra l'affecter par la suite).**/
        /*==============================
         === GESTION DES OPERATIONS ===
         ==============================*/
        //Récupération de(ou des) branche(s) complexe(s) à traiter :
        //BranchesAtraiter = HTMLElement renseignant la div dans laquelle le ou les expressions complexes restant à traiter sont stockées
        let branchesAtraiter = document.getElementsByClassName(TAGS.TAG_BranchesATraiter);
        //Pour chaque operations de branchesAtraiter, il faut regarder si elles sont encore traitables
        //Pour cela, on va regarder les TAG correspondant
        //operationsATraiter : HTMLElement renseignant toutes les operations encore a traiter

        //Pour chaques branches à traiter
        for (let i = 0; i < branchesAtraiter.length; i++) {
            let expressionsATraiter = branchesAtraiter[i].getElementsByClassName(TAGS.TAG_expressionComplexeATraiter);
            //Pour chaque expression a traiter
            for (let j = 0; j <expressionsATraiter.length ; j++) {
                expressionsATraiter[j].onclick = function (event) {
                    //Fonction renseignant le comportement à adopter en cas de clic sur une expression encore developable
                    //On récupère l'élément
                    let element = event.currentTarget;
                    //On récupère la branche de l'élément
                    let parent = element.closest("." + TAGS.TAG_Branche);
                    //Si la branche n'est pas fermée par le joueur, alors
                    if (!parent.classList.contains(TAGS.TAG_BranchesFermees)) {
                        //On peut appliquer la suite de l'action du clic sur une expression a traiter
                        //On modifie la branche actuelle
                        parent.classList.remove(TAGS.TAG_BranchesATraiter);
                        parent.classList.add(TAGS.TAG_BranchesTraitees);

                        //On enlève ensuite le TAG_expressionComplexeATraiter
                        element.classList.remove(TAGS.TAG_expressionComplexeATraiter);
                        //On enlève aussi l'élément on_click
                        element.onclick = null;

                        //Enfin, on signale à l'oracle que le joueur a réalisé une action et qu'il peut la traiter
                        //let res = ORACLE.Action_Joueur(element);
                        let res = [[["aOUb",true],["d",false]],[["aOUb",true],["d",false]]];
                        //On enlève toutes les expressions contennues dans parent
                        let toutesLesExpressions = parent.getElementsByClassName(TAGS.TAG_expression);
                        for (let l = 0; l < toutesLesExpressions.length; l++) {
                            toutesLesExpressions[l].classList.remove(TAGS.TAG_expressionComplexeATraiter);
                            toutesLesExpressions[l].onclick = null;
                        }
                        //Le resultat de l'action nous permettra ensuite de réaliser la suite

                        //Notament la gestion de l'arborescence
                        //Chaque branche retournée par l'Oracle est autant de fils à ajouter au parent de l'élément cliqué

                        //On récupère la valeur d'indice de l'arbre dans le tableau this.arborescence
                        let indiceBranche = parseInt(parent.id.split("b")[1]) - 1;
                        //Puis on récupère l'élément Branche correspondant à la branche de l'élément cliqué
                        let branche_br = Arbre.arborescence[indiceBranche];

                        console.log(indiceBranche);
                        console.log(branche_br);

                        //Pour chaque branche retournée par l'Oracle
                        for (let k = 0; k < res.length; k++) {
                            //Générer le wrapper
                            let wrapper = document.createElement("div");
                            wrapper.classList.add(TAGS.TAG_Wrapper);
                            wrapper.id = "f"+(k+1)+parent.id;
                            wrapper.style.width = (100/res.length)+"%";
                            //Ajouter une branche ayant pour container wrapper
                            Arbre.addBranche(wrapper,branche_br,res[k]);
                        }
                        branche_br.afficherFils();
                        Arbre.init();
                    } else {
                        console.log("Cette branche est fermée et ne peut par conséquent pas être plus développée");
                    }

                };
            }
        }
    }


    /**Constructeur d'un Arbre
     * @param expDep : [][] renseignant l'expression de départ (=> [["aOUb",true],["c",false]])
     * @param HTMLelem : Element renseignant l'élément dans lequel l'arbre va s'afficher
    constructor(expDep,HTMLelem) {
        //Arbre.cptBranche++;
        Arbre.addBranche(HTMLelem,null,expDep);
    }
    **/
    /*

//Fonction renseignant le comportement à adopter quand le joueur clic sur une branche pour la fermer
ONCLK_brancheAFermer(event){
    //On récupère l'élément
    let element = event.currentTarget;

    //On modifie sa branche actuelle
    let parent = element.closest("#"+TAG_BranchesATraiter);
    parent.classList.remove(TAG_BranchesATraiter);
    parent.classList.add(TAG_BranchesFermees);

}

//Fonction permettant de générer l'élément div branche demandé puis de l'inclure dans l'arborescence
// @param : pere renseignant le pere de la branche à générer, lui meme une branche
// @param : branches renseignant toutes les expressions dans la ou des branche avec pour chacune
//         d'elle l'information de si elles sont encore developpable ou non
// @param : expressionsRestantes renseignant les expressions à mettre dans la ou les branches resultantes de
//         l'op choisie par le joueur
generateBranche(){
    //Rang de l'arbre dans lequel la ou les branches à créer vont se retrouver
    let rang = document.getElementById(""+(parseInt(pere.rang.id) + 1));
    if(rang==null){
        rang = document.createElement("div");
        rang.classList.add(TAG_RangBranche);
        rang.id = ""+(parseInt(pere.rang.id) + 1);
    }

    //Pour chaque sous branche resultante
    for (let j = 0; j < branches.length; j++) {
        //Nouvelle branche
        let nvllBranche = document.createElement("div");
        //elements encore developpable au sein de la branche ?
        let nbencoreDev = false;
        for (let i = 0; i <branches[j].length; i++) {
            //Pour chaque elements de branches, on va créer une div que l'on va inclure à la div de la branche
            //l'arbre en entier
            let htmlelem = document.createElement("div");
            nvllBranche.appendChild(htmlelem);
            htmlelem.textContent = branches[j][i][0];
            //Si cette expression est encore developpable, alors
            if(branches[j][i][1]){
                nbencoreDev = true;
                htmlelem.classList.add(ORACLE.TAG_expressionComplexeATraiter);
            }else{
                htmlelem.classList.add(ORACLE.TAG_expressionComplexeTraitee);
            }
            //Dans tous les cas, c'est une expression :
            htmlelem.classList.add(ORACLE.TAG_expression);
        }

        //Pour chaques expressions à inclure dans chacune des expressions resultantes
        for (let k = 0; k < expressionsRestantes.length; k++) {
            nvllBranche.appendChild(expressionsRestantes[k]);
        }

        //S'il reste au moins une expression encore develloppable dans la nouvlle branche créée
        if(nbencoreDev){
            nvllBranche.classList.add(TAG_BranchesATraiter);
        }else{
            nvllBranche.classList.add(TAG_BranchesTraitees);
        }
        nvllBranche.classList.add(TAG_Branche);
        //L'ID d'une nouvelle branche correspond à son ordre d'apparation dans l'arborescence
        nvllBranche.id = ""+this.arborescence.length;
        let branche = new Branche(pere.contenu,nvllBranche,rang);
        this.arborescence.push(branche);
        this.afficherNouvelleBranche(branche);
    }
}


//Fonction permettant d'afficher à l'écran une nouvelle Branche
afficherNouvelleBranche(branche){
    //On récupère toutes les branches de ce rang
    branche.rang.getElementsByClassName(TAG_Branche);
    branche.rang.appendChild(branche);
    //ligne entre pere et fils
    let liaison = document.createElement("canvas");
    let ctx_liaison = liaison.getContext("2d");
    ctx_liaison.beginPath();
    ctx_liaison.moveTo();
}*/


}
