import { CommitDto, LanguageDto, OwnerInfoDto } from '../../../../entities';
import {
    RepositoryOwnerDto,
    NodesDto,
    DefaultBranchRefDto,
    TargetDto,
    HistoryDto,
    EdgesDto,
    NodeDto
} from '../../../../shared';
import { RepositoryInfoDto } from '../repositoryInfoDto';

export type RepositoryInfoQueriesDto = RepositoryOwnerDto<
    OwnerInfoDto & {
        repository: Omit<RepositoryInfoDto, 'commits' | 'languages'> & {
            languages: NodesDto<LanguageDto>;
        } & DefaultBranchRefDto<TargetDto<HistoryDto<EdgesDto<NodeDto<CommitDto>>>>>;
    }
>;
