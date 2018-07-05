import {User} from "../entity/User";

export class UserRepository {

  private config: Config;

  constructor(config: Config) {
    this.config = config
  }
  find(): Promise<User[]> {
    return fetch(this.baseUrl + '/api/users', {
      headers: {
        'Authorization': 'Bearer ' + this.config.token,
      },
    })
      .then<User[]>((response: Response) => {
        return response.json();
      })
      .then<User[]>((objects: Object[]) => {
        const newArray: User[] = [];
        objects.forEach((object) => {
          newArray.push((Object as any).assign(new User(), object));
        });

        return newArray;
      })
    ;
  }

  // findOne(id: number)

  create(user: User): Promise<User> {
    return fetch(this.baseUrl + '/api/users', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.config.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then<Object[]>((response: Response) => {
        return response.json();
      })
      .then<User>((object: Object) => {
        return (Object as any).assign(new User(), object);
      })
    ;
  }
}
