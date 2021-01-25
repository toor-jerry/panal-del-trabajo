import { User } from '../user/user.model';
import { Answer } from './answer.model';
export interface Question{
    _id: string;
    question: string;
    user: User;
    createAt: string;
    answers?: Answer[];
    totalAnswers?: number;
    from?: number;
    loading?: boolean;
  };