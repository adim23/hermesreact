package gr.adr.hermes.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import gr.adr.hermes.domain.Origins;
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
 * Spring Data Elasticsearch repository for the {@link Origins} entity.
 */
public interface OriginsSearchRepository extends ElasticsearchRepository<Origins, Long>, OriginsSearchRepositoryInternal {}

interface OriginsSearchRepositoryInternal {
    Page<Origins> search(String query, Pageable pageable);
}

class OriginsSearchRepositoryInternalImpl implements OriginsSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;

    OriginsSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate) {
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Override
    public Page<Origins> search(String query, Pageable pageable) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        nativeSearchQuery.setPageable(pageable);
        List<Origins> hits = elasticsearchTemplate
            .search(nativeSearchQuery, Origins.class)
            .map(SearchHit::getContent)
            .stream()
            .collect(Collectors.toList());

        return new PageImpl<>(hits, pageable, hits.size());
    }
}
