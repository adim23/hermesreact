import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Emails from './emails';
import EmailsDetail from './emails-detail';
import EmailsUpdate from './emails-update';
import EmailsDeleteDialog from './emails-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Emails} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmailsDeleteDialog} />
  </>
);

export default Routes;
