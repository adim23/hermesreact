import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICountries } from 'app/shared/model/countries.model';
import { getEntities as getCountries } from 'app/entities/countries/countries.reducer';
import { IContactTypes } from 'app/shared/model/contact-types.model';
import { getEntities as getContactTypes } from 'app/entities/contact-types/contact-types.reducer';
import { IRegions } from 'app/shared/model/regions.model';
import { getEntities as getRegions } from 'app/entities/regions/regions.reducer';
import { ICompanies } from 'app/shared/model/companies.model';
import { getEntities as getCompanies } from 'app/entities/companies/companies.reducer';
import { ICitizens } from 'app/shared/model/citizens.model';
import { getEntities as getCitizens } from 'app/entities/citizens/citizens.reducer';
import { getEntity, updateEntity, createEntity, reset } from './addresses.reducer';
import { IAddresses } from 'app/shared/model/addresses.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const AddressesUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const countries = useAppSelector(state => state.countries.entities);
  const contactTypes = useAppSelector(state => state.contactTypes.entities);
  const regions = useAppSelector(state => state.regions.entities);
  const companies = useAppSelector(state => state.companies.entities);
  const citizens = useAppSelector(state => state.citizens.entities);
  const addressesEntity = useAppSelector(state => state.addresses.entity);
  const loading = useAppSelector(state => state.addresses.loading);
  const updating = useAppSelector(state => state.addresses.updating);
  const updateSuccess = useAppSelector(state => state.addresses.updateSuccess);
  const handleClose = () => {
    props.history.push('/addresses' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCountries({}));
    dispatch(getContactTypes({}));
    dispatch(getRegions({}));
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
      ...addressesEntity,
      ...values,
      country: countries.find(it => it.id.toString() === values.country.toString()),
      kind: contactTypes.find(it => it.id.toString() === values.kind.toString()),
      region: regions.find(it => it.id.toString() === values.region.toString()),
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
          ...addressesEntity,
          country: addressesEntity?.country?.id,
          kind: addressesEntity?.kind?.id,
          region: addressesEntity?.region?.id,
          company: addressesEntity?.company?.id,
          citizen: addressesEntity?.citizen?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hermesreactApp.addresses.home.createOrEditLabel" data-cy="AddressesCreateUpdateHeading">
            <Translate contentKey="hermesreactApp.addresses.home.createOrEditLabel">Create or edit a Addresses</Translate>
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
                  id="addresses-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('hermesreactApp.addresses.address')}
                id="addresses-address"
                name="address"
                data-cy="address"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.addresses.addressNo')}
                id="addresses-addressNo"
                name="addressNo"
                data-cy="addressNo"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.addresses.zipCode')}
                id="addresses-zipCode"
                name="zipCode"
                data-cy="zipCode"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.addresses.prosfLetter')}
                id="addresses-prosfLetter"
                name="prosfLetter"
                data-cy="prosfLetter"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.addresses.nameLetter')}
                id="addresses-nameLetter"
                name="nameLetter"
                data-cy="nameLetter"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.addresses.letterClose')}
                id="addresses-letterClose"
                name="letterClose"
                data-cy="letterClose"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.addresses.firstLabel')}
                id="addresses-firstLabel"
                name="firstLabel"
                data-cy="firstLabel"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.addresses.secondLabel')}
                id="addresses-secondLabel"
                name="secondLabel"
                data-cy="secondLabel"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.addresses.thirdLabel')}
                id="addresses-thirdLabel"
                name="thirdLabel"
                data-cy="thirdLabel"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.addresses.fourthLabel')}
                id="addresses-fourthLabel"
                name="fourthLabel"
                data-cy="fourthLabel"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.addresses.fifthLabel')}
                id="addresses-fifthLabel"
                name="fifthLabel"
                data-cy="fifthLabel"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.addresses.favourite')}
                id="addresses-favourite"
                name="favourite"
                data-cy="favourite"
                check
                type="checkbox"
              />
              <ValidatedField
                id="addresses-country"
                name="country"
                data-cy="country"
                label={translate('hermesreactApp.addresses.country')}
                type="select"
              >
                <option value="" key="0" />
                {countries
                  ? countries.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="addresses-kind"
                name="kind"
                data-cy="kind"
                label={translate('hermesreactApp.addresses.kind')}
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
                id="addresses-region"
                name="region"
                data-cy="region"
                label={translate('hermesreactApp.addresses.region')}
                type="select"
              >
                <option value="" key="0" />
                {regions
                  ? regions.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="addresses-company"
                name="company"
                data-cy="company"
                label={translate('hermesreactApp.addresses.company')}
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
                id="addresses-citizen"
                name="citizen"
                data-cy="citizen"
                label={translate('hermesreactApp.addresses.citizen')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/addresses" replace color="info">
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

export default AddressesUpdate;
