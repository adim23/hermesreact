package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.CitizensRelations;
import gr.adr.hermes.repository.CitizensRelationsRepository;
import gr.adr.hermes.repository.search.CitizensRelationsSearchRepository;
import gr.adr.hermes.service.CitizensRelationsService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link CitizensRelations}.
 */
@Service
@Transactional
public class CitizensRelationsServiceImpl implements CitizensRelationsService {

    private final Logger log = LoggerFactory.getLogger(CitizensRelationsServiceImpl.class);

    private final CitizensRelationsRepository citizensRelationsRepository;

    private final CitizensRelationsSearchRepository citizensRelationsSearchRepository;

    public CitizensRelationsServiceImpl(
        CitizensRelationsRepository citizensRelationsRepository,
        CitizensRelationsSearchRepository citizensRelationsSearchRepository
    ) {
        this.citizensRelationsRepository = citizensRelationsRepository;
        this.citizensRelationsSearchRepository = citizensRelationsSearchRepository;
    }

    @Override
    public CitizensRelations save(CitizensRelations citizensRelations) {
        log.debug("Request to save CitizensRelations : {}", citizensRelations);
        CitizensRelations result = citizensRelationsRepository.save(citizensRelations);
        citizensRelationsSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<CitizensRelations> partialUpdate(CitizensRelations citizensRelations) {
        log.debug("Request to partially update CitizensRelations : {}", citizensRelations);

        return citizensRelationsRepository
            .findById(citizensRelations.getId())
            .map(existingCitizensRelations -> {
                if (citizensRelations.getName() != null) {
                    existingCitizensRelations.setName(citizensRelations.getName());
                }

                return existingCitizensRelations;
            })
            .map(citizensRelationsRepository::save)
            .map(savedCitizensRelations -> {
                citizensRelationsSearchRepository.save(savedCitizensRelations);

                return savedCitizensRelations;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CitizensRelations> findAll(Pageable pageable) {
        log.debug("Request to get all CitizensRelations");
        return citizensRelationsRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CitizensRelations> findOne(Long id) {
        log.debug("Request to get CitizensRelations : {}", id);
        return citizensRelationsRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CitizensRelations : {}", id);
        citizensRelationsRepository.deleteById(id);
        citizensRelationsSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CitizensRelations> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of CitizensRelations for query {}", query);
        return citizensRelationsSearchRepository.search(query, pageable);
    }
}
