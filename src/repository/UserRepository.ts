export class UserRepositoy {
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
        objects.forEach((object) => {
          (Object as any).assign(object, new User());
        });

        return <User[]> objects;
      })
    ;
  }
}
