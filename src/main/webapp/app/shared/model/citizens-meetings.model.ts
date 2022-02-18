import dayjs from 'dayjs';
import { ICitizens } from 'app/shared/model/citizens.model';

export interface ICitizensMeetings {
  id?: number;
  meetDate?: string;
  agenda?: string;
  comments?: string | null;
  amount?: number | null;
  quantity?: number | null;
  status?: string;
  flag?: boolean;
  citizen?: ICitizens | null;
}

export const defaultValue: Readonly<ICitizensMeetings> = {
  flag: false,
};
