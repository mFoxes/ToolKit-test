import { LanguageDto } from './languagesDto';
import { RepositoryDto } from './repositoryDto';

export interface RepositoryInfoDto extends RepositoryDto {
    description: string;
    languages: LanguageDto[];
}
