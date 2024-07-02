import { apolloClient } from '../../apolloClient/apolloClient';
import {
    RepositoriesByQueryQueriesDto,
    UserRepositoriesQueriesDto
} from '../../types/queries/repositoriesQueriesDto';
import { repositoriesQueries } from '../queries/repositoriesQueries';

export const repositoriesService = {
    getRepositoriesByName: async (name: string, after?: string) => {
        return await apolloClient.query<RepositoriesByQueryQueriesDto>({
            query: repositoriesQueries.GET_REPOSITORIES_BY_QUERY,
            variables: { query: `name:${name}`, after }
        });
    },
    getUserRepositories: async (login: string, after?: string) => {
        return await apolloClient.query<UserRepositoriesQueriesDto>({
            query: repositoriesQueries.GET_REPOSITORIES_BY_USER,
            variables: { login, after }
        });
    }
};
