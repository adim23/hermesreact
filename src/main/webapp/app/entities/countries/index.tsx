import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Countries from './countries';
import CountriesDetail from './countries-detail';
import CountriesUpdate from './countries-update';
import CountriesDeleteDialog from './countries-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CountriesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CountriesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CountriesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Countries} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CountriesDeleteDialog} />
  </>
);

export default Routes;
