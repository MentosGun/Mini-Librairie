
export function getNonVideValue (input: HTMLInputElement): false|string {
    const valeur: string = input.value;

    if (valeur === "" || valeur === null || valeur === undefined) {
        return false;
    }

    return valeur;
}
