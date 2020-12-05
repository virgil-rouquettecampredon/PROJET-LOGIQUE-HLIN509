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

            this.dessinerCanvas();
            //On récupère ensuite le canvas créé
            let canv = this.container.getElementsByClassName(TAGS.TAG_dessinLiaison)[0];
            let ctxDessin = canv.getContext("2d");

            let largeurPxCanvas = 300;
            let hauteurPxCanvas = 150;

            let intDeb = 1;
            while (intDeb<=this.fils.length*2){
                let curXB = largeurPxCanvas*intDeb/(this.fils.length*2);
                Branche.dessinerLiaison([[largeurPxCanvas/2,0],[curXB,hauteurPxCanvas]],ctxDessin);
                intDeb = intDeb + 2;
            }
        }else{
            console.log(this);
            console.log("Cette branche n'a pas de fils !");
        }

    }

    /**Fonction permettant de construire le canvas de dessin**/
    dessinerCanvas(){
        //On récupère la branche pere et son wrapper
        let pere_branche = this.contenu;
        let pere_wrapper = pere_branche.closest("."+TAGS.TAG_Wrapper);

        //On va ensuite récupérer la distance entre la branche pere par rapport au container du père
        let pere_distance_haut = pere_branche.offsetTop + pere_wrapper.offsetTop;
        //Distance entre bas branche pere et container pere
        pere_distance_haut = pere_distance_haut + pere_branche.offsetHeight;
        //Distance entre pere et container pere par la droite
        let pere_distance_droite = pere_branche.offsetLeft + pere_wrapper.offsetLeft + pere_branche.offsetWidth/2;

        //Pour cela, On créer un canvas 2D sur lequel on va générer un trait
        let canvas2D = document.createElement("canvas");
        //On va donner comme classe le tag de dessin
        canvas2D.classList.add(TAGS.TAG_dessinLiaison);
        //Et une taille en px équivalente à celle du container de this
        canvas2D.style.width = "100%";
        //Ce canvas sera en position absolute par rapport au container de this, soit placé sous la branche pere
        canvas2D.style.top = pere_distance_haut + "px";
        canvas2D.style.left = "0";
        canvas2D.style.right = "0";
        let hauteur_canvas2D = 0;

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
            //let fils_distance_droite = fils_branche.offsetLeft + fils_wrapper.offsetLeft + fils_container.offsetLeft + fils_branche.offsetWidth/2;
            //On a ainsi nos deux points en p1[pere_distance_droite,pere_distance_haut], p2[fils_distance_droite,fils_distance_haut]

            //Hauteur du canvas de dessin, en fonction de la position des branches fils
            if(fils_distance_haut-pere_distance_haut>hauteur_canvas2D){
                hauteur_canvas2D = fils_distance_haut-pere_distance_haut;
            }

            //Valeurs des deux points extrèmités du trait à tracer
            //traits.push([[pere_distance_droite,0],[fils_distance_droite,hauteur_canvas2D]]);
            //traits.push([[100,100],[0,0]]);
        }

        canvas2D.style.height = hauteur_canvas2D + "px";
        //On va placer cle canvas dans le container du pere des enfants, donc this
        this.container.appendChild(canvas2D);
    }


    /**Fonction permettant de dessiner une liaison dans un canvas 2D
     * @param coords : [][] renseignant les coordonnées des points extrémitées du trait
     * @param context : CanvasRenderingContext2D ou dessiner*/
    static dessinerLiaison(coords, context){
        let epaisseur = 5;

        context.beginPath();
        context.fillStyle = "#544427";
        context.moveTo(coords[0][0]-epaisseur/2, coords[0][1]);
        context.lineTo(coords[1][0]-epaisseur/2, coords[1][1]);
        context.lineTo(coords[1][0]+epaisseur/2, coords[1][1]);
        context.lineTo(coords[0][0]+epaisseur/2, coords[0][1]);
        context.lineTo(coords[0][0]-epaisseur/2, coords[0][1]);
        context.fill();
        context.closePath();
    }
}

