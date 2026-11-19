import { UserData } from "./User";

export interface Message {
  id: number;
  sendUser: UserData;
  receiveUser: UserData;
  date: Date;
  content: string;
}
