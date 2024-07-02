import { CommitDto } from '../types/commitData';
import {
    RepositoriesByQueryQueriesDto,
    UserRepositoriesQueriesDto
} from '../types/queries/repositoriesQueriesDto';
import { RepositoryDto } from '../types/repositoryDto';

export const formatUserRepositoriesResponse = (data: UserRepositoriesQueriesDto) => {
    return data.repositoryOwner.repositories.edges.map(
        ({ node }) =>
            ({
                id: node.id,
                name: node.name,
                stargazerCount: node.stargazerCount,
                url: node.url,
                owner: node.owner,
                commits: node.defaultBranchRef.target.history.edges.map(
                    ({ node }) =>
                        ({
                            id: node.id,
                            committedDate: node.committedDate
                        }) as CommitDto
                )
            }) as RepositoryDto
    );
};
