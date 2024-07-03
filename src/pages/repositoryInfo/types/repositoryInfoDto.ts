import { LanguageDto } from '../../../entities/types/languagesDto';
import { RepositoryDto } from '../../home/types/repositoryDto';

export interface RepositoryInfoDto extends RepositoryDto {
    description: string;
    languages: LanguageDto[];
}
