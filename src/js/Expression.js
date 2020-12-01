class Expression {

    constructor() {
        this.estNegatif = false;
    }

    AnalyserString(StringADonner, finString, debutString){
        let nbParanthese = 0;
        this.tableauOperande = [];
        let compteurTableau = 0;
        let debutOperande = debutString;
        for (let i = debutString; i < finString; i++) {
            if (StringADonner[i] == "("){
                nbParanthese++;
            }
            if (StringADonner[i] == ")"){
                nbParanthese--;
            }
            if (nbParanthese == 0){
                let ope ="";
                for (let j = debutOperande; j <= i; j++) {
                    ope += StringADonner[j];
                }
                this.tableauOperande.push(ope);
                console.log(this.tableauOperande[i]);
                compteurTableau++;
                debutOperande = i+1;
            }
        }
        if (this.tableauOperande.length === 1){
            let operande1 = this.tableauOperande[0]
            if (operande1.length != 1){
                if (operande1[0] == "(" && operande1[operande1.length-1] == ")"){
                    this.AnalyserString(operande1,operande1.length-1, 1);
                }
            }
        }
    }

}