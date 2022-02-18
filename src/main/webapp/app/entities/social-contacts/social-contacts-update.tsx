import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ISocialKinds } from 'app/shared/model/social-kinds.model';
import { getEntities as getSocialKinds } from 'app/entities/social-kinds/social-kinds.reducer';
import { IContactTypes } from 'app/shared/model/contact-types.model';
import { getEntities as getContactTypes } from 'app/entities/contact-types/contact-types.reducer';
import { ICitizens } from 'app/shared/model/citizens.model';
import { getEntities as getCitizens } from 'app/entities/citizens/citizens.reducer';
import { getEntity, updateEntity, createEntity, reset } from './social-contacts.reducer';
import { ISocialContacts } from 'app/shared/model/social-contacts.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SocialContactsUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const socialKinds = useAppSelector(state => state.socialKinds.entities);
  const contactTypes = useAppSelector(state => state.contactTypes.entities);
  const citizens = useAppSelector(state => state.citizens.entities);
  const socialContactsEntity = useAppSelector(state => state.socialContacts.entity);
  const loading = useAppSelector(state => state.socialContacts.loading);
  const updating = useAppSelector(state => state.socialContacts.updating);
  const updateSuccess = useAppSelector(state => state.socialContacts.updateSuccess);
  const handleClose = () => {
    props.history.push('/social-contacts' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getSocialKinds({}));
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
      ...socialContactsEntity,
      ...values,
      social: socialKinds.find(it => it.id.toString() === values.social.toString()),
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
          ...socialContactsEntity,
          social: socialContactsEntity?.social?.id,
          kind: socialContactsEntity?.kind?.id,
          citizen: socialContactsEntity?.citizen?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hermesreactApp.socialContacts.home.createOrEditLabel" data-cy="SocialContactsCreateUpdateHeading">
            <Translate contentKey="hermesreactApp.socialContacts.home.createOrEditLabel">Create or edit a SocialContacts</Translate>
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
                  id="social-contacts-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('hermesreactApp.socialContacts.name')}
                id="social-contacts-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('hermesreactApp.socialContacts.favored')}
                id="social-contacts-favored"
                name="favored"
                data-cy="favored"
                check
                type="checkbox"
              />
              <ValidatedField
                id="social-contacts-social"
                name="social"
                data-cy="social"
                label={translate('hermesreactApp.socialContacts.social')}
                type="select"
              >
                <option value="" key="0" />
                {socialKinds
                  ? socialKinds.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="social-contacts-kind"
                name="kind"
                data-cy="kind"
                label={translate('hermesreactApp.socialContacts.kind')}
                type="select"
              >
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
                id="social-contacts-citizen"
                name="citizen"
                data-cy="citizen"
                label={translate('hermesreactApp.socialContacts.citizen')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/social-contacts" replace color="info">
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

export default SocialContactsUpdate;
