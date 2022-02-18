package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.Countries;
import gr.adr.hermes.repository.CountriesRepository;
import gr.adr.hermes.repository.search.CountriesSearchRepository;
import gr.adr.hermes.service.CountriesService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Countries}.
 */
@Service
@Transactional
public class CountriesServiceImpl implements CountriesService {

    private final Logger log = LoggerFactory.getLogger(CountriesServiceImpl.class);

    private final CountriesRepository countriesRepository;

    private final CountriesSearchRepository countriesSearchRepository;

    public CountriesServiceImpl(CountriesRepository countriesRepository, CountriesSearchRepository countriesSearchRepository) {
        this.countriesRepository = countriesRepository;
        this.countriesSearchRepository = countriesSearchRepository;
    }

    @Override
    public Countries save(Countries countries) {
        log.debug("Request to save Countries : {}", countries);
        Countries result = countriesRepository.save(countries);
        countriesSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<Countries> partialUpdate(Countries countries) {
        log.debug("Request to partially update Countries : {}", countries);

        return countriesRepository
            .findById(countries.getId())
            .map(existingCountries -> {
                if (countries.getName() != null) {
                    existingCountries.setName(countries.getName());
                }
                if (countries.getIso() != null) {
                    existingCountries.setIso(countries.getIso());
                }
                if (countries.getLanguage() != null) {
                    existingCountries.setLanguage(countries.getLanguage());
                }
                if (countries.getLang() != null) {
                    existingCountries.setLang(countries.getLang());
                }

                return existingCountries;
            })
            .map(countriesRepository::save)
            .map(savedCountries -> {
                countriesSearchRepository.save(savedCountries);

                return savedCountries;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Countries> findAll(Pageable pageable) {
        log.debug("Request to get all Countries");
        return countriesRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Countries> findOne(Long id) {
        log.debug("Request to get Countries : {}", id);
        return countriesRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Countries : {}", id);
        countriesRepository.deleteById(id);
        countriesSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Countries> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Countries for query {}", query);
        return countriesSearchRepository.search(query, pageable);
    }
}
