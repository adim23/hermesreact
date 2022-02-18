import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './cities.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CitiesDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const citiesEntity = useAppSelector(state => state.cities.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="citiesDetailsHeading">
          <Translate contentKey="hermesreactApp.cities.detail.title">Cities</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="hermesreactApp.cities.name">Name</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.name}</dd>
          <dt>
            <span id="president">
              <Translate contentKey="hermesreactApp.cities.president">President</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.president}</dd>
          <dt>
            <span id="presidentsPhone">
              <Translate contentKey="hermesreactApp.cities.presidentsPhone">Presidents Phone</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.presidentsPhone}</dd>
          <dt>
            <span id="secretary">
              <Translate contentKey="hermesreactApp.cities.secretary">Secretary</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.secretary}</dd>
          <dt>
            <span id="secretarysPhone">
              <Translate contentKey="hermesreactApp.cities.secretarysPhone">Secretarys Phone</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.secretarysPhone}</dd>
          <dt>
            <span id="police">
              <Translate contentKey="hermesreactApp.cities.police">Police</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.police}</dd>
          <dt>
            <span id="policesPhone">
              <Translate contentKey="hermesreactApp.cities.policesPhone">Polices Phone</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.policesPhone}</dd>
          <dt>
            <span id="doctor">
              <Translate contentKey="hermesreactApp.cities.doctor">Doctor</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.doctor}</dd>
          <dt>
            <span id="doctorsPhone">
              <Translate contentKey="hermesreactApp.cities.doctorsPhone">Doctors Phone</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.doctorsPhone}</dd>
          <dt>
            <span id="teacher">
              <Translate contentKey="hermesreactApp.cities.teacher">Teacher</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.teacher}</dd>
          <dt>
            <span id="teachersPhone">
              <Translate contentKey="hermesreactApp.cities.teachersPhone">Teachers Phone</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.teachersPhone}</dd>
          <dt>
            <span id="priest">
              <Translate contentKey="hermesreactApp.cities.priest">Priest</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.priest}</dd>
          <dt>
            <span id="priestsPhone">
              <Translate contentKey="hermesreactApp.cities.priestsPhone">Priests Phone</Translate>
            </span>
          </dt>
          <dd>{citiesEntity.priestsPhone}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.cities.country">Country</Translate>
          </dt>
          <dd>{citiesEntity.country ? citiesEntity.country.name : ''}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.cities.region">Region</Translate>
          </dt>
          <dd>{citiesEntity.region ? citiesEntity.region.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/cities" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cities/${citiesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CitiesDetail;
