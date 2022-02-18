import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICitizens } from 'app/shared/model/citizens.model';
import { getEntities as getCitizens } from 'app/entities/citizens/citizens.reducer';
import { getEntity, updateEntity, createEntity, reset } from './citizens-relations.reducer';
import { ICitizensRelations } from 'app/shared/model/citizens-relations.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CitizensRelationsUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const citizens = useAppSelector(state => state.citizens.entities);
  const citizensRelationsEntity = useAppSelector(state => state.citizensRelations.entity);
  const loading = useAppSelector(state => state.citizensRelations.loading);
  const updating = useAppSelector(state => state.citizensRelations.updating);
  const updateSuccess = useAppSelector(state => state.citizensRelations.updateSuccess);
  const handleClose = () => {
    props.history.push('/citizens-relations' + props.location.search);
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
      ...citizensRelationsEntity,
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
          ...citizensRelationsEntity,
          citizen: citizensRelationsEntity?.citizen?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hermesreactApp.citizensRelations.home.createOrEditLabel" data-cy="CitizensRelationsCreateUpdateHeading">
            <Translate contentKey="hermesreactApp.citizensRelations.home.createOrEditLabel">Create or edit a CitizensRelations</Translate>
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
                  id="citizens-relations-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('hermesreactApp.citizensRelations.name')}
                id="citizens-relations-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="citizens-relations-citizen"
                name="citizen"
                data-cy="citizen"
                label={translate('hermesreactApp.citizensRelations.citizen')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/citizens-relations" replace color="info">
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

export default CitizensRelationsUpdate;
