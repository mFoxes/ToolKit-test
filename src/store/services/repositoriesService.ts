import { apolloClient } from '../../apolloClient/apolloClient';
import { RepositoriesByQueryQueriesDto } from '../../types/queries/repositoriesQueriesDto';
import { repositoriesQueries } from '../queries/repositoriesQueries';

export const repositoriesService = {
    getRepositoriesByName: async (query: string, after?: string) => {
        return await apolloClient.query<RepositoriesByQueryQueriesDto>({
            query: repositoriesQueries.GET_REPOSITORIES_BY_QUERY,
            variables: { query, after }
        });
    }
};
