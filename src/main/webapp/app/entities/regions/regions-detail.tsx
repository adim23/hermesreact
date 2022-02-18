import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './regions.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const RegionsDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const regionsEntity = useAppSelector(state => state.regions.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="regionsDetailsHeading">
          <Translate contentKey="hermesreactApp.regions.detail.title">Regions</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{regionsEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="hermesreactApp.regions.name">Name</Translate>
            </span>
          </dt>
          <dd>{regionsEntity.name}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.regions.country">Country</Translate>
          </dt>
          <dd>{regionsEntity.country ? regionsEntity.country.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/regions" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/regions/${regionsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default RegionsDetail;
