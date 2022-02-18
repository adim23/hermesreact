import { IContactTypes } from 'app/shared/model/contact-types.model';
import { ICitizens } from 'app/shared/model/citizens.model';

export interface IEmails {
  id?: number;
  email?: string;
  description?: string | null;
  favourite?: boolean | null;
  kind?: IContactTypes | null;
  citizen?: ICitizens | null;
}

export const defaultValue: Readonly<IEmails> = {
  favourite: false,
};
