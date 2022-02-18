import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './zip-codes.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ZipCodesDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const zipCodesEntity = useAppSelector(state => state.zipCodes.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="zipCodesDetailsHeading">
          <Translate contentKey="hermesreactApp.zipCodes.detail.title">ZipCodes</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{zipCodesEntity.id}</dd>
          <dt>
            <span id="street">
              <Translate contentKey="hermesreactApp.zipCodes.street">Street</Translate>
            </span>
          </dt>
          <dd>{zipCodesEntity.street}</dd>
          <dt>
            <span id="area">
              <Translate contentKey="hermesreactApp.zipCodes.area">Area</Translate>
            </span>
          </dt>
          <dd>{zipCodesEntity.area}</dd>
          <dt>
            <span id="fromNumber">
              <Translate contentKey="hermesreactApp.zipCodes.fromNumber">From Number</Translate>
            </span>
          </dt>
          <dd>{zipCodesEntity.fromNumber}</dd>
          <dt>
            <span id="toNumber">
              <Translate contentKey="hermesreactApp.zipCodes.toNumber">To Number</Translate>
            </span>
          </dt>
          <dd>{zipCodesEntity.toNumber}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.zipCodes.country">Country</Translate>
          </dt>
          <dd>{zipCodesEntity.country ? zipCodesEntity.country.name : ''}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.zipCodes.region">Region</Translate>
          </dt>
          <dd>{zipCodesEntity.region ? zipCodesEntity.region.name : ''}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.zipCodes.city">City</Translate>
          </dt>
          <dd>{zipCodesEntity.city ? zipCodesEntity.city.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/zip-codes" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/zip-codes/${zipCodesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ZipCodesDetail;
