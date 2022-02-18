import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICitizenFolders } from 'app/shared/model/citizen-folders.model';
import { getEntities as getCitizenFolders } from 'app/entities/citizen-folders/citizen-folders.reducer';
import { ICompanies } from 'app/shared/model/companies.model';
import { getEntities as getCompanies } from 'app/entities/companies/companies.reducer';
import { IMaritalStatus } from 'app/shared/model/marital-status.model';
import { getEntities as getMaritalStatuses } from 'app/entities/marital-status/marital-status.reducer';
import { ITeams } from 'app/shared/model/teams.model';
import { getEntities as getTeams } from 'app/entities/teams/teams.reducer';
import { ICodes } from 'app/shared/model/codes.model';
import { getEntities as getCodes } from 'app/entities/codes/codes.reducer';
import { IOrigins } from 'app/shared/model/origins.model';
import { getEntities as getOrigins } from 'app/entities/origins/origins.reducer';
import { IJobs } from 'app/shared/model/jobs.model';
import { getEntities as getJobs } from 'app/entities/jobs/jobs.reducer';
import { getEntity, updateEntity, createEntity, reset } from './citizens.reducer';
import { ICitizens } from 'app/shared/model/citizens.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CitizensUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const citizenFolders = useAppSelector(state => state.citizenFolders.entities);
  const companies = useAppSelector(state => state.companies.entities);
  const maritalStatuses = useAppSelector(state => state.maritalStatus.entities);
  const teams = useAppSelector(state => state.teams.entities);
  const codes = useAppSelector(state => state.codes.entities);
  const origins = useAppSelector(state => state.origins.entities);
  const jobs = useAppSelector(state => state.jobs.entities);
  const citizensEntity = useAppSelector(state => state.citizens.entity);
  const loading = useAppSelector(state => state.citizens.loading);
  const updating = useAppSelector(state => state.citizens.updating);
  const updateSuccess = useAppSelector(state => state.citizens.updateSuccess);
  const handleClose = () => {
    props.history.push('/citizens' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCitizenFolders({}));
    dispatch(getCompanies({}));
    dispatch(getMaritalStatuses({}));
    dispatch(getTeams({}));
    dispatch(getCodes({}));
    dispatch(getOrigins({}));
    dispatch(getJobs({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...citizensEntity,
      ...values,
      folder: citizenFolders.find(it => it.id.toString() === values.folder.toString()),
      company: companies.find(it => it.id.toString() === values.company.toString()),
      maritalStatus: maritalStatuses.find(it => it.id.toString() === values.maritalStatus.toString()),
      team: teams.find(it => it.id.toString() === values.team.toString()),
      code: codes.find(it => it.id.toString() === values.code.toString()),
      origin: origins.find(it => it.id.toString() === values.origin.toString()),
      job: jobs.find(it => it.id.toString() === values.job.toString()),
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
          ...citizensEntity,
          folder: citizensEntity?.folder?.id,
          company: citizensEntity?.company?.id,
          maritalStatus: citizensEntity?.maritalStatus?.id,
          team: citizensEntity?.team?.id,
          code: citizensEntity?.code?.id,
          origin: citizensEntity?.origin?.id,
          job: citizensEntity?.job?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hermesreactApp.citizens.home.createOrEditLabel" data-cy="CitizensCreateUpdateHeading">
            <Translate contentKey="hermesreactApp.citizens.home.createOrEditLabel">Create or edit a Citizens</Translate>
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
                  id="citizens-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('hermesreactApp.citizens.title')}
                id="citizens-title"
                name="title"
                data-cy="title"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.citizens.lastname')}
                id="citizens-lastname"
                name="lastname"
                data-cy="lastname"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.citizens.firstname')}
                id="citizens-firstname"
                name="firstname"
                data-cy="firstname"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.citizens.fathersName')}
                id="citizens-fathersName"
                name="fathersName"
                data-cy="fathersName"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.citizens.comments')}
                id="citizens-comments"
                name="comments"
                data-cy="comments"
                type="textarea"
              />
              <ValidatedField
                label={translate('hermesreactApp.citizens.birthDate')}
                id="citizens-birthDate"
                name="birthDate"
                data-cy="birthDate"
                type="date"
              />
              <ValidatedField
                label={translate('hermesreactApp.citizens.giortazi')}
                id="citizens-giortazi"
                name="giortazi"
                data-cy="giortazi"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.citizens.male')}
                id="citizens-male"
                name="male"
                data-cy="male"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('hermesreactApp.citizens.meLetter')}
                id="citizens-meLetter"
                name="meLetter"
                data-cy="meLetter"
                type="text"
              />
              <ValidatedField
                label={translate('hermesreactApp.citizens.meLabel')}
                id="citizens-meLabel"
                name="meLabel"
                data-cy="meLabel"
                type="text"
              />
              <ValidatedBlobField
                label={translate('hermesreactApp.citizens.image')}
                id="citizens-image"
                name="image"
                data-cy="image"
                isImage
                accept="image/*"
              />
              <ValidatedField
                id="citizens-folder"
                name="folder"
                data-cy="folder"
                label={translate('hermesreactApp.citizens.folder')}
                type="select"
              >
                <option value="" key="0" />
                {citizenFolders
                  ? citizenFolders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="citizens-company"
                name="company"
                data-cy="company"
                label={translate('hermesreactApp.citizens.company')}
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
                id="citizens-maritalStatus"
                name="maritalStatus"
                data-cy="maritalStatus"
                label={translate('hermesreactApp.citizens.maritalStatus')}
                type="select"
              >
                <option value="" key="0" />
                {maritalStatuses
                  ? maritalStatuses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="citizens-team" name="team" data-cy="team" label={translate('hermesreactApp.citizens.team')} type="select">
                <option value="" key="0" />
                {teams
                  ? teams.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="citizens-code" name="code" data-cy="code" label={translate('hermesreactApp.citizens.code')} type="select">
                <option value="" key="0" />
                {codes
                  ? codes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="citizens-origin"
                name="origin"
                data-cy="origin"
                label={translate('hermesreactApp.citizens.origin')}
                type="select"
              >
                <option value="" key="0" />
                {origins
                  ? origins.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="citizens-job" name="job" data-cy="job" label={translate('hermesreactApp.citizens.job')} type="select">
                <option value="" key="0" />
                {jobs
                  ? jobs.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/citizens" replace color="info">
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

export default CitizensUpdate;
