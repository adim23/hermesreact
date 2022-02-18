package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.Emails;
import gr.adr.hermes.repository.EmailsRepository;
import gr.adr.hermes.repository.search.EmailsSearchRepository;
import gr.adr.hermes.service.EmailsService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Emails}.
 */
@Service
@Transactional
public class EmailsServiceImpl implements EmailsService {

    private final Logger log = LoggerFactory.getLogger(EmailsServiceImpl.class);

    private final EmailsRepository emailsRepository;

    private final EmailsSearchRepository emailsSearchRepository;

    public EmailsServiceImpl(EmailsRepository emailsRepository, EmailsSearchRepository emailsSearchRepository) {
        this.emailsRepository = emailsRepository;
        this.emailsSearchRepository = emailsSearchRepository;
    }

    @Override
    public Emails save(Emails emails) {
        log.debug("Request to save Emails : {}", emails);
        Emails result = emailsRepository.save(emails);
        emailsSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<Emails> partialUpdate(Emails emails) {
        log.debug("Request to partially update Emails : {}", emails);

        return emailsRepository
            .findById(emails.getId())
            .map(existingEmails -> {
                if (emails.getEmail() != null) {
                    existingEmails.setEmail(emails.getEmail());
                }
                if (emails.getDescription() != null) {
                    existingEmails.setDescription(emails.getDescription());
                }
                if (emails.getFavourite() != null) {
                    existingEmails.setFavourite(emails.getFavourite());
                }

                return existingEmails;
            })
            .map(emailsRepository::save)
            .map(savedEmails -> {
                emailsSearchRepository.save(savedEmails);

                return savedEmails;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Emails> findAll(Pageable pageable) {
        log.debug("Request to get all Emails");
        return emailsRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Emails> findOne(Long id) {
        log.debug("Request to get Emails : {}", id);
        return emailsRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Emails : {}", id);
        emailsRepository.deleteById(id);
        emailsSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Emails> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Emails for query {}", query);
        return emailsSearchRepository.search(query, pageable);
    }
}
