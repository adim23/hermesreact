import { ICountries } from 'app/shared/model/countries.model';

export interface IRegions {
  id?: number;
  name?: string;
  country?: ICountries;
}

export const defaultValue: Readonly<IRegions> = {};
