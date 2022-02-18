import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Regions from './regions';
import RegionsDetail from './regions-detail';
import RegionsUpdate from './regions-update';
import RegionsDeleteDialog from './regions-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RegionsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RegionsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RegionsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Regions} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RegionsDeleteDialog} />
  </>
);

export default Routes;
