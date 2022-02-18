package gr.adr.hermes.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import gr.adr.hermes.domain.MaritalStatus;
import java.util.List;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MaritalStatus} entity.
 */
public interface MaritalStatusSearchRepository
    extends ElasticsearchRepository<MaritalStatus, Long>, MaritalStatusSearchRepositoryInternal {}

interface MaritalStatusSearchRepositoryInternal {
    Page<MaritalStatus> search(String query, Pageable pageable);
}

class MaritalStatusSearchRepositoryInternalImpl implements MaritalStatusSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;

    MaritalStatusSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate) {
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Override
    public Page<MaritalStatus> search(String query, Pageable pageable) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        nativeSearchQuery.setPageable(pageable);
        List<MaritalStatus> hits = elasticsearchTemplate
            .search(nativeSearchQuery, MaritalStatus.class)
            .map(SearchHit::getContent)
            .stream()
            .collect(Collectors.toList());

        return new PageImpl<>(hits, pageable, hits.size());
    }
}
