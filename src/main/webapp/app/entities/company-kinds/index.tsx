import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CompanyKinds from './company-kinds';
import CompanyKindsDetail from './company-kinds-detail';
import CompanyKindsUpdate from './company-kinds-update';
import CompanyKindsDeleteDialog from './company-kinds-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CompanyKindsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CompanyKindsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CompanyKindsDetail} />
      <ErrorBoundaryRoute path={match.url} component={CompanyKinds} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CompanyKindsDeleteDialog} />
  </>
);

export default Routes;
