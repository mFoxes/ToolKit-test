import { CommitDto } from '../../../../entities/types/commitDto';
import { LanguageDto } from '../../../../entities/types/languagesDto';
import { OwnerInfoDto } from '../../../../entities/types/ownerInfoDto';
import {
    RepositoryOwnerDto,
    NodesDto,
    DefaultBranchRefDto,
    TargetDto,
    HistoryDto,
    EdgesDto,
    NodeDto
} from '../../../../shared/types/queryUtilitiesDto';
import { RepositoryInfoDto } from '../repositoryInfoDto';

export type RepositoryInfoQueriesDto = RepositoryOwnerDto<
    OwnerInfoDto & {
        repository: Omit<RepositoryInfoDto, 'commits' | 'languages'> & {
            languages: NodesDto<LanguageDto>;
        } & DefaultBranchRefDto<TargetDto<HistoryDto<EdgesDto<NodeDto<CommitDto>>>>>;
    }
>;
