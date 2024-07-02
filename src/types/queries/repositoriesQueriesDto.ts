import { CommitDto } from '../commitData';
import {
    DefaultBranchRefDto,
    EdgesDto,
    HistoryDto,
    NodeDto,
    RepositoriesDto,
    RepositoryOwnerDto,
    SearchDto,
    TargetDto
} from '../queryUtilitiesDto';
import { RepositoryDto } from '../repositoryDto';

export type RepositoriesByQueryQueriesDto = SearchDto<
    EdgesDto<
        NodeDto<
            Omit<RepositoryDto, 'commits'> &
                DefaultBranchRefDto<TargetDto<HistoryDto<EdgesDto<NodeDto<CommitDto>>>>>
        >
    >
>;
