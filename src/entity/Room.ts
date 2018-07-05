import {User} from "./User";

export class Room {
  id: number;
  name: string;
  language: string;
  sizeMax: number;

  users: User[];
}
