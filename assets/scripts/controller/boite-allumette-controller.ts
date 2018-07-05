import {BoiteAllumette} from "../entity/boite-allumettes";
import {getNonVideValue} from "../utils";

export class BoiteAllumetteController {
    private nbInput: HTMLInputElement;

    constructor(htmlElement: HTMLElement) {
        this.nbInput = htmlElement.querySelector<HTMLInputElement>('#nb-allumettes');
    }

    public remplirBoite(): null|BoiteAllumette {
        const nb: false|string = getNonVideValue(this.nbInput);

        if (nb === false) {
            alert('Veuillez saisir un nombre d\'allumettes.');
        } else {
            let realNb = parseInt(nb);

            if (isNaN(realNb)) {
                alert('Nombre invalide.');
            } else if (realNb < 10) {
                alert('Veuillez saisir un nombre au minimum de 10.')
            } else {
                return new BoiteAllumette(realNb);
            }
        }

        return null;
    }

    public activer(): void {
        this.nbInput.removeAttribute('disabled');
    }

    public desactiver(): void {
        this.nbInput.setAttribute('disabled', 'disabled');
    }
}
