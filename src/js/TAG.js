/**SCRIPT REGROUPANT TOUS LES TAG UTILISABLE DANS LE PROGRAMME**/
const TAGS = {
    /*============================
    * =======TAG ZONEDESSIN=======
    * ============================*/
    /*TAG des zones de dessin */                                            TAG_dessinLiaison: "liaison",
    /*============================
    * =======TAG EXPRESSION=======
    * ============================*/
    /*Tag à appliquer au expressions à traiter*/                            TAG_expressionComplexeATraiter: "expressionComplexeATraiter",
    /*Tag à appliquer au expressions qui ont été traitées*/                 TAG_expressionComplexeTraitee: "expressionComplexeTraitee",
//(et ne sont plus traitable par le joueur)
    /*Tag à appliquer aux expressions*/                                     TAG_expression: "expression",
    /*============================
    * ========TAG BRANCHES========
    * ============================*/
    /**TAG des branches encore traitables par le joueur : **/               TAG_BranchesATraiter : "BracheATraiter",
    /**TAG des branches déjà traitées par le joueur : **/                   TAG_BranchesTraitees : "BrancheTraitee",
    /**TAG des branches fermées par le joueur : **/                         TAG_BranchesFermees : "BrancheFermee",
    /**TAG des branches **/                                                 TAG_Branche : "Branche",
    /**TAG des branches fermable**/                                         TAG_BrancheFermable : "BrancheFermable",
    /**TAG des rangs des branches **/                                       TAG_RangBranche : "rang",/*DEPRECATED*/
    /**TAG des wrapper**/                                                   TAG_Wrapper : "wrapper",

    /*============================
    * ========TAG ORACLE =========
    * ============================*/
    /*TAG ID Pour l'arbre*/                                                 TAGID_Arbre : "Arbre",
    /*TAG ID Pour la zone ou rentrer la formule*/                           TAGID_Formule : "Formule",
    /*TAG ID Pour la zone ou rentrer le score final*/                       TAGID_Score : "Score",
    /*TAG ID Pour le bouton "OU"*/                                          TAGID_BTN_OU : "btn_ou",
    /*TAG ID Pour le bouton "ET"*/                                          TAGID_BTN_ET : "btn_et",
    /*TAG ID Pour le bouton "NON"*/                                         TAGID_BTN_NON : "btn_non",
    /*TAG ID Pour le bouton "IMP"*/                                         TAGID_BTN_IMP : "btn_imp",
    /*TAG ID Pour le bouton "EQ"*/                                          TAGID_BTN_EQ : "btn_eq",
    /*TAG ID Pour areaTXT*/                                                 TAGID_AREATXT : "area_exp",
    /*TAG ID Pour areaEROR d'expression*/                                   TAGID_AREAERR : "area_err",
    /*TAG ID Pour le bouton terminer*/                                      TAGID_BTN_END : "btn_end",
    /*TAG ID Pour areaEROR d'arbre*/                                        TAGID_AREAERR_END : "area_err_end",/*DEPRECATED*/
};
