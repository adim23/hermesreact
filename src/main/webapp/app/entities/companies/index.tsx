import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Companies from './companies';
import CompaniesDetail from './companies-detail';
import CompaniesUpdate from './companies-update';
import CompaniesDeleteDialog from './companies-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CompaniesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CompaniesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CompaniesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Companies} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CompaniesDeleteDialog} />
  </>
);

export default Routes;
