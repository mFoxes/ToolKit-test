import { gql } from '@apollo/client';
import { REPOSITORY_FRAGMENT } from '../../../shared';

export const repositoriesQueries = {
    GET_REPOSITORIES_BY_QUERY: gql`
        ${REPOSITORY_FRAGMENT}
        query getRepositoryByQuery($query: String!, $after: String) {
            search(query: $query, type: REPOSITORY, first: 100, after: $after) {
                repositoryCount
                edges {
                    node {
                        ...RepositoryFragment
                    }
                }
            }
        }
    `
};
