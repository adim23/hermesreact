package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.Codes;
import gr.adr.hermes.repository.CodesRepository;
import gr.adr.hermes.repository.search.CodesSearchRepository;
import gr.adr.hermes.service.CodesService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Codes}.
 */
@Service
@Transactional
public class CodesServiceImpl implements CodesService {

    private final Logger log = LoggerFactory.getLogger(CodesServiceImpl.class);

    private final CodesRepository codesRepository;

    private final CodesSearchRepository codesSearchRepository;

    public CodesServiceImpl(CodesRepository codesRepository, CodesSearchRepository codesSearchRepository) {
        this.codesRepository = codesRepository;
        this.codesSearchRepository = codesSearchRepository;
    }

    @Override
    public Codes save(Codes codes) {
        log.debug("Request to save Codes : {}", codes);
        Codes result = codesRepository.save(codes);
        codesSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<Codes> partialUpdate(Codes codes) {
        log.debug("Request to partially update Codes : {}", codes);

        return codesRepository
            .findById(codes.getId())
            .map(existingCodes -> {
                if (codes.getName() != null) {
                    existingCodes.setName(codes.getName());
                }

                return existingCodes;
            })
            .map(codesRepository::save)
            .map(savedCodes -> {
                codesSearchRepository.save(savedCodes);

                return savedCodes;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Codes> findAll(Pageable pageable) {
        log.debug("Request to get all Codes");
        return codesRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Codes> findOne(Long id) {
        log.debug("Request to get Codes : {}", id);
        return codesRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Codes : {}", id);
        codesRepository.deleteById(id);
        codesSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Codes> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Codes for query {}", query);
        return codesSearchRepository.search(query, pageable);
    }
}
