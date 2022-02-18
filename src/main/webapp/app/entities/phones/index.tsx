import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Phones from './phones';
import PhonesDetail from './phones-detail';
import PhonesUpdate from './phones-update';
import PhonesDeleteDialog from './phones-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PhonesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PhonesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PhonesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Phones} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PhonesDeleteDialog} />
  </>
);

export default Routes;
