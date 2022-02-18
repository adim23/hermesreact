import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './social-kinds.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SocialKindsDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const socialKindsEntity = useAppSelector(state => state.socialKinds.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="socialKindsDetailsHeading">
          <Translate contentKey="hermesreactApp.socialKinds.detail.title">SocialKinds</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{socialKindsEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="hermesreactApp.socialKinds.code">Code</Translate>
            </span>
          </dt>
          <dd>{socialKindsEntity.code}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="hermesreactApp.socialKinds.name">Name</Translate>
            </span>
          </dt>
          <dd>{socialKindsEntity.name}</dd>
          <dt>
            <span id="call">
              <Translate contentKey="hermesreactApp.socialKinds.call">Call</Translate>
            </span>
          </dt>
          <dd>{socialKindsEntity.call}</dd>
        </dl>
        <Button tag={Link} to="/social-kinds" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/social-kinds/${socialKindsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SocialKindsDetail;
