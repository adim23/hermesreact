import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CitizensRelations from './citizens-relations';
import CitizensRelationsDetail from './citizens-relations-detail';
import CitizensRelationsUpdate from './citizens-relations-update';
import CitizensRelationsDeleteDialog from './citizens-relations-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CitizensRelationsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CitizensRelationsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CitizensRelationsDetail} />
      <ErrorBoundaryRoute path={match.url} component={CitizensRelations} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CitizensRelationsDeleteDialog} />
  </>
);

export default Routes;
