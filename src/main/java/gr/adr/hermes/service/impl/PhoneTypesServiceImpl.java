package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.PhoneTypes;
import gr.adr.hermes.repository.PhoneTypesRepository;
import gr.adr.hermes.repository.search.PhoneTypesSearchRepository;
import gr.adr.hermes.service.PhoneTypesService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link PhoneTypes}.
 */
@Service
@Transactional
public class PhoneTypesServiceImpl implements PhoneTypesService {

    private final Logger log = LoggerFactory.getLogger(PhoneTypesServiceImpl.class);

    private final PhoneTypesRepository phoneTypesRepository;

    private final PhoneTypesSearchRepository phoneTypesSearchRepository;

    public PhoneTypesServiceImpl(PhoneTypesRepository phoneTypesRepository, PhoneTypesSearchRepository phoneTypesSearchRepository) {
        this.phoneTypesRepository = phoneTypesRepository;
        this.phoneTypesSearchRepository = phoneTypesSearchRepository;
    }

    @Override
    public PhoneTypes save(PhoneTypes phoneTypes) {
        log.debug("Request to save PhoneTypes : {}", phoneTypes);
        PhoneTypes result = phoneTypesRepository.save(phoneTypes);
        phoneTypesSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<PhoneTypes> partialUpdate(PhoneTypes phoneTypes) {
        log.debug("Request to partially update PhoneTypes : {}", phoneTypes);

        return phoneTypesRepository
            .findById(phoneTypes.getId())
            .map(existingPhoneTypes -> {
                if (phoneTypes.getName() != null) {
                    existingPhoneTypes.setName(phoneTypes.getName());
                }

                return existingPhoneTypes;
            })
            .map(phoneTypesRepository::save)
            .map(savedPhoneTypes -> {
                phoneTypesSearchRepository.save(savedPhoneTypes);

                return savedPhoneTypes;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PhoneTypes> findAll(Pageable pageable) {
        log.debug("Request to get all PhoneTypes");
        return phoneTypesRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PhoneTypes> findOne(Long id) {
        log.debug("Request to get PhoneTypes : {}", id);
        return phoneTypesRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete PhoneTypes : {}", id);
        phoneTypesRepository.deleteById(id);
        phoneTypesSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PhoneTypes> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of PhoneTypes for query {}", query);
        return phoneTypesSearchRepository.search(query, pageable);
    }
}
