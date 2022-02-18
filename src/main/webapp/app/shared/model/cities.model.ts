import { ICountries } from 'app/shared/model/countries.model';
import { IRegions } from 'app/shared/model/regions.model';

export interface ICities {
  id?: number;
  name?: string;
  president?: string | null;
  presidentsPhone?: string | null;
  secretary?: string | null;
  secretarysPhone?: string | null;
  police?: string | null;
  policesPhone?: string | null;
  doctor?: string | null;
  doctorsPhone?: string | null;
  teacher?: string | null;
  teachersPhone?: string | null;
  priest?: string | null;
  priestsPhone?: string | null;
  country?: ICountries;
  region?: IRegions;
}

export const defaultValue: Readonly<ICities> = {};
