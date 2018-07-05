export class BoiteAllumette {
    constructor(private _nbAllumettes: number) {}

    public estVide(): boolean {
        return this._nbAllumettes === 0;
    }

    public enleverAllumettes(nb: number): void {
        this._nbAllumettes = this._nbAllumettes - nb;

        if (this._nbAllumettes < 0) {
            this._nbAllumettes = 0;
        }

        const inputNbAllumettes: HTMLInputElement = document.querySelector<HTMLInputElement>('#nb-allumettes');
        inputNbAllumettes.value = this._nbAllumettes.toString();
    }

    get nbAllumettes(): number {
        return this._nbAllumettes;
    }
}