import { CommitDto } from '../commitData';
import { LanguageDto } from '../languagesDto';
import { OwnerInfoDto } from '../ownerInfoDto';
import {
    DefaultBranchRefDto,
    EdgesDto,
    HistoryDto,
    NodeDto,
    NodesDto,
    RepositoriesDto,
    RepositoryOwnerDto,
    TargetDto
} from '../queryUtilitiesDto';
import { RepositoryInfoDto } from '../repositoryInfoDto';

export type RepositoryInfoQueriesDto = RepositoryOwnerDto<
    OwnerInfoDto & {
        repository: Omit<RepositoryInfoDto, 'commits' | 'languages'> & {
            languages: NodesDto<LanguageDto>;
        } & DefaultBranchRefDto<TargetDto<HistoryDto<EdgesDto<NodeDto<CommitDto>>>>>;
    }
>;
