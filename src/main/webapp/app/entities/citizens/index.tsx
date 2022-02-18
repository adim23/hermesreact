import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Citizens from './citizens';
import CitizensDetail from './citizens-detail';
import CitizensUpdate from './citizens-update';
import CitizensDeleteDialog from './citizens-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CitizensUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CitizensUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CitizensDetail} />
      <ErrorBoundaryRoute path={match.url} component={Citizens} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CitizensDeleteDialog} />
  </>
);

export default Routes;
