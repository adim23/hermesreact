package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.SocialContacts;
import gr.adr.hermes.repository.SocialContactsRepository;
import gr.adr.hermes.repository.search.SocialContactsSearchRepository;
import gr.adr.hermes.service.SocialContactsService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link SocialContacts}.
 */
@Service
@Transactional
public class SocialContactsServiceImpl implements SocialContactsService {

    private final Logger log = LoggerFactory.getLogger(SocialContactsServiceImpl.class);

    private final SocialContactsRepository socialContactsRepository;

    private final SocialContactsSearchRepository socialContactsSearchRepository;

    public SocialContactsServiceImpl(
        SocialContactsRepository socialContactsRepository,
        SocialContactsSearchRepository socialContactsSearchRepository
    ) {
        this.socialContactsRepository = socialContactsRepository;
        this.socialContactsSearchRepository = socialContactsSearchRepository;
    }

    @Override
    public SocialContacts save(SocialContacts socialContacts) {
        log.debug("Request to save SocialContacts : {}", socialContacts);
        SocialContacts result = socialContactsRepository.save(socialContacts);
        socialContactsSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<SocialContacts> partialUpdate(SocialContacts socialContacts) {
        log.debug("Request to partially update SocialContacts : {}", socialContacts);

        return socialContactsRepository
            .findById(socialContacts.getId())
            .map(existingSocialContacts -> {
                if (socialContacts.getName() != null) {
                    existingSocialContacts.setName(socialContacts.getName());
                }
                if (socialContacts.getFavored() != null) {
                    existingSocialContacts.setFavored(socialContacts.getFavored());
                }

                return existingSocialContacts;
            })
            .map(socialContactsRepository::save)
            .map(savedSocialContacts -> {
                socialContactsSearchRepository.save(savedSocialContacts);

                return savedSocialContacts;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SocialContacts> findAll(Pageable pageable) {
        log.debug("Request to get all SocialContacts");
        return socialContactsRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SocialContacts> findOne(Long id) {
        log.debug("Request to get SocialContacts : {}", id);
        return socialContactsRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete SocialContacts : {}", id);
        socialContactsRepository.deleteById(id);
        socialContactsSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SocialContacts> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of SocialContacts for query {}", query);
        return socialContactsSearchRepository.search(query, pageable);
    }
}
