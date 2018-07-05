import {BoiteAllumette} from "../entity/boite-allumettes";
import {ListeJoueurs} from "./liste-joueur";
import {BoiteAllumetteController} from "./boite-allumette-controller";
import {Joueur} from "../entity/joueur";

export class Partie {
    private boite: BoiteAllumette = null;
    private startBtn: HTMLButtonElement;
    private choixAllumettesContainer: HTMLDivElement;

    constructor(htmlElement: HTMLElement, private listeJoueurs: ListeJoueurs, private boiteCtrl: BoiteAllumetteController) {
        this.startBtn = htmlElement.querySelector<HTMLButtonElement>('#start-jeu');
        this.choixAllumettesContainer = htmlElement.querySelector<HTMLDivElement>('#choix-allumettes');

        this.startBtn.onclick = () => {
            if (!listeJoueurs.peutDemarrer()) {
                alert('Pas assez de joueurs (min 2).');
            } else {
                this.boite = boiteCtrl.remplirBoite();

                if (this.boite !== null) {
                    this.startPartie();
                }
            }
        };
    }

    public startPartie(): void {
        this.listeJoueurs.desactiver();
        this.boiteCtrl.desactiver();
        this.startBtn.classList.add('masquer');
        this.choixAllumettesContainer.classList.remove('masquer');

        this.listeJoueurs.initListe();

        this.executerTour();
    }

    public stopPartie(): void {
        this.listeJoueurs.activer();
        this.boiteCtrl.activer();
        this.startBtn.classList.remove('masquer');
        this.choixAllumettesContainer.classList.add('masquer');
    }

    public executerTour(): void {
        const joueur: Joueur = this.listeJoueurs.getJoueurCourant();
        const afficheurNom: HTMLSpanElement = this.choixAllumettesContainer.querySelector<HTMLSpanElement>('#nom-joueur-enlever');
        const btnEnleve: HTMLButtonElement = this.choixAllumettesContainer.querySelector<HTMLButtonElement>('#btn-enlever-allumettes');

        afficheurNom.innerHTML = joueur.name;

        btnEnleve.onclick = () => {
            if (joueur.prendreAllumettes(this.boite)) {
                if (this.boite.estVide()) {
                    this.stopPartie();
                    alert(joueur.name + ' a perdu');
                } else {
                    this.listeJoueurs.passeAuJoueurSuivant();
                    this.executerTour();
                }
            }
        };
    }
}
