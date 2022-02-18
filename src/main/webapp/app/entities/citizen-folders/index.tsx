import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CitizenFolders from './citizen-folders';
import CitizenFoldersDetail from './citizen-folders-detail';
import CitizenFoldersUpdate from './citizen-folders-update';
import CitizenFoldersDeleteDialog from './citizen-folders-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CitizenFoldersUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CitizenFoldersUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CitizenFoldersDetail} />
      <ErrorBoundaryRoute path={match.url} component={CitizenFolders} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CitizenFoldersDeleteDialog} />
  </>
);

export default Routes;
