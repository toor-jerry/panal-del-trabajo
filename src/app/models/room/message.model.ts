import { User} from '../user/user.model';

export interface Message{
  room: string;
  message: string;
  type: string;
  sender?: User;
  date?: Date;
  status?: string;
  _id?: string;
  _idTemp?: string;
  participants?: User[];
  contact?: User;
  imageTemp?: string | ArrayBuffer;
  fileName?: string;
  extFile?: string;
  joinRequest?: any[];
  };