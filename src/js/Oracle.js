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

let ExpressionAnalyses; // String récupéré qui est donnée par le joueur
function AnalyserString(StringADonner, finString, debutString){
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
                AnalyserString(operande1,operande1.length-1, 1);
            }
        }
    }
}

