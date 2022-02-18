import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './social-contacts.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SocialContactsDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const socialContactsEntity = useAppSelector(state => state.socialContacts.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="socialContactsDetailsHeading">
          <Translate contentKey="hermesreactApp.socialContacts.detail.title">SocialContacts</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{socialContactsEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="hermesreactApp.socialContacts.name">Name</Translate>
            </span>
          </dt>
          <dd>{socialContactsEntity.name}</dd>
          <dt>
            <span id="favored">
              <Translate contentKey="hermesreactApp.socialContacts.favored">Favored</Translate>
            </span>
          </dt>
          <dd>{socialContactsEntity.favored ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.socialContacts.social">Social</Translate>
          </dt>
          <dd>{socialContactsEntity.social ? socialContactsEntity.social.name : ''}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.socialContacts.kind">Kind</Translate>
          </dt>
          <dd>{socialContactsEntity.kind ? socialContactsEntity.kind.name : ''}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.socialContacts.citizen">Citizen</Translate>
          </dt>
          <dd>{socialContactsEntity.citizen ? socialContactsEntity.citizen.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/social-contacts" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/social-contacts/${socialContactsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SocialContactsDetail;
