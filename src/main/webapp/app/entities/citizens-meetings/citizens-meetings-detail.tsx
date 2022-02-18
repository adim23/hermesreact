import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './citizens-meetings.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CitizensMeetingsDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const citizensMeetingsEntity = useAppSelector(state => state.citizensMeetings.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="citizensMeetingsDetailsHeading">
          <Translate contentKey="hermesreactApp.citizensMeetings.detail.title">CitizensMeetings</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{citizensMeetingsEntity.id}</dd>
          <dt>
            <span id="meetDate">
              <Translate contentKey="hermesreactApp.citizensMeetings.meetDate">Meet Date</Translate>
            </span>
          </dt>
          <dd>
            {citizensMeetingsEntity.meetDate ? (
              <TextFormat value={citizensMeetingsEntity.meetDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="agenda">
              <Translate contentKey="hermesreactApp.citizensMeetings.agenda">Agenda</Translate>
            </span>
          </dt>
          <dd>{citizensMeetingsEntity.agenda}</dd>
          <dt>
            <span id="comments">
              <Translate contentKey="hermesreactApp.citizensMeetings.comments">Comments</Translate>
            </span>
          </dt>
          <dd>{citizensMeetingsEntity.comments}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="hermesreactApp.citizensMeetings.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{citizensMeetingsEntity.amount}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="hermesreactApp.citizensMeetings.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{citizensMeetingsEntity.quantity}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="hermesreactApp.citizensMeetings.status">Status</Translate>
            </span>
          </dt>
          <dd>{citizensMeetingsEntity.status}</dd>
          <dt>
            <span id="flag">
              <Translate contentKey="hermesreactApp.citizensMeetings.flag">Flag</Translate>
            </span>
          </dt>
          <dd>{citizensMeetingsEntity.flag ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="hermesreactApp.citizensMeetings.citizen">Citizen</Translate>
          </dt>
          <dd>{citizensMeetingsEntity.citizen ? citizensMeetingsEntity.citizen.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/citizens-meetings" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/citizens-meetings/${citizensMeetingsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CitizensMeetingsDetail;
