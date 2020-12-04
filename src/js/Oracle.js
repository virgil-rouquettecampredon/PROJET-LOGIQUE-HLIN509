/**Scenario représentant notre oracle de jeu**/
//Role : Il va avoir le role de centraliser les informations qui lui parviendront via le
//       joueur pour ensuite appeler l'action adéquate


/**======================================================================
 * ======================== ELEMENTS IMPORTANTS =========================
 *=======================================================================**/
//Element ou l'expression à analyser va etre ecrite
let el_expressionRentree = document.getElementById(TAGS.TAGID_Formule);
//Element ou l'arbre va etre construit
let el_arbre = document.getElementById(TAGS.TAGID_Arbre);
//Element ou le score sera afficher (a la fin) + recap score
let el_score = document.getElementById(TAGS.TAGID_Score);

/*EXPRESSION*/
let el_areaTxT = document.getElementById(TAGS.TAGID_AREATXT);

let bouton_fin = document.getElementById(TAGS.TAGID_BTN_END);



/**======================================================================
 * ============================= FONCTIONS ==============================
 *=======================================================================**/
/*Fonction de départ permettant d'initialiser le début*/
function init_Oracle(){
    el_score.style.display = "none";
    el_arbre.style.display = "none";
    bouton_fin.style.display = "none";
    el_expressionRentree.style.display = "block";
    init_btn();
}

/*Fonction permettant de savoir si l'evaluation de l'expression est finie ou non*/
function isFinish(){
    let branchesDev = document.getElementsByClassName(TAGS.TAG_BranchesATraiter);
    return branchesDev.length == 0;
}

/*Fonction permettant de définir le comportement des différents boutons*/
function init_btn(){
    //SYMBOLES
    //NON :     ¬
    //ET :      ∧
    //OU :      ∨
    //EQ :      ↔
    //IMP :     →
    //ET
    let el_btn_et = document.getElementById(TAGS.TAGID_BTN_ET);
    //OU
    let el_btn_ou = document.getElementById(TAGS.TAGID_BTN_OU);
    //NON
    let el_btn_non = document.getElementById(TAGS.TAGID_BTN_NON);
    //EQ
    let el_btn_eq = document.getElementById(TAGS.TAGID_BTN_EQ);
    //IMP
    let el_btn_imp = document.getElementById(TAGS.TAGID_BTN_IMP);

    el_btn_et.onclick = function (event){
        el_areaTxT.value+= "∧";
    }
    el_btn_ou.onclick = function (event){
        el_areaTxT.value+= "∨";
    }
    el_btn_non.onclick = function (event){
        el_areaTxT.value+= "¬";
    }
    el_btn_eq.onclick = function (event){
        el_areaTxT.value+= "↔";
    }
    el_btn_imp.onclick = function (event){
        el_areaTxT.value+= "→";
    }
}

/*Fonction permettant de définir le comportement de la l'areaTXT*/
function init_Area(){
    document.addEventListener('keydown', (event) => {
        let k = event.code;
        if(k == "Enter"){
            init_expression();
        }
    });
}

/*Fonction permettant de récupérer le contennu de l'expression passée par le joueur*/
function init_expression() {
    let contennu = el_areaTxT.value;
    let exp = stringToArray(contennu);
    if(exp != null){
        init_Arbre(exp);
        el_expressionRentree.style.display = "none";
    }
}

/*Fonction onclick btn terminer*/
function onclk_terminer(){
    if(confirm("Etes-vous sur de vouloir terminer ?")) {
        init_score();
    }else{
        /*let el_erreur_end = document.getElementById(TAGS.TAGID_AREAERR_END);
        el_erreur_end.innerHTML = "";
        let erreur = document.createElement("p");
        erreur.innerText = message;
        el_erreur_end.append(erreur);*/
        console.log("PEUT PAS");
    }
}

/**Fonction permettant d'initialiser l'arbre
* @param expression : [][] Renseignant l'expression de départ de l'arbre. */
function init_Arbre(expression){
    el_arbre.style.display = "block";
    Arbre.Creer(expression,el_arbre);
    Arbre.init();
}

/**Fonction permettant de transformer une string expression en tableau 2D
 * @param expression : String renseignant l'expression.*/
function stringToArray(expression){
    let monExpression = new Expression(expression);
    if(monExpression.estFBF()){
        if(monExpression.estDeveloppable()){
            return [[expression,true]];
        }else{
            alert_expression("L'expression renseignée n'est pas développable");
            return null;
        }
    }else{
        alert_expression("L'expression renseignée n'est pas une FBF");
        return null;
    }
}

/**Fonction permettant de générer une alerte en cas de passage d'une expression incorrecte
* @param message : String renseignant le corp du message de l'erreur*/
function alert_expression(message){
    let el_erreur = document.getElementById(TAGS.TAGID_AREAERR);
    el_erreur.innerHTML = "";
    let erreur = document.createElement("p");
    erreur.innerText = "*"+ message;
    el_erreur.append(erreur);
}

/**Fonction permettant d'initier la phase finale de scorring**/
function init_score(){
    //Calcul du score et affichage
    el_score.style.display = "block";
}

init_Oracle();