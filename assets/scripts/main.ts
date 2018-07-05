import {ListeJoueurs} from "./controller/liste-joueur";
import {BoiteAllumetteController} from "./controller/boite-allumette-controller";
import {Partie} from "./controller/partie";
import * as objectAssign from 'object-assign';

const listeJoueurs: ListeJoueurs = new ListeJoueurs(document.querySelector<HTMLDivElement>('#liste-joueurs'));
const boiteCtrl: BoiteAllumetteController = new BoiteAllumetteController(document.querySelector<HTMLDivElement>('#boite-allumettes'));
const partie: Partie = new Partie(document.querySelector<HTMLDivElement>('#partie'), listeJoueurs, boiteCtrl);

console.log('Bonjour');



interface MonInterface<T> {
    foo: string;
    bar: number;

    getFoo(): T;
}

class Bar {
    private _toto: number = 60;

    get toto(): number {
        return this._toto;
    }
}

class Foo implements MonInterface<Bar> {
    bar: number = 42;
    foo: string = 'tsnm';

    public getFoo(): Bar {
        console.log('Coucou');

        return new Bar();
    }
}

const monObjet: MonInterface = {
    bar: 42,
    foo: 'srrn',
    getFoo: () => {
        console.log('Coucou');
    },
};



const monBar = new Bar();
const monFoo = new Foo();

console.log(monBar);
console.log(monFoo);

const monSuperObjet: MonInterface&Bar = objectAssign({}, monBar, monFoo);

console.log(monSuperObjet);
