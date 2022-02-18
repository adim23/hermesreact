import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ZipCodes from './zip-codes';
import ZipCodesDetail from './zip-codes-detail';
import ZipCodesUpdate from './zip-codes-update';
import ZipCodesDeleteDialog from './zip-codes-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ZipCodesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ZipCodesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ZipCodesDetail} />
      <ErrorBoundaryRoute path={match.url} component={ZipCodes} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ZipCodesDeleteDialog} />
  </>
);

export default Routes;
