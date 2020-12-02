class Expression {

    constructor() {
        this.estNegatif = false;
    }

    AnalyserString(StringADonner, debutString,finString){
        let nbParanthese = 0;
        this.tableauOperande = [];
        let compteurTableau = 0;
        let debutOperande = debutString;
        for (let i = debutString; i < finString; i++) {
            while (StringADonner[i] == "¬"){
                if (this.estNegatif){
                    this.estNegatif = false;
                }
                if (!this.estNegatif){
                    this.estNegatif = true;
                }
                i++;
            }
            if (StringADonner[i] == "("){
                nbParanthese++;
            }
            if (StringADonner[i] == ")"){
                nbParanthese--;
            }
            if (nbParanthese == 0){
                let ope ="";
                if (this.estNegatif){
                    this.estNegatif = false;
                }
                for (let j = debutOperande; j <= i; j++) {
                    ope += StringADonner[j];
                }
                this.tableauOperande.push(ope);
                //console.log(this.tableauOperande[i]);
                compteurTableau++;
                debutOperande = i+1;
            }
        }
        if (this.tableauOperande.length === 1){
            let operande1 = this.tableauOperande[0]
            if (operande1.length != 1){
                if (operande1[0] == "(" && operande1[operande1.length-1] == ")"){
                    this.AnalyserString(operande1,1, operande1.length-1);
                }
               if (operande1[0] == "¬" && operande1[1] == "(" && operande1[operande1.length-1] == ")"){
                    this.evalNegation(operande1, 2, operande1.length-1);
                }
            }
        }
    }

    evalEntreDeuxOperandes(operande1, operateur, operande2){
        let n = 0;
        switch (operateur[0]){
            case "∧":

                operande1 = operande1;
                operande2 = operande2;
                n = 1;
                break;
            case "∨":
                operande1 = operande1;
                operande2 = operande2;
                n = 2;
                break;
            case "→":
                if (operande1[0] == "¬"){
                    operande1 = operande1.substring(1);
                    operande2 = operande2;
                }
                else{
                    operande1 = "¬(" + operande1 + ")";
                    operande2 = operande2;
                }
                operateur = "∨";
                n = 2;
                break;
            case "↔":
                console.log("COUCOU");
                let caractere = operande1;
                operande1 = "(" + operande1 + "→" + operande2 + ")";
                operande2 = "(" + operande2 + "→" + caractere + ")";
                operateur = "∧"
                n = 1;
                break;
            default:
                alert("Un des caractère n'est pas un utilisé en logique des propositions !");
        }
        return operande1 + operateur + operande2;
    }

    evalNegation(StringADonner, debutString, finString) {
        let doubleImpliqNega = false;
        let caractere = "";
        this.AnalyserString(StringADonner, debutString, finString);
        for (let i = 0; i < this.tableauOperande.length; i++) {
            let operande = this.tableauOperande[i];

            if (operande[0] == "∧"){
                this.tableauOperande[i] = "∨";
            }
            else if (operande[0] == "∨"){
                this.tableauOperande[i] = "∧";
            }
            else if (operande[0] == "→"){
                let operandePrecedente = this.tableauOperande[i-1];
                if (operandePrecedente[0] == "¬"){
                    this.tableauOperande[i-1] = this.tableauOperande[i-1].substring(1);
                }
                else {
                    this.tableauOperande[i-1] = "¬" + this.tableauOperande[i-1];
                }
                this.tableauOperande[i] = "∧";

            }
            else if (operande[0] == "↔"){
                this.tableauOperande[i] = "∨";
                 caractere = this.tableauOperande[i-1].substring(1);
                this.tableauOperande[i-1] = "¬(" + caractere + "→" + this.tableauOperande[i+1] + ")";
                doubleImpliqNega = true;
            }
            else if (doubleImpliqNega){
                this.tableauOperande[i] = "¬(" + this.tableauOperande[i] + "→" + caractere + ")";
                doubleImpliqNega = false;
            }
            else if (operande[0] == "¬"){
                this.tableauOperande[i] = this.tableauOperande[i].substring(1);
            }
            else {
                this.tableauOperande[i] = "¬" + this.tableauOperande[i];
            }
        }
    }

}