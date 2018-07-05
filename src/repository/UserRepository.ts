import {User} from "../entity/User";

export class UserRepository {
  find(): Promise<User[]> {
    return fetch('http://192.168.1.54:8080/api/users', {
      headers: {
        'Authorization': 'Bearer (TOKEN)'
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
    return fetch('http://192.168.1.54:8080/api/users', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer (TOKEN)',
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
