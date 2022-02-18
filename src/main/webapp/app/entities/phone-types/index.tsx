import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PhoneTypes from './phone-types';
import PhoneTypesDetail from './phone-types-detail';
import PhoneTypesUpdate from './phone-types-update';
import PhoneTypesDeleteDialog from './phone-types-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PhoneTypesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PhoneTypesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PhoneTypesDetail} />
      <ErrorBoundaryRoute path={match.url} component={PhoneTypes} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PhoneTypesDeleteDialog} />
  </>
);

export default Routes;
