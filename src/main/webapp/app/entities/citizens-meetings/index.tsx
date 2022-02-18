import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CitizensMeetings from './citizens-meetings';
import CitizensMeetingsDetail from './citizens-meetings-detail';
import CitizensMeetingsUpdate from './citizens-meetings-update';
import CitizensMeetingsDeleteDialog from './citizens-meetings-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CitizensMeetingsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CitizensMeetingsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CitizensMeetingsDetail} />
      <ErrorBoundaryRoute path={match.url} component={CitizensMeetings} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CitizensMeetingsDeleteDialog} />
  </>
);

export default Routes;
