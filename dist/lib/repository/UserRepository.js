"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../entity/User");
var UserRepository = /** @class */ (function () {
    function UserRepository(config) {
        this.config = config;
    }
    UserRepository.prototype.find = function () {
        return fetch(this.config.baseUrl + '/api/users', {
            headers: {
                'Authorization': 'Bearer ' + this.config.token,
            },
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (objects) {
            var newArray = [];
            objects.forEach(function (object) {
                newArray.push(Object.assign(new User_1.User(), object));
            });
            return newArray;
        });
    };
    // findOne(id: number)
    UserRepository.prototype.create = function (user) {
        return fetch(this.config.baseUrl + '/api/users', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.config.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (object) {
            return Object.assign(new User_1.User(), object);
        });
    };
    return UserRepository;
}());
exports.UserRepository = UserRepository;
