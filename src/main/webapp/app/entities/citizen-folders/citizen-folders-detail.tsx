import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './citizen-folders.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CitizenFoldersDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const citizenFoldersEntity = useAppSelector(state => state.citizenFolders.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="citizenFoldersDetailsHeading">
          <Translate contentKey="hermesreactApp.citizenFolders.detail.title">CitizenFolders</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{citizenFoldersEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="hermesreactApp.citizenFolders.name">Name</Translate>
            </span>
          </dt>
          <dd>{citizenFoldersEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="hermesreactApp.citizenFolders.description">Description</Translate>
            </span>
          </dt>
          <dd>{citizenFoldersEntity.description}</dd>
          <dt>
            <span id="special">
              <Translate contentKey="hermesreactApp.citizenFolders.special">Special</Translate>
            </span>
          </dt>
          <dd>{citizenFoldersEntity.special ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/citizen-folders" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/citizen-folders/${citizenFoldersEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CitizenFoldersDetail;
