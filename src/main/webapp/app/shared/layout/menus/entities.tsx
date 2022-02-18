import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="asterisk" to="/jobs">
      <Translate contentKey="global.menu.entities.jobs" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/countries">
      <Translate contentKey="global.menu.entities.countries" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/regions">
      <Translate contentKey="global.menu.entities.regions" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cities">
      <Translate contentKey="global.menu.entities.cities" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/zip-codes">
      <Translate contentKey="global.menu.entities.zipCodes" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/addresses">
      <Translate contentKey="global.menu.entities.addresses" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/phones">
      <Translate contentKey="global.menu.entities.phones" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/emails">
      <Translate contentKey="global.menu.entities.emails" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/phone-types">
      <Translate contentKey="global.menu.entities.phoneTypes" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/contact-types">
      <Translate contentKey="global.menu.entities.contactTypes" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/social-kinds">
      <Translate contentKey="global.menu.entities.socialKinds" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/social-contacts">
      <Translate contentKey="global.menu.entities.socialContacts" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/company-kinds">
      <Translate contentKey="global.menu.entities.companyKinds" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/companies">
      <Translate contentKey="global.menu.entities.companies" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/codes">
      <Translate contentKey="global.menu.entities.codes" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/teams">
      <Translate contentKey="global.menu.entities.teams" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/origins">
      <Translate contentKey="global.menu.entities.origins" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/citizen-folders">
      <Translate contentKey="global.menu.entities.citizenFolders" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/marital-status">
      <Translate contentKey="global.menu.entities.maritalStatus" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/citizens">
      <Translate contentKey="global.menu.entities.citizens" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/citizens-relations">
      <Translate contentKey="global.menu.entities.citizensRelations" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/citizens-meetings">
      <Translate contentKey="global.menu.entities.citizensMeetings" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
