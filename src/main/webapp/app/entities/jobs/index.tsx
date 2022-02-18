import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Jobs from './jobs';
import JobsDetail from './jobs-detail';
import JobsUpdate from './jobs-update';
import JobsDeleteDialog from './jobs-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JobsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JobsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JobsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Jobs} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={JobsDeleteDialog} />
  </>
);

export default Routes;
