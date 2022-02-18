import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Jobs from './jobs';
import Countries from './countries';
import Regions from './regions';
import Cities from './cities';
import ZipCodes from './zip-codes';
import Addresses from './addresses';
import Phones from './phones';
import Emails from './emails';
import PhoneTypes from './phone-types';
import ContactTypes from './contact-types';
import SocialKinds from './social-kinds';
import SocialContacts from './social-contacts';
import CompanyKinds from './company-kinds';
import Companies from './companies';
import Codes from './codes';
import Teams from './teams';
import Origins from './origins';
import CitizenFolders from './citizen-folders';
import MaritalStatus from './marital-status';
import Citizens from './citizens';
import CitizensRelations from './citizens-relations';
import CitizensMeetings from './citizens-meetings';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}jobs`} component={Jobs} />
      <ErrorBoundaryRoute path={`${match.url}countries`} component={Countries} />
      <ErrorBoundaryRoute path={`${match.url}regions`} component={Regions} />
      <ErrorBoundaryRoute path={`${match.url}cities`} component={Cities} />
      <ErrorBoundaryRoute path={`${match.url}zip-codes`} component={ZipCodes} />
      <ErrorBoundaryRoute path={`${match.url}addresses`} component={Addresses} />
      <ErrorBoundaryRoute path={`${match.url}phones`} component={Phones} />
      <ErrorBoundaryRoute path={`${match.url}emails`} component={Emails} />
      <ErrorBoundaryRoute path={`${match.url}phone-types`} component={PhoneTypes} />
      <ErrorBoundaryRoute path={`${match.url}contact-types`} component={ContactTypes} />
      <ErrorBoundaryRoute path={`${match.url}social-kinds`} component={SocialKinds} />
      <ErrorBoundaryRoute path={`${match.url}social-contacts`} component={SocialContacts} />
      <ErrorBoundaryRoute path={`${match.url}company-kinds`} component={CompanyKinds} />
      <ErrorBoundaryRoute path={`${match.url}companies`} component={Companies} />
      <ErrorBoundaryRoute path={`${match.url}codes`} component={Codes} />
      <ErrorBoundaryRoute path={`${match.url}teams`} component={Teams} />
      <ErrorBoundaryRoute path={`${match.url}origins`} component={Origins} />
      <ErrorBoundaryRoute path={`${match.url}citizen-folders`} component={CitizenFolders} />
      <ErrorBoundaryRoute path={`${match.url}marital-status`} component={MaritalStatus} />
      <ErrorBoundaryRoute path={`${match.url}citizens`} component={Citizens} />
      <ErrorBoundaryRoute path={`${match.url}citizens-relations`} component={CitizensRelations} />
      <ErrorBoundaryRoute path={`${match.url}citizens-meetings`} component={CitizensMeetings} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
