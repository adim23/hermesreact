import { ICitizens } from 'app/shared/model/citizens.model';

export interface ICitizensRelations {
  id?: number;
  name?: string;
  citizen?: ICitizens | null;
}

export const defaultValue: Readonly<ICitizensRelations> = {};
