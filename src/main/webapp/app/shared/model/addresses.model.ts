import { ICountries } from 'app/shared/model/countries.model';
import { IContactTypes } from 'app/shared/model/contact-types.model';
import { IRegions } from 'app/shared/model/regions.model';
import { ICompanies } from 'app/shared/model/companies.model';
import { ICitizens } from 'app/shared/model/citizens.model';

export interface IAddresses {
  id?: number;
  address?: string | null;
  addressNo?: string | null;
  zipCode?: string | null;
  prosfLetter?: string | null;
  nameLetter?: string | null;
  letterClose?: string | null;
  firstLabel?: string | null;
  secondLabel?: string | null;
  thirdLabel?: string | null;
  fourthLabel?: string | null;
  fifthLabel?: string | null;
  favourite?: boolean | null;
  country?: ICountries | null;
  kind?: IContactTypes | null;
  region?: IRegions | null;
  company?: ICompanies | null;
  citizen?: ICitizens | null;
}

export const defaultValue: Readonly<IAddresses> = {
  favourite: false,
};
