package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.MaritalStatus;
import gr.adr.hermes.repository.MaritalStatusRepository;
import gr.adr.hermes.repository.search.MaritalStatusSearchRepository;
import gr.adr.hermes.service.MaritalStatusService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link MaritalStatus}.
 */
@Service
@Transactional
public class MaritalStatusServiceImpl implements MaritalStatusService {

    private final Logger log = LoggerFactory.getLogger(MaritalStatusServiceImpl.class);

    private final MaritalStatusRepository maritalStatusRepository;

    private final MaritalStatusSearchRepository maritalStatusSearchRepository;

    public MaritalStatusServiceImpl(
        MaritalStatusRepository maritalStatusRepository,
        MaritalStatusSearchRepository maritalStatusSearchRepository
    ) {
        this.maritalStatusRepository = maritalStatusRepository;
        this.maritalStatusSearchRepository = maritalStatusSearchRepository;
    }

    @Override
    public MaritalStatus save(MaritalStatus maritalStatus) {
        log.debug("Request to save MaritalStatus : {}", maritalStatus);
        MaritalStatus result = maritalStatusRepository.save(maritalStatus);
        maritalStatusSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<MaritalStatus> partialUpdate(MaritalStatus maritalStatus) {
        log.debug("Request to partially update MaritalStatus : {}", maritalStatus);

        return maritalStatusRepository
            .findById(maritalStatus.getId())
            .map(existingMaritalStatus -> {
                if (maritalStatus.getName() != null) {
                    existingMaritalStatus.setName(maritalStatus.getName());
                }

                return existingMaritalStatus;
            })
            .map(maritalStatusRepository::save)
            .map(savedMaritalStatus -> {
                maritalStatusSearchRepository.save(savedMaritalStatus);

                return savedMaritalStatus;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<MaritalStatus> findAll(Pageable pageable) {
        log.debug("Request to get all MaritalStatuses");
        return maritalStatusRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<MaritalStatus> findOne(Long id) {
        log.debug("Request to get MaritalStatus : {}", id);
        return maritalStatusRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete MaritalStatus : {}", id);
        maritalStatusRepository.deleteById(id);
        maritalStatusSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<MaritalStatus> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of MaritalStatuses for query {}", query);
        return maritalStatusSearchRepository.search(query, pageable);
    }
}
