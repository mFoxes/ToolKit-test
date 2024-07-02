import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setRepositoriesCurrentPage } from '../../store/slices/repositoriesSlice';
import { Pagination } from '../pagination/pagination';

export const RepositoriesPagination = () => {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector((state) => state.repositories.currentPage);

    const handleChange = (currentPage: number) => {
        dispatch(setRepositoriesCurrentPage(currentPage));
    };

    return <Pagination currentPage={currentPage} pageCount={10} onChange={handleChange} />;
};
