export interface Employment {
  _id?: string;
  name: string;
  enterprise?: {
    role: string;
    _id: string;
    name: string;
    email?: string;
    descripcion?: string;
    photography?: string;
    domicile?: {
      street?: string;
      number?: number;
      colony?: string;
      municipality?: string;
      country?: string;
    }
  };
  salary: string;
  horary?: string;
  workable_days?: string;
  vacancy_numbers?: number;
  state: boolean;
  dateCreate?: Date;
  dateLimit?: Date | string;
  domicile?: string;
  description?: string;
  requeriments?: string;
  type?: string;
  total?: number;
};