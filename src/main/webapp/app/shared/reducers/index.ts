import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
import userManagement from 'app/modules/administration/user-management/user-management.reducer';
import register from 'app/modules/account/register/register.reducer';
import activate from 'app/modules/account/activate/activate.reducer';
import password from 'app/modules/account/password/password.reducer';
import settings from 'app/modules/account/settings/settings.reducer';
import passwordReset from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import jobs from 'app/entities/jobs/jobs.reducer';
// prettier-ignore
import countries from 'app/entities/countries/countries.reducer';
// prettier-ignore
import regions from 'app/entities/regions/regions.reducer';
// prettier-ignore
import cities from 'app/entities/cities/cities.reducer';
// prettier-ignore
import zipCodes from 'app/entities/zip-codes/zip-codes.reducer';
// prettier-ignore
import addresses from 'app/entities/addresses/addresses.reducer';
// prettier-ignore
import phones from 'app/entities/phones/phones.reducer';
// prettier-ignore
import emails from 'app/entities/emails/emails.reducer';
// prettier-ignore
import phoneTypes from 'app/entities/phone-types/phone-types.reducer';
// prettier-ignore
import contactTypes from 'app/entities/contact-types/contact-types.reducer';
// prettier-ignore
import socialKinds from 'app/entities/social-kinds/social-kinds.reducer';
// prettier-ignore
import socialContacts from 'app/entities/social-contacts/social-contacts.reducer';
// prettier-ignore
import companyKinds from 'app/entities/company-kinds/company-kinds.reducer';
// prettier-ignore
import companies from 'app/entities/companies/companies.reducer';
// prettier-ignore
import codes from 'app/entities/codes/codes.reducer';
// prettier-ignore
import teams from 'app/entities/teams/teams.reducer';
// prettier-ignore
import origins from 'app/entities/origins/origins.reducer';
// prettier-ignore
import citizenFolders from 'app/entities/citizen-folders/citizen-folders.reducer';
// prettier-ignore
import maritalStatus from 'app/entities/marital-status/marital-status.reducer';
// prettier-ignore
import citizens from 'app/entities/citizens/citizens.reducer';
// prettier-ignore
import citizensRelations from 'app/entities/citizens-relations/citizens-relations.reducer';
// prettier-ignore
import citizensMeetings from 'app/entities/citizens-meetings/citizens-meetings.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const rootReducer = {
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  jobs,
  countries,
  regions,
  cities,
  zipCodes,
  addresses,
  phones,
  emails,
  phoneTypes,
  contactTypes,
  socialKinds,
  socialContacts,
  companyKinds,
  companies,
  codes,
  teams,
  origins,
  citizenFolders,
  maritalStatus,
  citizens,
  citizensRelations,
  citizensMeetings,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
};

export default rootReducer;
