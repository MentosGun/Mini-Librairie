"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./entity/User");
exports.User = User_1.User;
var Room_1 = require("./entity/Room");
exports.Room = Room_1.Room;
var Message_1 = require("./entity/Message");
exports.Message = Message_1.Message;
var UserRepository_1 = require("./repository/UserRepository");
exports.UserRepository = UserRepository_1.UserRepository;
var Config_1 = require("./Config");
exports.Config = Config_1.Config;
// Dirty Examples
/* const config = new Config('http://192.168.1.54:8080');
config.token = 'TOKEN';

const repo = new UserRepository();

repo.find().then((users: User[]) => {
  console.log(users);
});

repo.create({
  username: 'super-test',
  password: 'super-test',
}).then((user:User) => {
  console.log(user);
}); */
