package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.Companies;
import gr.adr.hermes.repository.CompaniesRepository;
import gr.adr.hermes.repository.search.CompaniesSearchRepository;
import gr.adr.hermes.service.CompaniesService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Companies}.
 */
@Service
@Transactional
public class CompaniesServiceImpl implements CompaniesService {

    private final Logger log = LoggerFactory.getLogger(CompaniesServiceImpl.class);

    private final CompaniesRepository companiesRepository;

    private final CompaniesSearchRepository companiesSearchRepository;

    public CompaniesServiceImpl(CompaniesRepository companiesRepository, CompaniesSearchRepository companiesSearchRepository) {
        this.companiesRepository = companiesRepository;
        this.companiesSearchRepository = companiesSearchRepository;
    }

    @Override
    public Companies save(Companies companies) {
        log.debug("Request to save Companies : {}", companies);
        Companies result = companiesRepository.save(companies);
        companiesSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<Companies> partialUpdate(Companies companies) {
        log.debug("Request to partially update Companies : {}", companies);

        return companiesRepository
            .findById(companies.getId())
            .map(existingCompanies -> {
                if (companies.getName() != null) {
                    existingCompanies.setName(companies.getName());
                }

                return existingCompanies;
            })
            .map(companiesRepository::save)
            .map(savedCompanies -> {
                companiesSearchRepository.save(savedCompanies);

                return savedCompanies;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Companies> findAll(Pageable pageable) {
        log.debug("Request to get all Companies");
        return companiesRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Companies> findOne(Long id) {
        log.debug("Request to get Companies : {}", id);
        return companiesRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Companies : {}", id);
        companiesRepository.deleteById(id);
        companiesSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Companies> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Companies for query {}", query);
        return companiesSearchRepository.search(query, pageable);
    }
}
