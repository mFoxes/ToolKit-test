import { CommitDto } from '../../../../entities';
import {
    DefaultBranchRefDto,
    EdgesDto,
    HistoryDto,
    NodeDto,
    SearchDto,
    TargetDto
} from '../../../../shared';
import { RepositoryDto } from '../repositoryDto';

export type RepositoriesByQueryQueriesDto = SearchDto<
    { repositoryCount: number } & EdgesDto<
        NodeDto<
            Omit<RepositoryDto, 'commits'> &
                DefaultBranchRefDto<TargetDto<HistoryDto<EdgesDto<NodeDto<CommitDto>>>>>
        >
    >
>;
