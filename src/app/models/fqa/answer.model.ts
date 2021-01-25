import { User } from '../user/user.model';
export interface Answer{
    question: string;
    answer: string;
    user: User;
    createAt?: string;
    _id?: string;
  };