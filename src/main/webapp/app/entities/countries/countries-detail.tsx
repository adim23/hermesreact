import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './countries.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CountriesDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const countriesEntity = useAppSelector(state => state.countries.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="countriesDetailsHeading">
          <Translate contentKey="hermesreactApp.countries.detail.title">Countries</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{countriesEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="hermesreactApp.countries.name">Name</Translate>
            </span>
          </dt>
          <dd>{countriesEntity.name}</dd>
          <dt>
            <span id="iso">
              <Translate contentKey="hermesreactApp.countries.iso">Iso</Translate>
            </span>
          </dt>
          <dd>{countriesEntity.iso}</dd>
          <dt>
            <span id="language">
              <Translate contentKey="hermesreactApp.countries.language">Language</Translate>
            </span>
          </dt>
          <dd>{countriesEntity.language}</dd>
          <dt>
            <span id="lang">
              <Translate contentKey="hermesreactApp.countries.lang">Lang</Translate>
            </span>
          </dt>
          <dd>{countriesEntity.lang}</dd>
        </dl>
        <Button tag={Link} to="/countries" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/countries/${countriesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CountriesDetail;
