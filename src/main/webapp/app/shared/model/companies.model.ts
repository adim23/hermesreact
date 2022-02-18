import { ICompanyKinds } from 'app/shared/model/company-kinds.model';
import { IPhones } from 'app/shared/model/phones.model';
import { IAddresses } from 'app/shared/model/addresses.model';

export interface ICompanies {
  id?: number;
  name?: string;
  kind?: ICompanyKinds | null;
  phones?: IPhones[] | null;
  addresses?: IAddresses[] | null;
}

export const defaultValue: Readonly<ICompanies> = {};
