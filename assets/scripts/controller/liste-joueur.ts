import {Joueur} from "../entity/joueur";
import {getNonVideValue} from "../utils";

export class ListeJoueurs {
    private joueurs: Array<Joueur> = [];
    private htmlJoueurs: HTMLUListElement;
    private ajoutBtn: HTMLButtonElement;
    private nomInput: HTMLInputElement;
    private indexJoueurCourant: number = 0;

    constructor(htmlElement: HTMLElement) {
        this.htmlJoueurs = htmlElement.querySelector<HTMLUListElement>('ul');
        this.ajoutBtn = htmlElement.querySelector<HTMLButtonElement>('#joueur-ajout');
        this.nomInput = htmlElement.querySelector<HTMLInputElement>('#joueur-nom');

        this.ajoutBtn.onclick = () => {
            const nom: false|string = getNonVideValue(this.nomInput);

            if (nom === false) {
                alert('Veuillez saisir un nom de joueur.');
            } else {
                this.ajoutJoueur(nom);
                this.nomInput.value = '';
            }
        };

        this.nomInput.onkeyup = (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                this.ajoutBtn.onclick(new MouseEvent('ajout-joueur'));
            }
        };
    }

    public ajoutJoueur(nom: string): boolean {
        // Création de l'objet joueur.
        this.joueurs.push(new Joueur(nom));

        // Création de la balise HTML li pour afficher l'utilisateur.
        const htmlJoueur: HTMLLIElement = document.createElement('li');
        htmlJoueur.className = 'list-group-item d-flex justify-content-between align-items-center';
        htmlJoueur.innerHTML = nom;

        // Ajout de la balise li dans la liste HTML.
        this.htmlJoueurs.appendChild(htmlJoueur);

        return true;
    }

    public peutDemarrer(): boolean {
        return this.joueurs.length > 1;
    }

    public getJoueurCourant(): Joueur {
        return this.joueurs[this.indexJoueurCourant];
    }

    public passeAuJoueurSuivant(): void {
        this.indexJoueurCourant++;

        if (this.indexJoueurCourant >= this.joueurs.length) {
            this.indexJoueurCourant = 0;
        }
    }

    public activer(): void {
        this.ajoutBtn.removeAttribute('disabled');
        this.nomInput.removeAttribute('disabled');
    }

    public desactiver(): void {
        this.ajoutBtn.setAttribute('disabled', 'disabled');
        this.nomInput.setAttribute('disabled', 'disabled');
    }

    public initListe(): void {
        this.indexJoueurCourant = 0;
    }
}
