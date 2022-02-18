import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IContactTypes } from 'app/shared/model/contact-types.model';
import { getEntities as getContactTypes } from 'app/entities/contact-types/contact-types.reducer';
import { ICitizens } from 'app/shared/model/citizens.model';
import { getEntities as getCitizens } from 'app/entities/citizens/citizens.reducer';
import { getEntity, updateEntity, createEntity, reset } from './emails.reducer';
import { IEmails } from 'app/shared/model/emails.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const EmailsUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const contactTypes = useAppSelector(state => state.contactTypes.entities);
  const citizens = useAppSelector(state => state.citizens.entities);
  const emailsEntity = useAppSelector(state => state.emails.entity);
  const loading = useAppSelector(state => state.emails.loading);
  const updating = useAppSelector(state => state.emails.updating);
  const updateSuccess = useAppSelector(state => state.emails.updateSuccess);
  const handleClose = () => {
    props.history.push('/emails' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getContactTypes({}));
    dispatch(getCitizens({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...emailsEntity,
      ...values,
      kind: contactTypes.find(it => it.id.toString() === values.kind.toString()),
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
          ...emailsEntity,
          kind: emailsEntity?.kind?.id,
          citizen: emailsEntity?.citizen?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hermesreactApp.emails.home.createOrEditLabel" data-cy="EmailsCreateUpdateHeading">
            <Translate contentKey="hermesreactApp.emails.home.createOrEditLabel">Create or edit a Emails</Translate>
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
                  id="emails-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('hermesreactApp.emails.email')}
                id="emails-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('hermesreactApp.emails.description')}
                id="emails-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.emails.favourite')}
                id="emails-favourite"
                name="favourite"
                data-cy="favourite"
                check
                type="checkbox"
              />
              <ValidatedField id="emails-kind" name="kind" data-cy="kind" label={translate('hermesreactApp.emails.kind')} type="select">
                <option value="" key="0" />
                {contactTypes
                  ? contactTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="emails-citizen"
                name="citizen"
                data-cy="citizen"
                label={translate('hermesreactApp.emails.citizen')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/emails" replace color="info">
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

export default EmailsUpdate;
