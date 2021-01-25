export interface MenuResponse{
    _id?: string;
    role: string;
    description: string;
    menu: ItemMenu[];
  };

export interface ItemMenu {
  icon?: string;
  img?: string;
  title: string;
  notifications?: boolean;
  classNotif?: string;
  notificationsMessages?: boolean;
  ruta?: string;
};