import {User} from './entity/User';
import {Room} from './entity/Room';
import {Message} from './entity/Message';

import {UserRepository} from './repository/UserRepository';
import {Config} from './Config';

export {
  User,
  Message,
  Room,
  Config,

  UserRepository,
}

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
