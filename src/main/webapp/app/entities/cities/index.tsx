import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Cities from './cities';
import CitiesDetail from './cities-detail';
import CitiesUpdate from './cities-update';
import CitiesDeleteDialog from './cities-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CitiesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CitiesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CitiesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Cities} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CitiesDeleteDialog} />
  </>
);

export default Routes;
