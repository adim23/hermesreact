package gr.adr.hermes.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import gr.adr.hermes.domain.CitizenFolders;
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
 * Spring Data Elasticsearch repository for the {@link CitizenFolders} entity.
 */
public interface CitizenFoldersSearchRepository
    extends ElasticsearchRepository<CitizenFolders, Long>, CitizenFoldersSearchRepositoryInternal {}

interface CitizenFoldersSearchRepositoryInternal {
    Page<CitizenFolders> search(String query, Pageable pageable);
}

class CitizenFoldersSearchRepositoryInternalImpl implements CitizenFoldersSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;

    CitizenFoldersSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate) {
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Override
    public Page<CitizenFolders> search(String query, Pageable pageable) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        nativeSearchQuery.setPageable(pageable);
        List<CitizenFolders> hits = elasticsearchTemplate
            .search(nativeSearchQuery, CitizenFolders.class)
            .map(SearchHit::getContent)
            .stream()
            .collect(Collectors.toList());

        return new PageImpl<>(hits, pageable, hits.size());
    }
}
