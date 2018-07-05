import {Room} from "./Room";
import {User} from "./User";

export class Message {
  id: number;
  content: string;
  createdAt: Date;

  user: User;
  room: Room;
}
