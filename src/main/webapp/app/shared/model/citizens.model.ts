import dayjs from 'dayjs';
import { ICitizenFolders } from 'app/shared/model/citizen-folders.model';
import { ICompanies } from 'app/shared/model/companies.model';
import { IMaritalStatus } from 'app/shared/model/marital-status.model';
import { ITeams } from 'app/shared/model/teams.model';
import { ICodes } from 'app/shared/model/codes.model';
import { IOrigins } from 'app/shared/model/origins.model';
import { IJobs } from 'app/shared/model/jobs.model';
import { IPhones } from 'app/shared/model/phones.model';
import { IAddresses } from 'app/shared/model/addresses.model';
import { ISocialContacts } from 'app/shared/model/social-contacts.model';
import { IEmails } from 'app/shared/model/emails.model';
import { ICitizensRelations } from 'app/shared/model/citizens-relations.model';

export interface ICitizens {
  id?: number;
  title?: string | null;
  lastname?: string | null;
  firstname?: string | null;
  fathersName?: string | null;
  comments?: string | null;
  birthDate?: string | null;
  giortazi?: string | null;
  male?: boolean | null;
  meLetter?: number | null;
  meLabel?: number | null;
  imageContentType?: string | null;
  image?: string | null;
  folder?: ICitizenFolders | null;
  company?: ICompanies | null;
  maritalStatus?: IMaritalStatus | null;
  team?: ITeams | null;
  code?: ICodes | null;
  origin?: IOrigins | null;
  job?: IJobs | null;
  phones?: IPhones[] | null;
  addresses?: IAddresses[] | null;
  socials?: ISocialContacts[] | null;
  emails?: IEmails[] | null;
  relations?: ICitizensRelations[] | null;
}

export const defaultValue: Readonly<ICitizens> = {
  male: false,
};
