package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.Phones;
import gr.adr.hermes.repository.PhonesRepository;
import gr.adr.hermes.repository.search.PhonesSearchRepository;
import gr.adr.hermes.service.PhonesService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Phones}.
 */
@Service
@Transactional
public class PhonesServiceImpl implements PhonesService {

    private final Logger log = LoggerFactory.getLogger(PhonesServiceImpl.class);

    private final PhonesRepository phonesRepository;

    private final PhonesSearchRepository phonesSearchRepository;

    public PhonesServiceImpl(PhonesRepository phonesRepository, PhonesSearchRepository phonesSearchRepository) {
        this.phonesRepository = phonesRepository;
        this.phonesSearchRepository = phonesSearchRepository;
    }

    @Override
    public Phones save(Phones phones) {
        log.debug("Request to save Phones : {}", phones);
        Phones result = phonesRepository.save(phones);
        phonesSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<Phones> partialUpdate(Phones phones) {
        log.debug("Request to partially update Phones : {}", phones);

        return phonesRepository
            .findById(phones.getId())
            .map(existingPhones -> {
                if (phones.getPhone() != null) {
                    existingPhones.setPhone(phones.getPhone());
                }
                if (phones.getDescription() != null) {
                    existingPhones.setDescription(phones.getDescription());
                }
                if (phones.getFavourite() != null) {
                    existingPhones.setFavourite(phones.getFavourite());
                }

                return existingPhones;
            })
            .map(phonesRepository::save)
            .map(savedPhones -> {
                phonesSearchRepository.save(savedPhones);

                return savedPhones;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Phones> findAll(Pageable pageable) {
        log.debug("Request to get all Phones");
        return phonesRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Phones> findOne(Long id) {
        log.debug("Request to get Phones : {}", id);
        return phonesRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Phones : {}", id);
        phonesRepository.deleteById(id);
        phonesSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Phones> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Phones for query {}", query);
        return phonesSearchRepository.search(query, pageable);
    }
}
