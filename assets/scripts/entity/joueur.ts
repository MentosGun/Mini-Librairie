import {BoiteAllumette} from "./boite-allumettes";

export class Joueur {
    constructor(private _name: string) {}

    public prendreAllumettes(boite: BoiteAllumette): boolean {
        const inputChoisi: HTMLInputElement = document.querySelector<HTMLInputElement>('input:checked');

        if (inputChoisi === null) {
            alert("Choisir un nombre");
            return false;
        }

        boite.enleverAllumettes(Number(inputChoisi.value));

        return true;
    }

    get name(): string {
        return this._name;
    }
}
