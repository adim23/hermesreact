import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MaritalStatus from './marital-status';
import MaritalStatusDetail from './marital-status-detail';
import MaritalStatusUpdate from './marital-status-update';
import MaritalStatusDeleteDialog from './marital-status-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MaritalStatusUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MaritalStatusUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MaritalStatusDetail} />
      <ErrorBoundaryRoute path={match.url} component={MaritalStatus} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MaritalStatusDeleteDialog} />
  </>
);

export default Routes;
