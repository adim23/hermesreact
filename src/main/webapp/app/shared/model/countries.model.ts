export interface ICountries {
  id?: number;
  name?: string;
  iso?: string | null;
  language?: string | null;
  lang?: string | null;
}

export const defaultValue: Readonly<ICountries> = {};
