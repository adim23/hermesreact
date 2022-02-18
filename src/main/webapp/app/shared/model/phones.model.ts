import { IPhoneTypes } from 'app/shared/model/phone-types.model';
import { ICompanies } from 'app/shared/model/companies.model';
import { ICitizens } from 'app/shared/model/citizens.model';

export interface IPhones {
  id?: number;
  phone?: string;
  description?: string | null;
  favourite?: boolean | null;
  kind?: IPhoneTypes | null;
  company?: ICompanies | null;
  citizen?: ICitizens | null;
}

export const defaultValue: Readonly<IPhones> = {
  favourite: false,
};
