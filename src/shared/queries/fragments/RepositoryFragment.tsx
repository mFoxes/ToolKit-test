import { gql } from '@apollo/client';

export const REPOSITORY_FRAGMENT = gql`
    fragment RepositoryFragment on Repository {
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
`;
