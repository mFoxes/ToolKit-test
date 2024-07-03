import { apolloClient } from '../../../shared';
import { repositoryInfoQueries } from '../../repositoryInfo/queries/repositoryInfoQueries';
import { RepositoryInfoQueriesDto } from '../../repositoryInfo/types/queries/repositoryInfoQueriesDto';

export const repositoryInfoService = {
    getRepositoryInfo: async (login: string, name: string) => {
        return await apolloClient.query<RepositoryInfoQueriesDto>({
            query: repositoryInfoQueries.GET_REPOSITORY_INFO,
            variables: { login, name }
        });
    }
};
