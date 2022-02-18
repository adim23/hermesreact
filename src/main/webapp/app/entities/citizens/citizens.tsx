import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { openFile, byteSize, Translate, translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { searchEntities, getEntities } from './citizens.reducer';
import { ICitizens } from 'app/shared/model/citizens.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Citizens = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const citizensList = useAppSelector(state => state.citizens.entities);
  const loading = useAppSelector(state => state.citizens.loading);
  const totalItems = useAppSelector(state => state.citizens.totalItems);

  const getAllEntities = () => {
    if (search) {
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    } else {
      dispatch(
        getEntities({
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
  };

  const startSearching = e => {
    if (search) {
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
    e.preventDefault();
  };

  const clear = () => {
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  const handleSearch = event => setSearch(event.target.value);

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, search]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { match } = props;

  return (
    <div>
      <h2 id="citizens-heading" data-cy="CitizensHeading">
        <Translate contentKey="hermesreactApp.citizens.home.title">Citizens</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hermesreactApp.citizens.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hermesreactApp.citizens.home.createLabel">Create new Citizens</Translate>
          </Link>
        </div>
      </h2>
      <Row>
        <Col sm="12">
          <Form onSubmit={startSearching}>
            <FormGroup>
              <InputGroup>
                <Input
                  type="text"
                  name="search"
                  defaultValue={search}
                  onChange={handleSearch}
                  placeholder={translate('hermesreactApp.citizens.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <div className="table-responsive">
        {citizensList && citizensList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="hermesreactApp.citizens.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('title')}>
                  <Translate contentKey="hermesreactApp.citizens.title">Title</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastname')}>
                  <Translate contentKey="hermesreactApp.citizens.lastname">Lastname</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('firstname')}>
                  <Translate contentKey="hermesreactApp.citizens.firstname">Firstname</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fathersName')}>
                  <Translate contentKey="hermesreactApp.citizens.fathersName">Fathers Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('comments')}>
                  <Translate contentKey="hermesreactApp.citizens.comments">Comments</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('birthDate')}>
                  <Translate contentKey="hermesreactApp.citizens.birthDate">Birth Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('giortazi')}>
                  <Translate contentKey="hermesreactApp.citizens.giortazi">Giortazi</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('male')}>
                  <Translate contentKey="hermesreactApp.citizens.male">Male</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('meLetter')}>
                  <Translate contentKey="hermesreactApp.citizens.meLetter">Me Letter</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('meLabel')}>
                  <Translate contentKey="hermesreactApp.citizens.meLabel">Me Label</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('image')}>
                  <Translate contentKey="hermesreactApp.citizens.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesreactApp.citizens.folder">Folder</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesreactApp.citizens.company">Company</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesreactApp.citizens.maritalStatus">Marital Status</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesreactApp.citizens.team">Team</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesreactApp.citizens.code">Code</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesreactApp.citizens.origin">Origin</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesreactApp.citizens.job">Job</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {citizensList.map((citizens, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${citizens.id}`} color="link" size="sm">
                      {citizens.id}
                    </Button>
                  </td>
                  <td>{citizens.title}</td>
                  <td>{citizens.lastname}</td>
                  <td>{citizens.firstname}</td>
                  <td>{citizens.fathersName}</td>
                  <td>{citizens.comments}</td>
                  <td>
                    {citizens.birthDate ? <TextFormat type="date" value={citizens.birthDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{citizens.giortazi}</td>
                  <td>{citizens.male ? 'true' : 'false'}</td>
                  <td>{citizens.meLetter}</td>
                  <td>{citizens.meLabel}</td>
                  <td>
                    {citizens.image ? (
                      <div>
                        {citizens.imageContentType ? (
                          <a onClick={openFile(citizens.imageContentType, citizens.image)}>
                            <img src={`data:${citizens.imageContentType};base64,${citizens.image}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {citizens.imageContentType}, {byteSize(citizens.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{citizens.folder ? <Link to={`citizen-folders/${citizens.folder.id}`}>{citizens.folder.name}</Link> : ''}</td>
                  <td>{citizens.company ? <Link to={`companies/${citizens.company.id}`}>{citizens.company.name}</Link> : ''}</td>
                  <td>
                    {citizens.maritalStatus ? (
                      <Link to={`marital-status/${citizens.maritalStatus.id}`}>{citizens.maritalStatus.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{citizens.team ? <Link to={`teams/${citizens.team.id}`}>{citizens.team.name}</Link> : ''}</td>
                  <td>{citizens.code ? <Link to={`codes/${citizens.code.id}`}>{citizens.code.name}</Link> : ''}</td>
                  <td>{citizens.origin ? <Link to={`origins/${citizens.origin.id}`}>{citizens.origin.name}</Link> : ''}</td>
                  <td>{citizens.job ? <Link to={`jobs/${citizens.job.id}`}>{citizens.job.name}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${citizens.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${citizens.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${citizens.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="hermesreactApp.citizens.home.notFound">No Citizens found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={citizensList && citizensList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Citizens;
