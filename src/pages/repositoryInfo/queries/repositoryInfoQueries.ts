import { gql } from '@apollo/client';
import { REPOSITORY_FRAGMENT } from '../../../shared';

export const repositoryInfoQueries = {
    GET_REPOSITORY_INFO: gql`
        ${REPOSITORY_FRAGMENT}
        query ($login: String!, $name: String!) {
            repositoryOwner(login: $login) {
                id
                login
                avatarUrl
                url
                repository(name: $name) {
                    ...RepositoryFragment
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
