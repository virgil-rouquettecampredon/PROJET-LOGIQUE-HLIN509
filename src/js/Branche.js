class Branche {
    /**Contructeur d'une branche
     * @param pere : HTMLElement renseignant le pere de cette branche
     * @param contenu : HTMLElement renseignant le contennu de la branche
     * @param container : HTMLElement renseignant l'élément contenant la branche (pour un meilleur affichage)**/
    constructor(pere, contenu, container){
        this.pere = pere;
        this.contenu = contenu;
        this.container = container;
        this.fils = [];
    }
    /**Fonction permettant d'ajouter un fils à une branche
     * @param fils : Branche fils de this**/
    addFils(fils){
        //Ajout a la liste
        this.fils.push(fils);
        //Ajout du container du nouveau fils comme fils du container du pere
        this.container.append(fils.container);
    }

    /**Fonction permettant d'afficher les fils d'une branche**/
    afficherFils(){
        //Si la branche possède des fils :
        if(this.fils.length > 0){
            //Alors on peut afficher ses fils
            //On récupère la branche pere et son wrapper
            let pere_branche = this.contenu;
            let pere_wrapper = pere_branche.closest("."+TAGS.TAG_Wrapper);

            //On va ensuite récupérer la distance entre la branche pere par rapport au container du père
            let pere_distance_haut = pere_branche.offsetTop + pere_wrapper.offsetTop;
            //Distance entre bas branche pere et container pere
            pere_distance_haut = pere_distance_haut - pere_branche.offsetHeight;
            //Distance entre pere et container pere par la droite
            let pere_distance_droite = pere_branche.offsetLeft + pere_wrapper.offsetLeft + pere_branche.offsetWidth/2;


            //Pour cela, On cré un canvas 2D sur lequel on va générer un trait
            let canvas2D = document.createElement("canvas");
            //On va donner comme classe le tag de dessin
            canvas2D.classList.add(TAGS.TAG_dessinLiaison);
            //Et une taille en px équivalente à celle du container de this
            canvas2D.style.width = this.container.offsetWidth + "px";
            //Ce canvas sera en position absolute par rapport au container de this, soit placé sous la branche pere
            canvas2D.style.top = pere_distance_haut + "px";
            canvas2D.style.left = "0px";
            let ctxDessin = canvas2D.getContext("2d");

            let hauteur_canvas2D = 0;

            //Pour générer un trait, il faut avant tout récupérer les coordonnées de ses deux points extrémités
            //Ainsi, pour chaque fils présents, on va récupérer les coordonnées du milieu-haut de  l'emplacement de leur branche
            for (let i = 0; i < this.fils.length; i++) {
                //On récupère son élément HTML (sa branche)
                let fils_branche = this.fils[i].contenu;
                //Cette branche est contnu dans un wrapper
                let fils_wrapper = fils_branche.closest("."+ TAGS.TAG_Wrapper);
                //wrapper lui meme contenu dans un container
                let fils_container = this.fils[i].container;
                //On va ensuite récupérer la distance entre la branche fils par rapport au container du père
                let fils_distance_haut = fils_branche.offsetTop + fils_wrapper.offsetTop + fils_container.offsetTop;

                //On a les coordonnées y de nos deux points pour faire notre trait : p1[?,pere_distance_haut], p2[?,fils_distance_haut]
                //On va ensuite récupérer les coordonnées x de nos deux points
                let fils_distance_droite = fils_branche.offsetLeft + fils_wrapper.offsetLeft + fils_container.offsetLeft + fils_branche.offsetWidth/2;
                //On a ainsi nos deux points en p1[pere_distance_droite,pere_distance_haut], p2[fils_distance_droite,fils_distance_haut]

                //Hauteur du canvas de dessin, en fonction de la position des branches fils
                if(fils_distance_haut-pere_distance_haut>hauteur_canvas2D){
                    hauteur_canvas2D = fils_distance_haut-pere_distance_haut;
                }
                //On peut donc dessiner
                ctxDessin.beginPath();
                //0 car le canvas démare en bas de la branche pere, soit à une distance y de 0
                ctxDessin.moveTo(pere_distance_droite,0);
                ctxDessin.lineTo(fils_distance_droite,hauteur_canvas2D);
                ctxDessin.stroke();
                ctxDessin.closePath();
            }
            canvas2D.style.height = hauteur_canvas2D + "px";
            //On va placer cle canvas dans le container du pere des enfants, donc this
            this.container.append(canvas2D);
        }else{
            console.log(this);
            console.log("Cette branche n'a pas de fils !");
        }

    }
}