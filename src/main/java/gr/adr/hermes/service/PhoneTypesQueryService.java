package gr.adr.hermes.service;

import gr.adr.hermes.domain.*; // for static metamodels
import gr.adr.hermes.domain.PhoneTypes;
import gr.adr.hermes.repository.PhoneTypesRepository;
import gr.adr.hermes.repository.search.PhoneTypesSearchRepository;
import gr.adr.hermes.service.criteria.PhoneTypesCriteria;
import java.util.List;
import javax.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link PhoneTypes} entities in the database.
 * The main input is a {@link PhoneTypesCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link PhoneTypes} or a {@link Page} of {@link PhoneTypes} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PhoneTypesQueryService extends QueryService<PhoneTypes> {

    private final Logger log = LoggerFactory.getLogger(PhoneTypesQueryService.class);

    private final PhoneTypesRepository phoneTypesRepository;

    private final PhoneTypesSearchRepository phoneTypesSearchRepository;

    public PhoneTypesQueryService(PhoneTypesRepository phoneTypesRepository, PhoneTypesSearchRepository phoneTypesSearchRepository) {
        this.phoneTypesRepository = phoneTypesRepository;
        this.phoneTypesSearchRepository = phoneTypesSearchRepository;
    }

    /**
     * Return a {@link List} of {@link PhoneTypes} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<PhoneTypes> findByCriteria(PhoneTypesCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<PhoneTypes> specification = createSpecification(criteria);
        return phoneTypesRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link PhoneTypes} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<PhoneTypes> findByCriteria(PhoneTypesCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<PhoneTypes> specification = createSpecification(criteria);
        return phoneTypesRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(PhoneTypesCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<PhoneTypes> specification = createSpecification(criteria);
        return phoneTypesRepository.count(specification);
    }

    /**
     * Function to convert {@link PhoneTypesCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<PhoneTypes> createSpecification(PhoneTypesCriteria criteria) {
        Specification<PhoneTypes> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), PhoneTypes_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), PhoneTypes_.name));
            }
        }
        return specification;
    }
}
