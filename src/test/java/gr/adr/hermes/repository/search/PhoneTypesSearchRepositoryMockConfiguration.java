package gr.adr.hermes.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link PhoneTypesSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class PhoneTypesSearchRepositoryMockConfiguration {

    @MockBean
    private PhoneTypesSearchRepository mockPhoneTypesSearchRepository;
}
