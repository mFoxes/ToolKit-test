import { CommitDto, LanguageDto, OwnerInfoDto } from '../../../entities';
import { RepositoryInfoQueriesDto } from '../types/queries/repositoryInfoQueriesDto';
import { RepositoryInfoDto } from '../types/repositoryInfoDto';

export const formatRepositoryInfoResponse = (
    data: RepositoryInfoQueriesDto
): [OwnerInfoDto, RepositoryInfoDto] => {
    const ownerInfo = {
        id: data.repositoryOwner.id,
        login: data.repositoryOwner.login,
        avatarUrl: data.repositoryOwner.avatarUrl,
        url: data.repositoryOwner.url
    } as OwnerInfoDto;

    const { repository } = data.repositoryOwner;

    const repositoryInfo = {
        id: repository.id,
        name: repository.name,
        stargazerCount: repository.stargazerCount,
        url: repository.url,
        owner: repository.owner,
        description: repository.description,
        languages: repository.languages.nodes.map(
            (node) =>
                ({
                    id: node.id,
                    name: node.name
                }) as LanguageDto
        ),
        commits:
            repository.defaultBranchRef?.target?.history.edges.map(
                ({ node }) =>
                    ({
                        id: node.id,
                        committedDate: node.committedDate
                    }) as CommitDto
            ) ?? []
    } as RepositoryInfoDto;
    return [ownerInfo, repositoryInfo];
};
