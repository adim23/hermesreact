package gr.adr.hermes.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import gr.adr.hermes.domain.CitizensMeetings;
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
 * Spring Data Elasticsearch repository for the {@link CitizensMeetings} entity.
 */
public interface CitizensMeetingsSearchRepository
    extends ElasticsearchRepository<CitizensMeetings, Long>, CitizensMeetingsSearchRepositoryInternal {}

interface CitizensMeetingsSearchRepositoryInternal {
    Page<CitizensMeetings> search(String query, Pageable pageable);
}

class CitizensMeetingsSearchRepositoryInternalImpl implements CitizensMeetingsSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;

    CitizensMeetingsSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate) {
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Override
    public Page<CitizensMeetings> search(String query, Pageable pageable) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        nativeSearchQuery.setPageable(pageable);
        List<CitizensMeetings> hits = elasticsearchTemplate
            .search(nativeSearchQuery, CitizensMeetings.class)
            .map(SearchHit::getContent)
            .stream()
            .collect(Collectors.toList());

        return new PageImpl<>(hits, pageable, hits.size());
    }
}
