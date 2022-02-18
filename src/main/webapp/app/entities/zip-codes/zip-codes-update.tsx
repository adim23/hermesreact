import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICountries } from 'app/shared/model/countries.model';
import { getEntities as getCountries } from 'app/entities/countries/countries.reducer';
import { IRegions } from 'app/shared/model/regions.model';
import { getEntities as getRegions } from 'app/entities/regions/regions.reducer';
import { ICities } from 'app/shared/model/cities.model';
import { getEntities as getCities } from 'app/entities/cities/cities.reducer';
import { getEntity, updateEntity, createEntity, reset } from './zip-codes.reducer';
import { IZipCodes } from 'app/shared/model/zip-codes.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ZipCodesUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const countries = useAppSelector(state => state.countries.entities);
  const regions = useAppSelector(state => state.regions.entities);
  const cities = useAppSelector(state => state.cities.entities);
  const zipCodesEntity = useAppSelector(state => state.zipCodes.entity);
  const loading = useAppSelector(state => state.zipCodes.loading);
  const updating = useAppSelector(state => state.zipCodes.updating);
  const updateSuccess = useAppSelector(state => state.zipCodes.updateSuccess);
  const handleClose = () => {
    props.history.push('/zip-codes' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCountries({}));
    dispatch(getRegions({}));
    dispatch(getCities({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...zipCodesEntity,
      ...values,
      country: countries.find(it => it.id.toString() === values.country.toString()),
      region: regions.find(it => it.id.toString() === values.region.toString()),
      city: cities.find(it => it.id.toString() === values.city.toString()),
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
          ...zipCodesEntity,
          country: zipCodesEntity?.country?.id,
          region: zipCodesEntity?.region?.id,
          city: zipCodesEntity?.city?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hermesreactApp.zipCodes.home.createOrEditLabel" data-cy="ZipCodesCreateUpdateHeading">
            <Translate contentKey="hermesreactApp.zipCodes.home.createOrEditLabel">Create or edit a ZipCodes</Translate>
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
                  id="zip-codes-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('hermesreactApp.zipCodes.street')}
                id="zip-codes-street"
                name="street"
                data-cy="street"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.zipCodes.area')}
                id="zip-codes-area"
                name="area"
                data-cy="area"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.zipCodes.fromNumber')}
                id="zip-codes-fromNumber"
                name="fromNumber"
                data-cy="fromNumber"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.zipCodes.toNumber')}
                id="zip-codes-toNumber"
                name="toNumber"
                data-cy="toNumber"
                type="text"
              />
              <ValidatedField
                id="zip-codes-country"
                name="country"
                data-cy="country"
                label={translate('hermesreactApp.zipCodes.country')}
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
                id="zip-codes-region"
                name="region"
                data-cy="region"
                label={translate('hermesreactApp.zipCodes.region')}
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
                id="zip-codes-city"
                name="city"
                data-cy="city"
                label={translate('hermesreactApp.zipCodes.city')}
                type="select"
              >
                <option value="" key="0" />
                {cities
                  ? cities.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/zip-codes" replace color="info">
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

export default ZipCodesUpdate;
