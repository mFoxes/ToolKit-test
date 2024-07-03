import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setRepositoriesCurrentPage } from '../../store/slices/repositoriesSlice';
import { Pagination } from '../pagination/pagination';
import styled from 'styled-components';

export const RepositoriesPagination = () => {
    const dispatch = useAppDispatch();
    const repositoryCount = useAppSelector((state) => state.repositories.repositoryCount);
    const currentPage = useAppSelector((state) => state.repositories.currentPage);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (currentPage: number) => {
        searchParams.set('page', currentPage.toString());
        setSearchParams(searchParams);
        console.log('currentPage', currentPage);
        dispatch(setRepositoriesCurrentPage(currentPage));
    };

    return (
        <Container>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={10}
                itemsCount={repositoryCount}
                onChange={handleChange}
            />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
