import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Pagination } from '../../../../shared/ui/pagination/pagination';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../../../shared/hooks/useAppSelector';
import { setRepositoriesCurrentPage } from '../../store/repositoriesSlice';
import React from 'react';

export const RepositoriesPagination = () => {
    const dispatch = useAppDispatch();
    const repositoryCount = useAppSelector((state) => state.repositories.repositoryCount);
    const currentPage = useAppSelector((state) => state.repositories.currentPage);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (currentPage: number) => {
        searchParams.set('page', currentPage.toString());
        setSearchParams(searchParams);
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
