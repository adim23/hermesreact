import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Origins from './origins';
import OriginsDetail from './origins-detail';
import OriginsUpdate from './origins-update';
import OriginsDeleteDialog from './origins-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OriginsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OriginsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OriginsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Origins} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OriginsDeleteDialog} />
  </>
);

export default Routes;
