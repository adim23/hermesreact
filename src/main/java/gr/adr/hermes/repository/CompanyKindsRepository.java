package gr.adr.hermes.repository;

import gr.adr.hermes.domain.CompanyKinds;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CompanyKinds entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyKindsRepository extends JpaRepository<CompanyKinds, Long>, JpaSpecificationExecutor<CompanyKinds> {}
