package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.ContactTypes;
import gr.adr.hermes.repository.ContactTypesRepository;
import gr.adr.hermes.repository.search.ContactTypesSearchRepository;
import gr.adr.hermes.service.ContactTypesService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ContactTypes}.
 */
@Service
@Transactional
public class ContactTypesServiceImpl implements ContactTypesService {

    private final Logger log = LoggerFactory.getLogger(ContactTypesServiceImpl.class);

    private final ContactTypesRepository contactTypesRepository;

    private final ContactTypesSearchRepository contactTypesSearchRepository;

    public ContactTypesServiceImpl(
        ContactTypesRepository contactTypesRepository,
        ContactTypesSearchRepository contactTypesSearchRepository
    ) {
        this.contactTypesRepository = contactTypesRepository;
        this.contactTypesSearchRepository = contactTypesSearchRepository;
    }

    @Override
    public ContactTypes save(ContactTypes contactTypes) {
        log.debug("Request to save ContactTypes : {}", contactTypes);
        ContactTypes result = contactTypesRepository.save(contactTypes);
        contactTypesSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<ContactTypes> partialUpdate(ContactTypes contactTypes) {
        log.debug("Request to partially update ContactTypes : {}", contactTypes);

        return contactTypesRepository
            .findById(contactTypes.getId())
            .map(existingContactTypes -> {
                if (contactTypes.getName() != null) {
                    existingContactTypes.setName(contactTypes.getName());
                }

                return existingContactTypes;
            })
            .map(contactTypesRepository::save)
            .map(savedContactTypes -> {
                contactTypesSearchRepository.save(savedContactTypes);

                return savedContactTypes;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ContactTypes> findAll(Pageable pageable) {
        log.debug("Request to get all ContactTypes");
        return contactTypesRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ContactTypes> findOne(Long id) {
        log.debug("Request to get ContactTypes : {}", id);
        return contactTypesRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ContactTypes : {}", id);
        contactTypesRepository.deleteById(id);
        contactTypesSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ContactTypes> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ContactTypes for query {}", query);
        return contactTypesSearchRepository.search(query, pageable);
    }
}
