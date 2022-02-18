import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPhoneTypes } from 'app/shared/model/phone-types.model';
import { getEntities as getPhoneTypes } from 'app/entities/phone-types/phone-types.reducer';
import { ICompanies } from 'app/shared/model/companies.model';
import { getEntities as getCompanies } from 'app/entities/companies/companies.reducer';
import { ICitizens } from 'app/shared/model/citizens.model';
import { getEntities as getCitizens } from 'app/entities/citizens/citizens.reducer';
import { getEntity, updateEntity, createEntity, reset } from './phones.reducer';
import { IPhones } from 'app/shared/model/phones.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PhonesUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const phoneTypes = useAppSelector(state => state.phoneTypes.entities);
  const companies = useAppSelector(state => state.companies.entities);
  const citizens = useAppSelector(state => state.citizens.entities);
  const phonesEntity = useAppSelector(state => state.phones.entity);
  const loading = useAppSelector(state => state.phones.loading);
  const updating = useAppSelector(state => state.phones.updating);
  const updateSuccess = useAppSelector(state => state.phones.updateSuccess);
  const handleClose = () => {
    props.history.push('/phones' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getPhoneTypes({}));
    dispatch(getCompanies({}));
    dispatch(getCitizens({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...phonesEntity,
      ...values,
      kind: phoneTypes.find(it => it.id.toString() === values.kind.toString()),
      company: companies.find(it => it.id.toString() === values.company.toString()),
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
          ...phonesEntity,
          kind: phonesEntity?.kind?.id,
          company: phonesEntity?.company?.id,
          citizen: phonesEntity?.citizen?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hermesreactApp.phones.home.createOrEditLabel" data-cy="PhonesCreateUpdateHeading">
            <Translate contentKey="hermesreactApp.phones.home.createOrEditLabel">Create or edit a Phones</Translate>
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
                  id="phones-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('hermesreactApp.phones.phone')}
                id="phones-phone"
                name="phone"
                data-cy="phone"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('hermesreactApp.phones.description')}
                id="phones-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.phones.favourite')}
                id="phones-favourite"
                name="favourite"
                data-cy="favourite"
                check
                type="checkbox"
              />
              <ValidatedField id="phones-kind" name="kind" data-cy="kind" label={translate('hermesreactApp.phones.kind')} type="select">
                <option value="" key="0" />
                {phoneTypes
                  ? phoneTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="phones-company"
                name="company"
                data-cy="company"
                label={translate('hermesreactApp.phones.company')}
                type="select"
              >
                <option value="" key="0" />
                {companies
                  ? companies.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="phones-citizen"
                name="citizen"
                data-cy="citizen"
                label={translate('hermesreactApp.phones.citizen')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/phones" replace color="info">
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

export default PhonesUpdate;
