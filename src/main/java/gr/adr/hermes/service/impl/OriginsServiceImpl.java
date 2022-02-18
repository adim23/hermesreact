package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.Origins;
import gr.adr.hermes.repository.OriginsRepository;
import gr.adr.hermes.repository.search.OriginsSearchRepository;
import gr.adr.hermes.service.OriginsService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Origins}.
 */
@Service
@Transactional
public class OriginsServiceImpl implements OriginsService {

    private final Logger log = LoggerFactory.getLogger(OriginsServiceImpl.class);

    private final OriginsRepository originsRepository;

    private final OriginsSearchRepository originsSearchRepository;

    public OriginsServiceImpl(OriginsRepository originsRepository, OriginsSearchRepository originsSearchRepository) {
        this.originsRepository = originsRepository;
        this.originsSearchRepository = originsSearchRepository;
    }

    @Override
    public Origins save(Origins origins) {
        log.debug("Request to save Origins : {}", origins);
        Origins result = originsRepository.save(origins);
        originsSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<Origins> partialUpdate(Origins origins) {
        log.debug("Request to partially update Origins : {}", origins);

        return originsRepository
            .findById(origins.getId())
            .map(existingOrigins -> {
                if (origins.getName() != null) {
                    existingOrigins.setName(origins.getName());
                }

                return existingOrigins;
            })
            .map(originsRepository::save)
            .map(savedOrigins -> {
                originsSearchRepository.save(savedOrigins);

                return savedOrigins;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Origins> findAll(Pageable pageable) {
        log.debug("Request to get all Origins");
        return originsRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Origins> findOne(Long id) {
        log.debug("Request to get Origins : {}", id);
        return originsRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Origins : {}", id);
        originsRepository.deleteById(id);
        originsSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Origins> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Origins for query {}", query);
        return originsSearchRepository.search(query, pageable);
    }
}
