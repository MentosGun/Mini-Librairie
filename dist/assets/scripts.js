(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boite_allumettes_1 = require("../entity/boite-allumettes");
var utils_1 = require("../utils");
var BoiteAllumetteController = /** @class */ (function () {
    function BoiteAllumetteController(htmlElement) {
        this.nbInput = htmlElement.querySelector('#nb-allumettes');
    }
    BoiteAllumetteController.prototype.remplirBoite = function () {
        var nb = utils_1.getNonVideValue(this.nbInput);
        if (nb === false) {
            alert('Veuillez saisir un nombre d\'allumettes.');
        }
        else {
            var realNb = parseInt(nb);
            if (isNaN(realNb)) {
                alert('Nombre invalide.');
            }
            else if (realNb < 10) {
                alert('Veuillez saisir un nombre au minimum de 10.');
            }
            else {
                return new boite_allumettes_1.BoiteAllumette(realNb);
            }
        }
        return null;
    };
    BoiteAllumetteController.prototype.activer = function () {
        this.nbInput.removeAttribute('disabled');
    };
    BoiteAllumetteController.prototype.desactiver = function () {
        this.nbInput.setAttribute('disabled', 'disabled');
    };
    return BoiteAllumetteController;
}());
exports.BoiteAllumetteController = BoiteAllumetteController;
},{"../entity/boite-allumettes":4,"../utils":7}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joueur_1 = require("../entity/joueur");
var utils_1 = require("../utils");
var ListeJoueurs = /** @class */ (function () {
    function ListeJoueurs(htmlElement) {
        var _this = this;
        this.joueurs = [];
        this.indexJoueurCourant = 0;
        this.htmlJoueurs = htmlElement.querySelector('ul');
        this.ajoutBtn = htmlElement.querySelector('#joueur-ajout');
        this.nomInput = htmlElement.querySelector('#joueur-nom');
        this.ajoutBtn.onclick = function () {
            var nom = utils_1.getNonVideValue(_this.nomInput);
            if (nom === false) {
                alert('Veuillez saisir un nom de joueur.');
            }
            else {
                _this.ajoutJoueur(nom);
                _this.nomInput.value = '';
            }
        };
        this.nomInput.onkeyup = function (e) {
            if (e.code === 'Enter') {
                _this.ajoutBtn.onclick(new MouseEvent('ajout-joueur'));
            }
        };
    }
    ListeJoueurs.prototype.ajoutJoueur = function (nom) {
        // Création de l'objet joueur.
        this.joueurs.push(new joueur_1.Joueur(nom));
        // Création de la balise HTML li pour afficher l'utilisateur.
        var htmlJoueur = document.createElement('li');
        htmlJoueur.className = 'list-group-item d-flex justify-content-between align-items-center';
        htmlJoueur.innerHTML = nom;
        // Ajout de la balise li dans la liste HTML.
        this.htmlJoueurs.appendChild(htmlJoueur);
        return true;
    };
    ListeJoueurs.prototype.peutDemarrer = function () {
        return this.joueurs.length > 1;
    };
    ListeJoueurs.prototype.getJoueurCourant = function () {
        return this.joueurs[this.indexJoueurCourant];
    };
    ListeJoueurs.prototype.passeAuJoueurSuivant = function () {
        this.indexJoueurCourant++;
        if (this.indexJoueurCourant >= this.joueurs.length) {
            this.indexJoueurCourant = 0;
        }
    };
    ListeJoueurs.prototype.activer = function () {
        this.ajoutBtn.removeAttribute('disabled');
        this.nomInput.removeAttribute('disabled');
    };
    ListeJoueurs.prototype.desactiver = function () {
        this.ajoutBtn.setAttribute('disabled', 'disabled');
        this.nomInput.setAttribute('disabled', 'disabled');
    };
    ListeJoueurs.prototype.initListe = function () {
        this.indexJoueurCourant = 0;
    };
    return ListeJoueurs;
}());
exports.ListeJoueurs = ListeJoueurs;
},{"../entity/joueur":5,"../utils":7}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Partie = /** @class */ (function () {
    function Partie(htmlElement, listeJoueurs, boiteCtrl) {
        var _this = this;
        this.listeJoueurs = listeJoueurs;
        this.boiteCtrl = boiteCtrl;
        this.boite = null;
        this.startBtn = htmlElement.querySelector('#start-jeu');
        this.choixAllumettesContainer = htmlElement.querySelector('#choix-allumettes');
        this.startBtn.onclick = function () {
            if (!listeJoueurs.peutDemarrer()) {
                alert('Pas assez de joueurs (min 2).');
            }
            else {
                _this.boite = boiteCtrl.remplirBoite();
                if (_this.boite !== null) {
                    _this.startPartie();
                }
            }
        };
    }
    Partie.prototype.startPartie = function () {
        this.listeJoueurs.desactiver();
        this.boiteCtrl.desactiver();
        this.startBtn.classList.add('masquer');
        this.choixAllumettesContainer.classList.remove('masquer');
        this.listeJoueurs.initListe();
        this.executerTour();
    };
    Partie.prototype.stopPartie = function () {
        this.listeJoueurs.activer();
        this.boiteCtrl.activer();
        this.startBtn.classList.remove('masquer');
        this.choixAllumettesContainer.classList.add('masquer');
    };
    Partie.prototype.executerTour = function () {
        var _this = this;
        var joueur = this.listeJoueurs.getJoueurCourant();
        var afficheurNom = this.choixAllumettesContainer.querySelector('#nom-joueur-enlever');
        var btnEnleve = this.choixAllumettesContainer.querySelector('#btn-enlever-allumettes');
        afficheurNom.innerHTML = joueur.name;
        btnEnleve.onclick = function () {
            if (joueur.prendreAllumettes(_this.boite)) {
                if (_this.boite.estVide()) {
                    _this.stopPartie();
                    alert(joueur.name + ' a perdu');
                }
                else {
                    _this.listeJoueurs.passeAuJoueurSuivant();
                    _this.executerTour();
                }
            }
        };
    };
    return Partie;
}());
exports.Partie = Partie;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoiteAllumette = /** @class */ (function () {
    function BoiteAllumette(_nbAllumettes) {
        this._nbAllumettes = _nbAllumettes;
    }
    BoiteAllumette.prototype.estVide = function () {
        return this._nbAllumettes === 0;
    };
    BoiteAllumette.prototype.enleverAllumettes = function (nb) {
        this._nbAllumettes = this._nbAllumettes - nb;
        if (this._nbAllumettes < 0) {
            this._nbAllumettes = 0;
        }
        var inputNbAllumettes = document.querySelector('#nb-allumettes');
        inputNbAllumettes.value = this._nbAllumettes.toString();
    };
    Object.defineProperty(BoiteAllumette.prototype, "nbAllumettes", {
        get: function () {
            return this._nbAllumettes;
        },
        enumerable: true,
        configurable: true
    });
    return BoiteAllumette;
}());
exports.BoiteAllumette = BoiteAllumette;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joueur = /** @class */ (function () {
    function Joueur(_name) {
        this._name = _name;
    }
    Joueur.prototype.prendreAllumettes = function (boite) {
        var inputChoisi = document.querySelector('input:checked');
        if (inputChoisi === null) {
            alert("Choisir un nombre");
            return false;
        }
        boite.enleverAllumettes(Number(inputChoisi.value));
        return true;
    };
    Object.defineProperty(Joueur.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return Joueur;
}());
exports.Joueur = Joueur;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var liste_joueur_1 = require("./controller/liste-joueur");
var boite_allumette_controller_1 = require("./controller/boite-allumette-controller");
var partie_1 = require("./controller/partie");
var objectAssign = require("object-assign");
var listeJoueurs = new liste_joueur_1.ListeJoueurs(document.querySelector('#liste-joueurs'));
var boiteCtrl = new boite_allumette_controller_1.BoiteAllumetteController(document.querySelector('#boite-allumettes'));
var partie = new partie_1.Partie(document.querySelector('#partie'), listeJoueurs, boiteCtrl);
console.log('Bonjour');
var Foo = /** @class */ (function () {
    function Foo() {
        this.bar = 42;
        this.foo = 'tsnm';
    }
    Foo.prototype.getFoo = function () {
        console.log('Coucou');
    };
    return Foo;
}());
var monObjet = {
    bar: 42,
    foo: 'srrn',
    getFoo: function () {
        console.log('Coucou');
    },
};
var Bar = /** @class */ (function () {
    function Bar() {
        this._toto = 60;
    }
    Object.defineProperty(Bar.prototype, "toto", {
        get: function () {
            return this._toto;
        },
        enumerable: true,
        configurable: true
    });
    return Bar;
}());
var monBar = new Bar();
var monFoo = new Foo();
console.log(monBar);
console.log(monFoo);
var monSuperObjet = objectAssign({}, monBar, monFoo);
console.log(monSuperObjet);
},{"./controller/boite-allumette-controller":1,"./controller/liste-joueur":2,"./controller/partie":3,"object-assign":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNonVideValue(input) {
    var valeur = input.value;
    if (valeur === "" || valeur === null || valeur === undefined) {
        return false;
    }
    return valeur;
}
exports.getNonVideValue = getNonVideValue;
},{}],8:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc2NyaXB0cy9jb250cm9sbGVyL2JvaXRlLWFsbHVtZXR0ZS1jb250cm9sbGVyLnRzIiwiYXNzZXRzL3NjcmlwdHMvY29udHJvbGxlci9saXN0ZS1qb3VldXIudHMiLCJhc3NldHMvc2NyaXB0cy9jb250cm9sbGVyL3BhcnRpZS50cyIsImFzc2V0cy9zY3JpcHRzL2VudGl0eS9ib2l0ZS1hbGx1bWV0dGVzLnRzIiwiYXNzZXRzL3NjcmlwdHMvZW50aXR5L2pvdWV1ci50cyIsImFzc2V0cy9zY3JpcHRzL21haW4udHMiLCJhc3NldHMvc2NyaXB0cy91dGlscy50cyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSwrREFBMEQ7QUFDMUQsa0NBQXlDO0FBRXpDO0lBR0ksa0NBQVksV0FBd0I7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFtQixnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFTSwrQ0FBWSxHQUFuQjtRQUNJLElBQU0sRUFBRSxHQUFpQix1QkFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2RCxJQUFJLEVBQUUsS0FBSyxLQUFLLEVBQUU7WUFDZCxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUNyRDthQUFNO1lBQ0gsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTFCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNmLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQzdCO2lCQUFNLElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRTtnQkFDcEIsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7YUFDdkQ7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLGlDQUFjLENBQUMsTUFB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7Qm9pdGVBbGx1bWV0dGV9IGZyb20gXCIuLi9lbnRpdHkvYm9pdGUtYWxsdW1ldHRlc1wiO1xyXG5pbXBvcnQge2dldE5vblZpZGVWYWx1ZX0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9pdGVBbGx1bWV0dGVDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgbmJJbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihodG1sRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLm5iSW5wdXQgPSBodG1sRWxlbWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KCcjbmItYWxsdW1ldHRlcycpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1wbGlyQm9pdGUoKTogbnVsbHxCb2l0ZUFsbHVtZXR0ZSB7XHJcbiAgICAgICAgY29uc3QgbmI6IGZhbHNlfHN0cmluZyA9IGdldE5vblZpZGVWYWx1ZSh0aGlzLm5iSW5wdXQpO1xyXG5cclxuICAgICAgICBpZiAobmIgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdWZXVpbGxleiBzYWlzaXIgdW4gbm9tYnJlIGRcXCdhbGx1bWV0dGVzLicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZWFsTmIgPSBwYXJzZUludChuYik7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNOYU4ocmVhbE5iKSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ05vbWJyZSBpbnZhbGlkZS4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZWFsTmIgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1ZldWlsbGV6IHNhaXNpciB1biBub21icmUgYXUgbWluaW11bSBkZSAxMC4nKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCb2l0ZUFsbHVtZXR0ZShyZWFsTmIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWN0aXZlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5iSW5wdXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXNhY3RpdmVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmJJbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtKb3VldXJ9IGZyb20gXCIuLi9lbnRpdHkvam91ZXVyXCI7XHJcbmltcG9ydCB7Z2V0Tm9uVmlkZVZhbHVlfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMaXN0ZUpvdWV1cnMge1xyXG4gICAgcHJpdmF0ZSBqb3VldXJzOiBBcnJheTxKb3VldXI+ID0gW107XHJcbiAgICBwcml2YXRlIGh0bWxKb3VldXJzOiBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBham91dEJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIG5vbUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBpbmRleEpvdWV1ckNvdXJhbnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaHRtbEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5odG1sSm91ZXVycyA9IGh0bWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFVMaXN0RWxlbWVudD4oJ3VsJyk7XHJcbiAgICAgICAgdGhpcy5ham91dEJ0biA9IGh0bWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KCcjam91ZXVyLWFqb3V0Jyk7XHJcbiAgICAgICAgdGhpcy5ub21JbnB1dCA9IGh0bWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oJyNqb3VldXItbm9tJyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWpvdXRCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgbm9tOiBmYWxzZXxzdHJpbmcgPSBnZXROb25WaWRlVmFsdWUodGhpcy5ub21JbnB1dCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobm9tID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1ZldWlsbGV6IHNhaXNpciB1biBub20gZGUgam91ZXVyLicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ham91dEpvdWV1cihub20pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub21JbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5ub21JbnB1dC5vbmtleXVwID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ham91dEJ0bi5vbmNsaWNrKG5ldyBNb3VzZUV2ZW50KCdham91dC1qb3VldXInKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBham91dEpvdWV1cihub206IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIENyw6lhdGlvbiBkZSBsJ29iamV0IGpvdWV1ci5cclxuICAgICAgICB0aGlzLmpvdWV1cnMucHVzaChuZXcgSm91ZXVyKG5vbSkpO1xyXG5cclxuICAgICAgICAvLyBDcsOpYXRpb24gZGUgbGEgYmFsaXNlIEhUTUwgbGkgcG91ciBhZmZpY2hlciBsJ3V0aWxpc2F0ZXVyLlxyXG4gICAgICAgIGNvbnN0IGh0bWxKb3VldXI6IEhUTUxMSUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGh0bWxKb3VldXIuY2xhc3NOYW1lID0gJ2xpc3QtZ3JvdXAtaXRlbSBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gYWxpZ24taXRlbXMtY2VudGVyJztcclxuICAgICAgICBodG1sSm91ZXVyLmlubmVySFRNTCA9IG5vbTtcclxuXHJcbiAgICAgICAgLy8gQWpvdXQgZGUgbGEgYmFsaXNlIGxpIGRhbnMgbGEgbGlzdGUgSFRNTC5cclxuICAgICAgICB0aGlzLmh0bWxKb3VldXJzLmFwcGVuZENoaWxkKGh0bWxKb3VldXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGV1dERlbWFycmVyKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmpvdWV1cnMubGVuZ3RoID4gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Sm91ZXVyQ291cmFudCgpOiBKb3VldXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmpvdWV1cnNbdGhpcy5pbmRleEpvdWV1ckNvdXJhbnRdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXNzZUF1Sm91ZXVyU3VpdmFudCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluZGV4Sm91ZXVyQ291cmFudCsrO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pbmRleEpvdWV1ckNvdXJhbnQgPj0gdGhpcy5qb3VldXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4Sm91ZXVyQ291cmFudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY3RpdmVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWpvdXRCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIHRoaXMubm9tSW5wdXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXNhY3RpdmVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWpvdXRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgIHRoaXMubm9tSW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0TGlzdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbmRleEpvdWV1ckNvdXJhbnQgPSAwO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7Qm9pdGVBbGx1bWV0dGV9IGZyb20gXCIuLi9lbnRpdHkvYm9pdGUtYWxsdW1ldHRlc1wiO1xyXG5pbXBvcnQge0xpc3RlSm91ZXVyc30gZnJvbSBcIi4vbGlzdGUtam91ZXVyXCI7XHJcbmltcG9ydCB7Qm9pdGVBbGx1bWV0dGVDb250cm9sbGVyfSBmcm9tIFwiLi9ib2l0ZS1hbGx1bWV0dGUtY29udHJvbGxlclwiO1xyXG5pbXBvcnQge0pvdWV1cn0gZnJvbSBcIi4uL2VudGl0eS9qb3VldXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJ0aWUge1xyXG4gICAgcHJpdmF0ZSBib2l0ZTogQm9pdGVBbGx1bWV0dGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzdGFydEJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIGNob2l4QWxsdW1ldHRlc0NvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaHRtbEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwcml2YXRlIGxpc3RlSm91ZXVyczogTGlzdGVKb3VldXJzLCBwcml2YXRlIGJvaXRlQ3RybDogQm9pdGVBbGx1bWV0dGVDb250cm9sbGVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEJ0biA9IGh0bWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KCcjc3RhcnQtamV1Jyk7XHJcbiAgICAgICAgdGhpcy5jaG9peEFsbHVtZXR0ZXNDb250YWluZXIgPSBodG1sRWxlbWVudC5xdWVyeVNlbGVjdG9yPEhUTUxEaXZFbGVtZW50PignI2Nob2l4LWFsbHVtZXR0ZXMnKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWxpc3RlSm91ZXVycy5wZXV0RGVtYXJyZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1BhcyBhc3NleiBkZSBqb3VldXJzIChtaW4gMikuJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvaXRlID0gYm9pdGVDdHJsLnJlbXBsaXJCb2l0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJvaXRlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFBhcnRpZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRQYXJ0aWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZUpvdWV1cnMuZGVzYWN0aXZlcigpO1xyXG4gICAgICAgIHRoaXMuYm9pdGVDdHJsLmRlc2FjdGl2ZXIoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0QnRuLmNsYXNzTGlzdC5hZGQoJ21hc3F1ZXInKTtcclxuICAgICAgICB0aGlzLmNob2l4QWxsdW1ldHRlc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdtYXNxdWVyJyk7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVKb3VldXJzLmluaXRMaXN0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmV4ZWN1dGVyVG91cigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wUGFydGllKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdGVKb3VldXJzLmFjdGl2ZXIoKTtcclxuICAgICAgICB0aGlzLmJvaXRlQ3RybC5hY3RpdmVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdtYXNxdWVyJyk7XHJcbiAgICAgICAgdGhpcy5jaG9peEFsbHVtZXR0ZXNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbWFzcXVlcicpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlclRvdXIoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgam91ZXVyOiBKb3VldXIgPSB0aGlzLmxpc3RlSm91ZXVycy5nZXRKb3VldXJDb3VyYW50KCk7XHJcbiAgICAgICAgY29uc3QgYWZmaWNoZXVyTm9tOiBIVE1MU3BhbkVsZW1lbnQgPSB0aGlzLmNob2l4QWxsdW1ldHRlc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yPEhUTUxTcGFuRWxlbWVudD4oJyNub20tam91ZXVyLWVubGV2ZXInKTtcclxuICAgICAgICBjb25zdCBidG5FbmxldmU6IEhUTUxCdXR0b25FbGVtZW50ID0gdGhpcy5jaG9peEFsbHVtZXR0ZXNDb250YWluZXIucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oJyNidG4tZW5sZXZlci1hbGx1bWV0dGVzJyk7XHJcblxyXG4gICAgICAgIGFmZmljaGV1ck5vbS5pbm5lckhUTUwgPSBqb3VldXIubmFtZTtcclxuXHJcbiAgICAgICAgYnRuRW5sZXZlLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChqb3VldXIucHJlbmRyZUFsbHVtZXR0ZXModGhpcy5ib2l0ZSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJvaXRlLmVzdFZpZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcFBhcnRpZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGpvdWV1ci5uYW1lICsgJyBhIHBlcmR1Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdGVKb3VldXJzLnBhc3NlQXVKb3VldXJTdWl2YW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlclRvdXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEJvaXRlQWxsdW1ldHRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25iQWxsdW1ldHRlczogbnVtYmVyKSB7fVxyXG5cclxuICAgIHB1YmxpYyBlc3RWaWRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYkFsbHVtZXR0ZXMgPT09IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVubGV2ZXJBbGx1bWV0dGVzKG5iOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9uYkFsbHVtZXR0ZXMgPSB0aGlzLl9uYkFsbHVtZXR0ZXMgLSBuYjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX25iQWxsdW1ldHRlcyA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbmJBbGx1bWV0dGVzID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0TmJBbGx1bWV0dGVzOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PignI25iLWFsbHVtZXR0ZXMnKTtcclxuICAgICAgICBpbnB1dE5iQWxsdW1ldHRlcy52YWx1ZSA9IHRoaXMuX25iQWxsdW1ldHRlcy50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBuYkFsbHVtZXR0ZXMoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmJBbGx1bWV0dGVzO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtCb2l0ZUFsbHVtZXR0ZX0gZnJvbSBcIi4vYm9pdGUtYWxsdW1ldHRlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpvdWV1ciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uYW1lOiBzdHJpbmcpIHt9XHJcblxyXG4gICAgcHVibGljIHByZW5kcmVBbGx1bWV0dGVzKGJvaXRlOiBCb2l0ZUFsbHVtZXR0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGlucHV0Q2hvaXNpOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PignaW5wdXQ6Y2hlY2tlZCcpO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRDaG9pc2kgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJDaG9pc2lyIHVuIG5vbWJyZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYm9pdGUuZW5sZXZlckFsbHVtZXR0ZXMoTnVtYmVyKGlucHV0Q2hvaXNpLnZhbHVlKSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtMaXN0ZUpvdWV1cnN9IGZyb20gXCIuL2NvbnRyb2xsZXIvbGlzdGUtam91ZXVyXCI7XHJcbmltcG9ydCB7Qm9pdGVBbGx1bWV0dGVDb250cm9sbGVyfSBmcm9tIFwiLi9jb250cm9sbGVyL2JvaXRlLWFsbHVtZXR0ZS1jb250cm9sbGVyXCI7XHJcbmltcG9ydCB7UGFydGllfSBmcm9tIFwiLi9jb250cm9sbGVyL3BhcnRpZVwiO1xyXG5pbXBvcnQgKiBhcyBvYmplY3RBc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbic7XHJcblxyXG5jb25zdCBsaXN0ZUpvdWV1cnM6IExpc3RlSm91ZXVycyA9IG5ldyBMaXN0ZUpvdWV1cnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oJyNsaXN0ZS1qb3VldXJzJykpO1xyXG5jb25zdCBib2l0ZUN0cmw6IEJvaXRlQWxsdW1ldHRlQ29udHJvbGxlciA9IG5ldyBCb2l0ZUFsbHVtZXR0ZUNvbnRyb2xsZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oJyNib2l0ZS1hbGx1bWV0dGVzJykpO1xyXG5jb25zdCBwYXJ0aWU6IFBhcnRpZSA9IG5ldyBQYXJ0aWUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oJyNwYXJ0aWUnKSwgbGlzdGVKb3VldXJzLCBib2l0ZUN0cmwpO1xyXG5cclxuY29uc29sZS5sb2coJ0JvbmpvdXInKTtcclxuXHJcblxyXG5cclxuaW50ZXJmYWNlIE1vbkludGVyZmFjZSB7XHJcbiAgICBmb286IHN0cmluZztcclxuICAgIGJhcjogbnVtYmVyO1xyXG5cclxuICAgIGdldEZvbygpOiB2b2lkO1xyXG59XHJcblxyXG5jbGFzcyBGb28gaW1wbGVtZW50cyBNb25JbnRlcmZhY2Uge1xyXG4gICAgYmFyOiBudW1iZXIgPSA0MjtcclxuICAgIGZvbzogc3RyaW5nID0gJ3Rzbm0nO1xyXG5cclxuICAgIHB1YmxpYyBnZXRGb28oKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0NvdWNvdScpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtb25PYmpldDogTW9uSW50ZXJmYWNlID0ge1xyXG4gICAgYmFyOiA0MixcclxuICAgIGZvbzogJ3Nycm4nLFxyXG4gICAgZ2V0Rm9vOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0NvdWNvdScpO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmNsYXNzIEJhciB7XHJcbiAgICBwcml2YXRlIF90b3RvOiBudW1iZXIgPSA2MDtcclxuXHJcbiAgICBnZXQgdG90bygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b3RvO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtb25CYXIgPSBuZXcgQmFyKCk7XHJcbmNvbnN0IG1vbkZvbyA9IG5ldyBGb28oKTtcclxuXHJcbmNvbnNvbGUubG9nKG1vbkJhcik7XHJcbmNvbnNvbGUubG9nKG1vbkZvbyk7XHJcblxyXG5jb25zdCBtb25TdXBlck9iamV0OiBNb25JbnRlcmZhY2UmQmFyID0gb2JqZWN0QXNzaWduKHt9LCBtb25CYXIsIG1vbkZvbyk7XHJcblxyXG5jb25zb2xlLmxvZyhtb25TdXBlck9iamV0KTtcclxuIiwiXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROb25WaWRlVmFsdWUgKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KTogZmFsc2V8c3RyaW5nIHtcclxuICAgIGNvbnN0IHZhbGV1cjogc3RyaW5nID0gaW5wdXQudmFsdWU7XHJcblxyXG4gICAgaWYgKHZhbGV1ciA9PT0gXCJcIiB8fCB2YWxldXIgPT09IG51bGwgfHwgdmFsZXVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbGV1cjtcclxufVxyXG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIl19
