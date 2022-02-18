import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './emails.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const EmailsDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const emailsEntity = useAppSelector(state => state.emails.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="emailsDetailsHeading">
          <Translate contentKey="hermesreactApp.emails.detail.title">Emails</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{emailsEntity.id}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="hermesreactApp.emails.email">Email</Translate>
            </span>
          </dt>
          <dd>{emailsEntity.email}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="hermesreactApp.emails.description">Description</Translate>
            </span>
          </dt>
          <dd>{emailsEntity.description}</dd>
          <dt>
            <span id="favourite">
              <Translate contentKey="hermesreactApp.emails.favourite">Favourite</Translate>
            </span>
          </dt>
          <dd>{emailsEntity.favourite ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.emails.kind">Kind</Translate>
          </dt>
          <dd>{emailsEntity.kind ? emailsEntity.kind.name : ''}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.emails.citizen">Citizen</Translate>
          </dt>
          <dd>{emailsEntity.citizen ? emailsEntity.citizen.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/emails" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/emails/${emailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EmailsDetail;
