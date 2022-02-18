import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICompanyKinds } from 'app/shared/model/company-kinds.model';
import { getEntities as getCompanyKinds } from 'app/entities/company-kinds/company-kinds.reducer';
import { getEntity, updateEntity, createEntity, reset } from './companies.reducer';
import { ICompanies } from 'app/shared/model/companies.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CompaniesUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const companyKinds = useAppSelector(state => state.companyKinds.entities);
  const companiesEntity = useAppSelector(state => state.companies.entity);
  const loading = useAppSelector(state => state.companies.loading);
  const updating = useAppSelector(state => state.companies.updating);
  const updateSuccess = useAppSelector(state => state.companies.updateSuccess);
  const handleClose = () => {
    props.history.push('/companies' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCompanyKinds({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...companiesEntity,
      ...values,
      kind: companyKinds.find(it => it.id.toString() === values.kind.toString()),
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
          ...companiesEntity,
          kind: companiesEntity?.kind?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hermesreactApp.companies.home.createOrEditLabel" data-cy="CompaniesCreateUpdateHeading">
            <Translate contentKey="hermesreactApp.companies.home.createOrEditLabel">Create or edit a Companies</Translate>
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
                  id="companies-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('hermesreactApp.companies.name')}
                id="companies-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="companies-kind"
                name="kind"
                data-cy="kind"
                label={translate('hermesreactApp.companies.kind')}
                type="select"
              >
                <option value="" key="0" />
                {companyKinds
                  ? companyKinds.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/companies" replace color="info">
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

export default CompaniesUpdate;
