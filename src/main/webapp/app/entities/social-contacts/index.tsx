import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SocialContacts from './social-contacts';
import SocialContactsDetail from './social-contacts-detail';
import SocialContactsUpdate from './social-contacts-update';
import SocialContactsDeleteDialog from './social-contacts-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SocialContactsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SocialContactsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SocialContactsDetail} />
      <ErrorBoundaryRoute path={match.url} component={SocialContacts} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SocialContactsDeleteDialog} />
  </>
);

export default Routes;
