package gr.adr.hermes.service;

import gr.adr.hermes.domain.Countries;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Countries}.
 */
public interface CountriesService {
    /**
     * Save a countries.
     *
     * @param countries the entity to save.
     * @return the persisted entity.
     */
    Countries save(Countries countries);

    /**
     * Partially updates a countries.
     *
     * @param countries the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Countries> partialUpdate(Countries countries);

    /**
     * Get all the countries.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Countries> findAll(Pageable pageable);

    /**
     * Get the "id" countries.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Countries> findOne(Long id);

    /**
     * Delete the "id" countries.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the countries corresponding to the query.
     *
     * @param query the query of the search.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Countries> search(String query, Pageable pageable);
}
