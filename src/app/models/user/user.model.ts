import { Notification } from '../notification/notification.model';

export interface User {
  name: string;
  last_name?: string;
  user: string;
  email: string;
  password: string;
  role: string;
  connections: boolean;
  domicile?: {
    street: string;
    number: number;
    colony: string;
    municipality: string;
    country: string;
  };
  nacionality?: string;
  gender?: string;
  date_birth?: string;
  speciality?: string;
  professional_titles?: string;
  last_job?: string;
  description?: string;
  photography?: string;
  cv?: string;
  credential?: string;
  thumbnail_photography?: string;
  whatsapp: string;
  movil_phone: string;
  telephone: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube_channel?: string;
  blog_personal?: string;
  page_web?: string;
  location?: string;
  
  theme?: string;
  rfc?: string;
  google?: boolean;
  email_verified?: boolean;
  state?: boolean;
  contacts?: Contact[];
  conversations?: string[];
  _id?: string;
  token?: string;
  notifications?: Notification[];
  setions: number;
  chat?: string;
};

export interface Contact {
  _id: string;
  user: string;
  name: string;
  last_name?: string;
  email?: string;
  thumbnail_photography?: string;
};