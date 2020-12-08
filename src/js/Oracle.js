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
let timer = document.getElementById(TAGS.TAGID_Timer);
let timerInterval = null;

let nbAltTab = 0;

/**======================================================================
 * ============================= FONCTIONS ==============================
 *=======================================================================**/
function initNegation(expression){
    return "¬(" + expression + ")";
}
/*Fonction de départ permettant d'initialiser le début*/
function init_Oracle(){
    el_score.style.display = "none";
    el_arbre.style.display = "none";
    bouton_fin.style.display = "none";
    timer.style.display = "none";
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
    };
    el_btn_ou.onclick = function (event){
        el_areaTxT.value+= "∨";
    };
    el_btn_non.onclick = function (event){
        el_areaTxT.value+= "¬";
    };
    el_btn_eq.onclick = function (event){
        el_areaTxT.value+= "↔";
    };
    el_btn_imp.onclick = function (event){
        el_areaTxT.value+= "→";
    };
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
    contennu = initNegation(contennu);
    let exp = stringToArray(contennu);
    if(exp != null){
        init_Arbre(exp);
        el_expressionRentree.style.display = "none";
        bouton_fin.style.display = "block";
        timer.style.display = "block";
        timerInterval = lunchTimer(document.getElementById(TAGS.TAGID_Timer_val));
        //Gestion alttab
        window.onblur = ()=>{
            nbAltTab++;
        }
    }
}

/*Fonction onclick btn terminer*/
function onclk_terminer(){
    if(confirm("Etes-vous sur de vouloir terminer ?")) {
        init_score();
    }else{
        console.log("OK BOOMER");
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
    //On stope le compteur
    clearInterval(timerInterval);
    //On enlève tous les onclicks possibles
    let brancheOnclk = document.getElementsByClassName(TAGS.TAG_Branche);
    console.log(brancheOnclk);
    let expressionOnclk = document.getElementsByClassName(TAGS.TAG_expression);
    console.log(expressionOnclk);
    for (let i = 0; i < brancheOnclk.length; i++) {
        brancheOnclk[i].replaceWith(brancheOnclk[i].cloneNode(true));
    }
    for (let j = 0; j < expressionOnclk.length; j++) {
        expressionOnclk[j].replaceWith(expressionOnclk[j].cloneNode(true));
    }
    bouton_fin.style.display = "none";

    //On affiche le score
    el_score.style.display = "block";
    let el_bonus_Temps = document.getElementById("bonusTemps").getElementsByClassName("content")[0];
    let bonusTps = countScoreTime()
    el_bonus_Temps.innerText = bonusTps;
    let el_malus_onblr = document.getElementById("malusOnBlur").getElementsByClassName("content")[0];
    el_malus_onblr.innerText = -nbAltTab*75;
    let el_bonus_BF = document.getElementById("bonusBienFermeSurFermable").getElementsByClassName("content")[0];
    let el_bonus_ExpADev = document.getElementById("bonusExpResteADev").getElementsByClassName("content")[0];
    let el_malus_MF = document.getElementById("bonusMalFerme").getElementsByClassName("content")[0];
    let bonus = countScoreBF();
    el_bonus_ExpADev.innerText = bonus[1]*200;
    el_bonus_BF.innerText = bonus[0]*500;
    el_malus_MF.innerText = -bonus[2]*250;
    let el_total = document.getElementById("total").getElementsByClassName("content")[0];
    el_total.innerText = (bonusTps+bonus[0]*500+bonus[1]*200-(nbAltTab*75)-(bonus[2]*250));
}

/**Fonction permettant d'initier le timer**/
function lunchTimer(container){
    let maintenant = new Date();
    let Start = maintenant.getTime();

    function affiche_heure() {
        let secondes_abs = Math.round(calcul_temps());
        let secondes_rel = secondes_abs % 60;
        let minutes_abs = Math.trunc(secondes_abs / 60);
        //let minutes_normal = minutes_abs%60;

        let nombre_secondes = "" + ((secondes_rel > 9) ? secondes_rel : "0" + secondes_rel);
        let nombre_minutes = "" + ((minutes_abs > 9) ? minutes_abs : "0" + minutes_abs);
        container.innerText = nombre_minutes + " : " + nombre_secondes;
    }

    function calcul_temps() {
        let encore_toujours = new Date();
        return((encore_toujours.getTime() - Start)/1000);
    }

    return setInterval(affiche_heure, 1000);
}

function countScoreTime(){
    let temps = document.getElementById(TAGS.TAGID_Timer_val).innerText;
    let seconde = temps.slice(5,7);
    let minute = temps.slice(0,2);
    let bonus = 3;
    if (minute < 1) {
        if (seconde > 35) {
            bonus-= 3;
        }
        else if (seconde > 25) {
            bonus-=2;
        }
        else if (seconde > 15) {
            bonus--;
        }
    }
    return bonus * 100;
}

function countScoreBF(){
    let el_brancheFermee = document.getElementsByClassName(TAGS.TAG_BranchesFermees);
    let contradiction = false;
    let branche = [];

    for (let i = 0; i < 3; i++) {
        branche[i] = 0;
    }

    for (let i = 0; i < el_brancheFermee.length; i++) {
        let el_expressions = el_brancheFermee[i].getElementsByClassName(TAGS.TAG_expression);
        for (let j = 0; j < el_expressions.length; j++) {
            let negationSimple = false;
            let operande = el_expressions[j].innerText;
            if (el_expressions[j].innerText.length == 4){
                negationSimple = true;
            }
            for (let k = j+1; k < el_expressions.length; k++) {
                if (negationSimple && operande[0] == "¬" && operande[operande.length-1] == ")"){
                    if (el_expressions[k].innerText.length == 3) {
                        if (el_expressions[k].innerText.slice(1,2) == operande.slice(2, 3)) {
                            contradiction = true;
                        }
                    }
                    else if(el_expressions[k].innerText.length == 1){
                        if (el_expressions[k].innerText == operande.slice(2, 3)) {
                            contradiction = true;
                        }
                    }
                    negationSimple = false;
                }
                else if (!negationSimple && operande.length >=1 && operande.length<= 3){
                    if (operande.length == 3){
                        operande = operande.slice(1,2);
                    }
                    if (el_expressions[k].innerText.length == 4) {
                        if (el_expressions[k].innerText.slice(2,3) == operande) {
                            contradiction = true;
                        }
                    }
                }
                if (contradiction){
                    branche[0] += 1;
                    break;
                }
            }
            if (contradiction){
                branche[1] += el_brancheFermee[i].getElementsByClassName(TAGS.TAG_expressionComplexeATraiter).length;
                break;
            }
        }
        if(!contradiction){
            branche[2]++;
        }else{
            contradiction = false;
        }
    }
    return branche;
}
init_Oracle();