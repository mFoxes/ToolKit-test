import { LanguageDto } from '../../../entities/types/languagesDto';
import { RepositoryDto } from '../../home';

export interface RepositoryInfoDto extends RepositoryDto {
    description: string;
    languages: LanguageDto[];
}
