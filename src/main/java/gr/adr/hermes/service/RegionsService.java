package gr.adr.hermes.service;

import gr.adr.hermes.domain.Regions;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Regions}.
 */
public interface RegionsService {
    /**
     * Save a regions.
     *
     * @param regions the entity to save.
     * @return the persisted entity.
     */
    Regions save(Regions regions);

    /**
     * Partially updates a regions.
     *
     * @param regions the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Regions> partialUpdate(Regions regions);

    /**
     * Get all the regions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Regions> findAll(Pageable pageable);

    /**
     * Get the "id" regions.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Regions> findOne(Long id);

    /**
     * Delete the "id" regions.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the regions corresponding to the query.
     *
     * @param query the query of the search.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Regions> search(String query, Pageable pageable);
}
