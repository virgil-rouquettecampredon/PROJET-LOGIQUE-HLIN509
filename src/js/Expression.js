//SYMBOLES
//NON : ¬
//ET : ∧
//OU : ∨
//EQ : ↔
//IMP : →

class Expression {

    constructor(StringADonner) {
        this.estNegatif = false;
        this.StringADonner = StringADonner;
        this.operations = [];
    }

    estFBF(){
        let parantheseOuvrante = false;
        let nbParanthese = 0;
        let operateur = ["∧","∨","↔","→"];
        let paranthese = ["(",")"];
        let negation = ["¬"];
        let lettre= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        for (let i = 0; i < this.StringADonner.length; i++) {
            if (this.StringADonner[i] == ")"){
                nbParanthese--;
            }
            if ( !(lettre.includes(this.StringADonner[i]) || operateur.includes(this.StringADonner[i]) || paranthese.includes(this.StringADonner[i])|| negation.includes(this.StringADonner[i]))){     //caractere n'étant pas dans la logique des propositions
                console.log("autre caractere");
                return false;
            }
            if (this.StringADonner[i] == "("){
                parantheseOuvrante = true;
                nbParanthese++;
            }

            if (this.StringADonner[i] == ")" && !parantheseOuvrante){        // si la formule commence par ")"...
                console.log("ouvranteBegin");
                return false;
            }
            else if (this.StringADonner[i] == ")" && this.StringADonner[i-1] == "(" ){  // si on a une paranthese vide
                console.log("vide");
                return false;
            }
            if (i+1 != this.StringADonner.length) {
                if (operateur.includes(this.StringADonner[i]) && !(lettre.includes(this.StringADonner[i+1]) || this.StringADonner[i+1] == "(" || negation.includes(this.StringADonner[i+1]))){
                    console.log("operateur");
                    return false;
                }
                if (lettre.includes(this.StringADonner[i]) && !(operateur.includes(this.StringADonner[i+1]) || this.StringADonner[i+1] == ")")){
                    console.log("lettre");
                    return false;
                }
                if (negation.includes(this.StringADonner[i]) && !(lettre.includes(this.StringADonner[i+1]) || this.StringADonner[i+1] == "(")){
                    console.log("negation");
                    return false;
                }
                if (this.StringADonner[i] == "(" && !(lettre.includes(this.StringADonner[i+1]) || negation.includes(this.StringADonner[i+1]) || this.StringADonner[i+1] == "(")){
                    console.log("parantheseOuvrante");
                    return false;
                }
                if (this.StringADonner[i] == ")" && !(operateur.includes(this.StringADonner[i+1]) || this.StringADonner[i+1] == ")")){
                    console.log("parantheseFermante");
                    return false;
                }
            }      //A VERIFIER
        }
        console.log("nbParanthese");
        return nbParanthese === 0;      // si il y a nombre de paranthese ouvrante != paranthese fermante
    }

    //A dev plus
    estDeveloppable(){
        this.fortementParanthese();
        this.AnalyserString(0,this.StringADonner.length);
        return this.tableauOperande.length>=3;
    }

    AnalyserString(debutString,finString){
        let nbParanthese = 0;
        this.tableauOperande = [];
        let compteurTableau = 0;
        let debutOperande = debutString;
        for (let i = debutString; i < finString; i++) {
            while (this.StringADonner[i] == "¬"){
                if (this.estNegatif){
                    this.estNegatif = false;
                }
                if (!this.estNegatif){
                    this.estNegatif = true;
                }
                i++;
            }
            if (this.StringADonner[i] == "("){
                nbParanthese++;
            }
            if (this.StringADonner[i] == ")"){
                nbParanthese--;
            }
            if (nbParanthese == 0){
                let ope ="";
                if (this.estNegatif){
                    this.estNegatif = false;
                }
                for (let j = debutOperande; j <= i; j++) {
                    ope += this.StringADonner[j];
                }
                this.tableauOperande.push(ope);
                //console.log(this.tableauOperande[i]);
                compteurTableau++;
                debutOperande = i+1;
            }
        }
        if (this.tableauOperande.length === 1){
            this.StringADonner = this.tableauOperande[0]
            if (this.StringADonner.length != 1){
                if (this.StringADonner[0] == "(" && this.StringADonner[this.StringADonner.length-1] == ")"){
                    this.AnalyserString(1, this.StringADonner.length-1);
                }
               if (this.StringADonner[0] == "¬" && this.StringADonner[1] == "(" && this.StringADonner[this.StringADonner.length-1] == ")"){
                    this.evalNegation(2, this.StringADonner.length-1);
                }
            }
        }
    }

    evalEntreDeuxOperandes(operande1, operateur, operande2){
        let n = 0;
        operande1 = operande1.slice(1,operande1.length-1);
        operande2 = operande2.slice(1,operande2.length-1);

        switch (operateur[0]){
            case "∧":
                this.operations[0] = operande1;
                this.operations[1] = operande2;
                this.operations[2] = 1;
                break;
            case "∨":
                this.operations[0] = operande1;
                this.operations[1] = operande2;
                this.operations[2] = 2;
                break;
            case "→":
                if (operande1[0] == "¬"){
                    this.operations[0] = operande1.substring(1);
                    this.operations[1] = operande2;
                }
                else{
                    this.operations[0] = "¬(" + operande1 + ")";
                    this.operations[1] = operande2;
                }
                this.operations[2] = 2;
                break;
            case "↔":
                let caractere = operande1;
                this.operations[0] = operande1 + "→" + operande2;
                this.operations[1] = operande2 + "→" + caractere;
                this.operations[2] = 1;
                break;
            default:
                alert("Un des caractère n'est pas un utilisé en logique des propositions !");
        }
    }

    evalNegation(debutString, finString) {
        let doubleImpliqNega = false;
        let caractere = "";
        this.AnalyserString(debutString, finString);
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

    fortementParanthese(){
        this.AnalyserString(0, this.StringADonner.length);
        let stringResultante = "";
        let indice;
        let boolean = false;
        for (let i = 0; i < this.tableauOperande.length; i++) {
            let operateur = this.tableauOperande[i];
            if (operateur[0] == "↔"){
                boolean = true;
                indice = i;
            }
        }
        if (!boolean){
            for (let i = 0; i < this.tableauOperande.length; i++) {
                let operateur = this.tableauOperande[i];
                if (operateur[0] == "→"){
                    boolean = true;
                    indice = i;
                }
            }
        }
        if (!boolean){
            for (let i = 0; i < this.tableauOperande.length; i++) {
                let operateur = this.tableauOperande[i];
                if (operateur[0] == "∨"){
                    boolean = true;
                    indice = i;
                }
            }
        }
        if (!boolean){
            for (let i = 0; i < this.tableauOperande.length; i++) {
                let operateur = this.tableauOperande[i];
                if (operateur[0] == "∧"){
                    boolean = true;
                    indice = i;
                }
            }
        }
        stringResultante = "(";
        for (let i = 0; i <this.tableauOperande.length; i++) {
            if (indice == i){
                stringResultante += ")" +this.tableauOperande[i]+ "(";
            }
            else {
                stringResultante += this.tableauOperande[i];
            }
        }
        stringResultante += ")";
        boolean = false;
        this.StringADonner = stringResultante;
    }

}

//A FAIRE
//StringADonner = param d'objet Expression (constructor)
//Fonction estFBF