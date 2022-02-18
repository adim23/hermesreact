import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ContactTypes from './contact-types';
import ContactTypesDetail from './contact-types-detail';
import ContactTypesUpdate from './contact-types-update';
import ContactTypesDeleteDialog from './contact-types-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ContactTypesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ContactTypesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ContactTypesDetail} />
      <ErrorBoundaryRoute path={match.url} component={ContactTypes} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ContactTypesDeleteDialog} />
  </>
);

export default Routes;
