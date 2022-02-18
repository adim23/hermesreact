import { ICountries } from 'app/shared/model/countries.model';
import { IRegions } from 'app/shared/model/regions.model';
import { ICities } from 'app/shared/model/cities.model';

export interface IZipCodes {
  id?: number;
  street?: string | null;
  area?: string | null;
  fromNumber?: string | null;
  toNumber?: string | null;
  country?: ICountries | null;
  region?: IRegions | null;
  city?: ICities | null;
}

export const defaultValue: Readonly<IZipCodes> = {};
