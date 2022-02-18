package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.ZipCodes;
import gr.adr.hermes.repository.ZipCodesRepository;
import gr.adr.hermes.repository.search.ZipCodesSearchRepository;
import gr.adr.hermes.service.ZipCodesService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ZipCodes}.
 */
@Service
@Transactional
public class ZipCodesServiceImpl implements ZipCodesService {

    private final Logger log = LoggerFactory.getLogger(ZipCodesServiceImpl.class);

    private final ZipCodesRepository zipCodesRepository;

    private final ZipCodesSearchRepository zipCodesSearchRepository;

    public ZipCodesServiceImpl(ZipCodesRepository zipCodesRepository, ZipCodesSearchRepository zipCodesSearchRepository) {
        this.zipCodesRepository = zipCodesRepository;
        this.zipCodesSearchRepository = zipCodesSearchRepository;
    }

    @Override
    public ZipCodes save(ZipCodes zipCodes) {
        log.debug("Request to save ZipCodes : {}", zipCodes);
        ZipCodes result = zipCodesRepository.save(zipCodes);
        zipCodesSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<ZipCodes> partialUpdate(ZipCodes zipCodes) {
        log.debug("Request to partially update ZipCodes : {}", zipCodes);

        return zipCodesRepository
            .findById(zipCodes.getId())
            .map(existingZipCodes -> {
                if (zipCodes.getStreet() != null) {
                    existingZipCodes.setStreet(zipCodes.getStreet());
                }
                if (zipCodes.getArea() != null) {
                    existingZipCodes.setArea(zipCodes.getArea());
                }
                if (zipCodes.getFromNumber() != null) {
                    existingZipCodes.setFromNumber(zipCodes.getFromNumber());
                }
                if (zipCodes.getToNumber() != null) {
                    existingZipCodes.setToNumber(zipCodes.getToNumber());
                }

                return existingZipCodes;
            })
            .map(zipCodesRepository::save)
            .map(savedZipCodes -> {
                zipCodesSearchRepository.save(savedZipCodes);

                return savedZipCodes;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ZipCodes> findAll(Pageable pageable) {
        log.debug("Request to get all ZipCodes");
        return zipCodesRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ZipCodes> findOne(Long id) {
        log.debug("Request to get ZipCodes : {}", id);
        return zipCodesRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ZipCodes : {}", id);
        zipCodesRepository.deleteById(id);
        zipCodesSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ZipCodes> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ZipCodes for query {}", query);
        return zipCodesSearchRepository.search(query, pageable);
    }
}
