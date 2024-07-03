import { apolloClient } from '../../../shared/api/apolloClient';
import { repositoriesQueries } from '../queries/repositoriesQueries';
import { RepositoriesByQueryQueriesDto } from '../types/queries/repositoriesQueriesDto';

export const repositoriesService = {
    getRepositoriesByName: async (query: string) => {
        return await apolloClient.query<RepositoriesByQueryQueriesDto>({
            query: repositoriesQueries.GET_REPOSITORIES_BY_QUERY,
            variables: { query }
        });
    }
};
