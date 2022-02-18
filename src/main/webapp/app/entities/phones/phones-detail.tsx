import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './phones.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PhonesDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const phonesEntity = useAppSelector(state => state.phones.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="phonesDetailsHeading">
          <Translate contentKey="hermesreactApp.phones.detail.title">Phones</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{phonesEntity.id}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="hermesreactApp.phones.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{phonesEntity.phone}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="hermesreactApp.phones.description">Description</Translate>
            </span>
          </dt>
          <dd>{phonesEntity.description}</dd>
          <dt>
            <span id="favourite">
              <Translate contentKey="hermesreactApp.phones.favourite">Favourite</Translate>
            </span>
          </dt>
          <dd>{phonesEntity.favourite ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.phones.kind">Kind</Translate>
          </dt>
          <dd>{phonesEntity.kind ? phonesEntity.kind.name : ''}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.phones.company">Company</Translate>
          </dt>
          <dd>{phonesEntity.company ? phonesEntity.company.name : ''}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.phones.citizen">Citizen</Translate>
          </dt>
          <dd>{phonesEntity.citizen ? phonesEntity.citizen.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/phones" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/phones/${phonesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PhonesDetail;
