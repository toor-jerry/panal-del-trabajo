import { User } from '../user/user.model';

export interface Chat {

    _id: string;
    private: boolean;
    type: string;
    participants: User;
    name?: string;
    theme?: string;
};