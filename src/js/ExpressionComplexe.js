class ExpressionComplexe extends Expression{

    /**Constructeur d'une expression complexe :
     * @param operande1 : Expression renseignant la première expression complexe composant notre expression.
     * @param operande2 : Expression renseignant la seconde expression complexe composant notre expression.
     * @param operateur : String renseignant l'opératuer à applquer à nos deux expressions complexes.
     * **/
    constructor(operande1, operateur ,operande2 ) {
        super();
        this.operande1 = operande1;
        this.operande2 = operande2;
        this.operateur = operateur;
        this.n = 0;
        this.resultat1 = "";
        this.resultat2 = "";
    }

    evalEntreDeuxOperandes(){
        switch (this.operateur){
            case "∧":
                this.resultat1 = this.operande1;
                this.resultat2 = this.operande2;
                this.n = 1;
                break;
            case "∨":
                this.resultat1 = this.operande1;
                this.resultat2 = this.operande2;
                this.n = 2;
                break;
            case "→":
                this.resultat1 = "¬" + this.operande1;
                this.resultat2 = this.operande2;
                this.n = 2;
                break;
            case "↔":
                this.resultat1 = this.operande1 + "→" + this.operande2;
                this.resultat2 = this.operande2 + "→" + this.operande1;
                this.n = 1;
                break;
            default:
                alert("Un des caractère n'est pas un utilisé en logique des propositions !");
        }
    }

    evalNegation(){
        if (this.operateur == "¬"){

        }

    }
}


