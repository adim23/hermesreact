import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './companies.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CompaniesDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const companiesEntity = useAppSelector(state => state.companies.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="companiesDetailsHeading">
          <Translate contentKey="hermesreactApp.companies.detail.title">Companies</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{companiesEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="hermesreactApp.companies.name">Name</Translate>
            </span>
          </dt>
          <dd>{companiesEntity.name}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.companies.kind">Kind</Translate>
          </dt>
          <dd>{companiesEntity.kind ? companiesEntity.kind.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/companies" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/companies/${companiesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CompaniesDetail;
