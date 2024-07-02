import { gql } from '@apollo/client';
import { REPOSITORY_FRAGMENT } from './fragments/RepositoryFragment';

export const repositoriesQueries = {
    GET_REPOSITORIES_BY_QUERY: gql`
        ${REPOSITORY_FRAGMENT}
        query getRepositoryByQuery($query: String!, $after: String) {
            search(query: $query, type: REPOSITORY, first: 10, after: $after) {
                repositoryCount
                edges {
                    node {
                        ...RepositoryFragment
                    }
                }
            }
        }
    `,
    GET_REPOSITORIES_BY_USER: gql`
        ${REPOSITORY_FRAGMENT}
        query ($login: String!, $after: String) {
            repositoryOwner(login: $login) {
                repositories(first: 10, after: $after) {
                    edges {
                        node {
                            ...RepositoryFragment
                        }
                    }
                }
            }
        }
    `,
    GET_REPOSITORY_INFO: gql`
        query ($login: String!, $name: String!) {
            repositoryOwner(login: $login) {
                id
                avatarUrl
                url
                repository(name: $name) {
                    description
                    languages(first: 100) {
                        nodes {
                            id
                            name
                        }
                    }
                }
            }
        }
    `
};
