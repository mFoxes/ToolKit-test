import { CommitDto, OwnerDto } from '../../../entities';

export interface RepositoryDto {
    id: string;
    name: string;
    stargazerCount: number;
    url: string;
    owner: OwnerDto;
    commits: CommitDto[];
}
