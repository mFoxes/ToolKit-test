import { CommitDto } from '../../../entities/types/commitDto';
import { OwnerDto } from '../../../entities/types/ownerDto';

export interface RepositoryDto {
    id: string;
    name: string;
    stargazerCount: number;
    url: string;
    owner: OwnerDto;
    commits: CommitDto[];
}
