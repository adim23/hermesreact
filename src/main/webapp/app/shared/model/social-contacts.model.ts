import { ISocialKinds } from 'app/shared/model/social-kinds.model';
import { IContactTypes } from 'app/shared/model/contact-types.model';
import { ICitizens } from 'app/shared/model/citizens.model';

export interface ISocialContacts {
  id?: number;
  name?: string;
  favored?: boolean | null;
  social?: ISocialKinds | null;
  kind?: IContactTypes | null;
  citizen?: ICitizens | null;
}

export const defaultValue: Readonly<ISocialContacts> = {
  favored: false,
};
