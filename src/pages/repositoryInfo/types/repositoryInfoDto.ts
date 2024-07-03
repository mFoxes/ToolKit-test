import { LanguageDto } from '../../../entities';
import { RepositoryDto } from '../../home';

export interface RepositoryInfoDto extends RepositoryDto {
    description: string;
    languages: LanguageDto[];
}
