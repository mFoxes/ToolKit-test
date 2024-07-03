import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Pagination } from '../../../../shared/ui/pagination/pagination';
import React from 'react';
import { useUnit } from 'effector-react';
import {
    $currentRepositoriesPage,
    $repositoryCount,
    setRepositoriesCurrentPage
} from '../../models/repositoriesListModel';

export const RepositoriesPagination = () => {
    const repositoryCount = useUnit($repositoryCount);
    const currentPage = useUnit($currentRepositoriesPage);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (currentPage: number) => {
        searchParams.set('page', currentPage.toString());
        setSearchParams(searchParams);
        setRepositoriesCurrentPage(currentPage);
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
