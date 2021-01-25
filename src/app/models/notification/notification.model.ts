export interface Notification {
    title: string;
    description: string;
    read: boolean;
    type: string;
    create: Date;
    _id?: string;
};