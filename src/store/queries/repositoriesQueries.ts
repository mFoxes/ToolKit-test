import { gql } from '@apollo/client';

export const repositoriesQueries = {
    GET_REPOSITORIES_BY_QUERY: gql`
        query getRepositoryByQuery($query: String!, $after: String) {
            search(query: $query, type: REPOSITORY, first: 10, after: $after) {
                repositoryCount
                edges {
                    node {
                        ... on Repository {
                            id
                            url
                            name
                            owner {
                                login
                            }
                            stargazerCount
                            defaultBranchRef {
                                target {
                                    ... on Commit {
                                        history(first: 1) {
                                            edges {
                                                node {
                                                    id
                                                    committedDate
                                                }
                                            }
                                        }
                                    }
                                }
                            }
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
