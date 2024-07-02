import { CommitDto } from './commitData';
import { OwnerDto } from './ownerDto';

export interface RepositoryDto {
    id: string;
    name: string;
    stargazerCount: number;
    url: string;
    owner: OwnerDto;
    commits: CommitDto[];
}
