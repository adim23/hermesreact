package gr.adr.hermes.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import gr.adr.hermes.domain.Jobs;
import gr.adr.hermes.repository.JobsRepository;
import gr.adr.hermes.repository.search.JobsSearchRepository;
import gr.adr.hermes.service.JobsService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Jobs}.
 */
@Service
@Transactional
public class JobsServiceImpl implements JobsService {

    private final Logger log = LoggerFactory.getLogger(JobsServiceImpl.class);

    private final JobsRepository jobsRepository;

    private final JobsSearchRepository jobsSearchRepository;

    public JobsServiceImpl(JobsRepository jobsRepository, JobsSearchRepository jobsSearchRepository) {
        this.jobsRepository = jobsRepository;
        this.jobsSearchRepository = jobsSearchRepository;
    }

    @Override
    public Jobs save(Jobs jobs) {
        log.debug("Request to save Jobs : {}", jobs);
        Jobs result = jobsRepository.save(jobs);
        jobsSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<Jobs> partialUpdate(Jobs jobs) {
        log.debug("Request to partially update Jobs : {}", jobs);

        return jobsRepository
            .findById(jobs.getId())
            .map(existingJobs -> {
                if (jobs.getName() != null) {
                    existingJobs.setName(jobs.getName());
                }
                if (jobs.getDescription() != null) {
                    existingJobs.setDescription(jobs.getDescription());
                }

                return existingJobs;
            })
            .map(jobsRepository::save)
            .map(savedJobs -> {
                jobsSearchRepository.save(savedJobs);

                return savedJobs;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Jobs> findAll(Pageable pageable) {
        log.debug("Request to get all Jobs");
        return jobsRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Jobs> findOne(Long id) {
        log.debug("Request to get Jobs : {}", id);
        return jobsRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Jobs : {}", id);
        jobsRepository.deleteById(id);
        jobsSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Jobs> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Jobs for query {}", query);
        return jobsSearchRepository.search(query, pageable);
    }
}
