import {User} from './entity/User';
import {Room} from './entity/Room';
import {Message} from './entity/Message';

import {UserRepository} from './repository/UserRepository';

export {
  User,
  Message,
  Room,

  UserRepository,
}

const repo = new UserRepository();

repo.find().then((users: User[]) => {
  console.log(users);
});

repo.create({
  username: 'super-test',
  password: 'super-test',
}).then((user:User) => {
  console.log(user);
});
