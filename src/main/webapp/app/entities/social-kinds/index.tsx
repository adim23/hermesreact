import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SocialKinds from './social-kinds';
import SocialKindsDetail from './social-kinds-detail';
import SocialKindsUpdate from './social-kinds-update';
import SocialKindsDeleteDialog from './social-kinds-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SocialKindsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SocialKindsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SocialKindsDetail} />
      <ErrorBoundaryRoute path={match.url} component={SocialKinds} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SocialKindsDeleteDialog} />
  </>
);

export default Routes;
