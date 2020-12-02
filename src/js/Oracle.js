import * as TAG from "./TAG";
/**Scenario représentant notre oracle de jeu**/
//Role : Il va avoir le role de centraliser les informations qui lui parviendront via le
//       joueur pour ensuite appeler l'action adéquate

let ExpressionAnalyses; // String récupéré qui est donnée par le joueur

/**Fonction qui va permettre à l'oracle de modéliser l'action d'un joueur (entrée)
@param element : Element renseignant l'élément sur lequel le joueur à cliqué
@return [][][] : une structure de données contenant pour chaque sous branche resultante le contennu de chacune des expression
la composant ainsi qu'un booleen renseignant pour chacune d'elle si c'est une expression encore traitable ou non.
Ex : "(a->b) OU b" => [[["a->b",true]],[["b",false]]]
     "(a ET b ET (a->b))" => [[["a",false],["b",false],["a->b",true]]]
*/
export function Action_Joueur(element){
    //Resultat
    let res = [];
    //On récupère la branche de l'élément (son plus proche père)
    let parent = element.closest("." + TAG.TAG_Branche);
    let autresExpressions = parent.getElementsByClassName(TAG.TAG_expression);
    //Variable symbolisant le reste des expressions qui n'ont pas été affectées par le choix du joueur
    let expParDef = [];
    for (let i = 0; i < autresExpressions.length; i++) {
        expParDef.push([autresExpressions[i].textContent,estTraitableEncore(autresExpressions[i].textContent)]);
    }
    //Traitement de l'expression sélectionnée par le joueur
    /*Code magique*/
    return res;
}

/**Fonction permettant de savoir si une expression sous forme d'une String est encore traitable ou non
 * @param exp : String renseignant l'expression à évaluer**/
function estTraitableEncore(exp){
    return false;
}


//Fonction qui permettra d'analyser une expression sous forme d'une chaine de caractère
/*function Analyser_Expression(StringADonner, finString, debutString){
    let nbParanthese = 0;
    let tableauOperande;
    let compteurTableau = 0;
    let debutOperande = debutString;
    for (let i = debutString; i < tailleString; i++) {
        if (nbParanthese == 0){
            let ope ="";
            for (let j = debutOperande; j <= i; j++) {
                ope += StringADonner[j];
            }
            tableauOperande[compteurTableau] = ope;
            compteurTableau++;
            debutOperande = i+1;
        }
        if (StringADonner[i] == "("){
            nbParanthese++;
        }
        if (StringADonner[i] == ")"){
            nbParanthese--;
        }
    }
    if (tableauOperande.length == 1){
        let operande1 = tableauOperande[0]
        if (operande1.length != 1){
            if (operande1[0] == "(" && operande1[operande1.length-1] == ")"){
                Analyser_Expression(operande1,operande1.length-1, 1);
            }
        }
    }
}*/