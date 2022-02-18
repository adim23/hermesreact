package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.Regions;
import gr.adr.hermes.repository.RegionsRepository;
import gr.adr.hermes.repository.search.RegionsSearchRepository;
import gr.adr.hermes.service.RegionsService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Regions}.
 */
@Service
@Transactional
public class RegionsServiceImpl implements RegionsService {

    private final Logger log = LoggerFactory.getLogger(RegionsServiceImpl.class);

    private final RegionsRepository regionsRepository;

    private final RegionsSearchRepository regionsSearchRepository;

    public RegionsServiceImpl(RegionsRepository regionsRepository, RegionsSearchRepository regionsSearchRepository) {
        this.regionsRepository = regionsRepository;
        this.regionsSearchRepository = regionsSearchRepository;
    }

    @Override
    public Regions save(Regions regions) {
        log.debug("Request to save Regions : {}", regions);
        Regions result = regionsRepository.save(regions);
        regionsSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<Regions> partialUpdate(Regions regions) {
        log.debug("Request to partially update Regions : {}", regions);

        return regionsRepository
            .findById(regions.getId())
            .map(existingRegions -> {
                if (regions.getName() != null) {
                    existingRegions.setName(regions.getName());
                }

                return existingRegions;
            })
            .map(regionsRepository::save)
            .map(savedRegions -> {
                regionsSearchRepository.save(savedRegions);

                return savedRegions;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Regions> findAll(Pageable pageable) {
        log.debug("Request to get all Regions");
        return regionsRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Regions> findOne(Long id) {
        log.debug("Request to get Regions : {}", id);
        return regionsRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Regions : {}", id);
        regionsRepository.deleteById(id);
        regionsSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Regions> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Regions for query {}", query);
        return regionsSearchRepository.search(query, pageable);
    }
}
