export interface Room{
    _id: string;
    name: string;
    theme?: string;
    private?: boolean;
    participants: string[] | string;
    admins?: string[] | string;
    joinRequest?: string[] | string;
    created?: Date;
    type?: string;
    join?: boolean;
  };