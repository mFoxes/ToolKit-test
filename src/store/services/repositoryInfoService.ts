import { apolloClient } from '../../apolloClient/apolloClient';
import { RepositoriesByQueryQueriesDto } from '../../types/queries/repositoriesQueriesDto';
import { RepositoryInfoQueriesDto } from '../../types/queries/repositoryQueriesDto';
import { repositoryInfoQueries } from '../queries/repositoryInfoQueries';

export const repositoryInfoService = {
    getRepositoryInfo: async (login: string, name: string) => {
        return await apolloClient.query<RepositoryInfoQueriesDto>({
            query: repositoryInfoQueries.GET_REPOSITORY_INFO,
            variables: { login, name }
        });
    }
};
