import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { Translate, translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { searchEntities, getEntities } from './addresses.reducer';
import { IAddresses } from 'app/shared/model/addresses.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Addresses = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const addressesList = useAppSelector(state => state.addresses.entities);
  const loading = useAppSelector(state => state.addresses.loading);
  const totalItems = useAppSelector(state => state.addresses.totalItems);

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
      <h2 id="addresses-heading" data-cy="AddressesHeading">
        <Translate contentKey="hermesreactApp.addresses.home.title">Addresses</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hermesreactApp.addresses.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hermesreactApp.addresses.home.createLabel">Create new Addresses</Translate>
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
                  placeholder={translate('hermesreactApp.addresses.home.search')}
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
        {addressesList && addressesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="hermesreactApp.addresses.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('address')}>
                  <Translate contentKey="hermesreactApp.addresses.address">Address</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('addressNo')}>
                  <Translate contentKey="hermesreactApp.addresses.addressNo">Address No</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('zipCode')}>
                  <Translate contentKey="hermesreactApp.addresses.zipCode">Zip Code</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prosfLetter')}>
                  <Translate contentKey="hermesreactApp.addresses.prosfLetter">Prosf Letter</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nameLetter')}>
                  <Translate contentKey="hermesreactApp.addresses.nameLetter">Name Letter</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('letterClose')}>
                  <Translate contentKey="hermesreactApp.addresses.letterClose">Letter Close</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('firstLabel')}>
                  <Translate contentKey="hermesreactApp.addresses.firstLabel">First Label</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('secondLabel')}>
                  <Translate contentKey="hermesreactApp.addresses.secondLabel">Second Label</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('thirdLabel')}>
                  <Translate contentKey="hermesreactApp.addresses.thirdLabel">Third Label</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fourthLabel')}>
                  <Translate contentKey="hermesreactApp.addresses.fourthLabel">Fourth Label</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fifthLabel')}>
                  <Translate contentKey="hermesreactApp.addresses.fifthLabel">Fifth Label</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('favourite')}>
                  <Translate contentKey="hermesreactApp.addresses.favourite">Favourite</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesreactApp.addresses.country">Country</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesreactApp.addresses.kind">Kind</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesreactApp.addresses.region">Region</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesreactApp.addresses.company">Company</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesreactApp.addresses.citizen">Citizen</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {addressesList.map((addresses, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${addresses.id}`} color="link" size="sm">
                      {addresses.id}
                    </Button>
                  </td>
                  <td>{addresses.address}</td>
                  <td>{addresses.addressNo}</td>
                  <td>{addresses.zipCode}</td>
                  <td>{addresses.prosfLetter}</td>
                  <td>{addresses.nameLetter}</td>
                  <td>{addresses.letterClose}</td>
                  <td>{addresses.firstLabel}</td>
                  <td>{addresses.secondLabel}</td>
                  <td>{addresses.thirdLabel}</td>
                  <td>{addresses.fourthLabel}</td>
                  <td>{addresses.fifthLabel}</td>
                  <td>{addresses.favourite ? 'true' : 'false'}</td>
                  <td>{addresses.country ? <Link to={`countries/${addresses.country.id}`}>{addresses.country.name}</Link> : ''}</td>
                  <td>{addresses.kind ? <Link to={`contact-types/${addresses.kind.id}`}>{addresses.kind.name}</Link> : ''}</td>
                  <td>{addresses.region ? <Link to={`regions/${addresses.region.id}`}>{addresses.region.name}</Link> : ''}</td>
                  <td>{addresses.company ? <Link to={`companies/${addresses.company.id}`}>{addresses.company.name}</Link> : ''}</td>
                  <td>{addresses.citizen ? <Link to={`citizens/${addresses.citizen.id}`}>{addresses.citizen.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${addresses.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${addresses.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${addresses.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="hermesreactApp.addresses.home.notFound">No Addresses found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={addressesList && addressesList.length > 0 ? '' : 'd-none'}>
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

export default Addresses;
