import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Addresses from './addresses';
import AddressesDetail from './addresses-detail';
import AddressesUpdate from './addresses-update';
import AddressesDeleteDialog from './addresses-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AddressesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AddressesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AddressesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Addresses} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AddressesDeleteDialog} />
  </>
);

export default Routes;
