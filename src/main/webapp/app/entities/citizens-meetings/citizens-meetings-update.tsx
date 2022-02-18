import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICitizens } from 'app/shared/model/citizens.model';
import { getEntities as getCitizens } from 'app/entities/citizens/citizens.reducer';
import { getEntity, updateEntity, createEntity, reset } from './citizens-meetings.reducer';
import { ICitizensMeetings } from 'app/shared/model/citizens-meetings.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CitizensMeetingsUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const citizens = useAppSelector(state => state.citizens.entities);
  const citizensMeetingsEntity = useAppSelector(state => state.citizensMeetings.entity);
  const loading = useAppSelector(state => state.citizensMeetings.loading);
  const updating = useAppSelector(state => state.citizensMeetings.updating);
  const updateSuccess = useAppSelector(state => state.citizensMeetings.updateSuccess);
  const handleClose = () => {
    props.history.push('/citizens-meetings' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCitizens({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...citizensMeetingsEntity,
      ...values,
      citizen: citizens.find(it => it.id.toString() === values.citizen.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...citizensMeetingsEntity,
          citizen: citizensMeetingsEntity?.citizen?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hermesreactApp.citizensMeetings.home.createOrEditLabel" data-cy="CitizensMeetingsCreateUpdateHeading">
            <Translate contentKey="hermesreactApp.citizensMeetings.home.createOrEditLabel">Create or edit a CitizensMeetings</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="citizens-meetings-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('hermesreactApp.citizensMeetings.meetDate')}
                id="citizens-meetings-meetDate"
                name="meetDate"
                data-cy="meetDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('hermesreactApp.citizensMeetings.agenda')}
                id="citizens-meetings-agenda"
                name="agenda"
                data-cy="agenda"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('hermesreactApp.citizensMeetings.comments')}
                id="citizens-meetings-comments"
                name="comments"
                data-cy="comments"
                type="textarea"
              />
              <ValidatedField
                label={translate('hermesreactApp.citizensMeetings.amount')}
                id="citizens-meetings-amount"
                name="amount"
                data-cy="amount"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.citizensMeetings.quantity')}
                id="citizens-meetings-quantity"
                name="quantity"
                data-cy="quantity"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.citizensMeetings.status')}
                id="citizens-meetings-status"
                name="status"
                data-cy="status"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('hermesreactApp.citizensMeetings.flag')}
                id="citizens-meetings-flag"
                name="flag"
                data-cy="flag"
                check
                type="checkbox"
              />
              <ValidatedField
                id="citizens-meetings-citizen"
                name="citizen"
                data-cy="citizen"
                label={translate('hermesreactApp.citizensMeetings.citizen')}
                type="select"
              >
                <option value="" key="0" />
                {citizens
                  ? citizens.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/citizens-meetings" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CitizensMeetingsUpdate;
