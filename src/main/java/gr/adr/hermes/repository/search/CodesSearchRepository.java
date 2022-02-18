package gr.adr.hermes.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import gr.adr.hermes.domain.Codes;
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
 * Spring Data Elasticsearch repository for the {@link Codes} entity.
 */
public interface CodesSearchRepository extends ElasticsearchRepository<Codes, Long>, CodesSearchRepositoryInternal {}

interface CodesSearchRepositoryInternal {
    Page<Codes> search(String query, Pageable pageable);
}

class CodesSearchRepositoryInternalImpl implements CodesSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;

    CodesSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate) {
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Override
    public Page<Codes> search(String query, Pageable pageable) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        nativeSearchQuery.setPageable(pageable);
        List<Codes> hits = elasticsearchTemplate
            .search(nativeSearchQuery, Codes.class)
            .map(SearchHit::getContent)
            .stream()
            .collect(Collectors.toList());

        return new PageImpl<>(hits, pageable, hits.size());
    }
}
