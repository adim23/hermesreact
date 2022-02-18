import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICountries } from 'app/shared/model/countries.model';
import { getEntities as getCountries } from 'app/entities/countries/countries.reducer';
import { IRegions } from 'app/shared/model/regions.model';
import { getEntities as getRegions } from 'app/entities/regions/regions.reducer';
import { getEntity, updateEntity, createEntity, reset } from './cities.reducer';
import { ICities } from 'app/shared/model/cities.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CitiesUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const countries = useAppSelector(state => state.countries.entities);
  const regions = useAppSelector(state => state.regions.entities);
  const citiesEntity = useAppSelector(state => state.cities.entity);
  const loading = useAppSelector(state => state.cities.loading);
  const updating = useAppSelector(state => state.cities.updating);
  const updateSuccess = useAppSelector(state => state.cities.updateSuccess);
  const handleClose = () => {
    props.history.push('/cities' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCountries({}));
    dispatch(getRegions({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...citiesEntity,
      ...values,
      country: countries.find(it => it.id.toString() === values.country.toString()),
      region: regions.find(it => it.id.toString() === values.region.toString()),
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
          ...citiesEntity,
          country: citiesEntity?.country?.id,
          region: citiesEntity?.region?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hermesreactApp.cities.home.createOrEditLabel" data-cy="CitiesCreateUpdateHeading">
            <Translate contentKey="hermesreactApp.cities.home.createOrEditLabel">Create or edit a Cities</Translate>
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
                  id="cities-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('hermesreactApp.cities.name')}
                id="cities-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('hermesreactApp.cities.president')}
                id="cities-president"
                name="president"
                data-cy="president"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.cities.presidentsPhone')}
                id="cities-presidentsPhone"
                name="presidentsPhone"
                data-cy="presidentsPhone"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.cities.secretary')}
                id="cities-secretary"
                name="secretary"
                data-cy="secretary"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.cities.secretarysPhone')}
                id="cities-secretarysPhone"
                name="secretarysPhone"
                data-cy="secretarysPhone"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.cities.police')}
                id="cities-police"
                name="police"
                data-cy="police"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.cities.policesPhone')}
                id="cities-policesPhone"
                name="policesPhone"
                data-cy="policesPhone"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.cities.doctor')}
                id="cities-doctor"
                name="doctor"
                data-cy="doctor"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.cities.doctorsPhone')}
                id="cities-doctorsPhone"
                name="doctorsPhone"
                data-cy="doctorsPhone"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.cities.teacher')}
                id="cities-teacher"
                name="teacher"
                data-cy="teacher"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.cities.teachersPhone')}
                id="cities-teachersPhone"
                name="teachersPhone"
                data-cy="teachersPhone"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.cities.priest')}
                id="cities-priest"
                name="priest"
                data-cy="priest"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.cities.priestsPhone')}
                id="cities-priestsPhone"
                name="priestsPhone"
                data-cy="priestsPhone"
                type="text"
              />
              <ValidatedField
                id="cities-country"
                name="country"
                data-cy="country"
                label={translate('hermesreactApp.cities.country')}
                type="select"
                required
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
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="cities-region"
                name="region"
                data-cy="region"
                label={translate('hermesreactApp.cities.region')}
                type="select"
                required
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
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/cities" replace color="info">
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

export default CitiesUpdate;
