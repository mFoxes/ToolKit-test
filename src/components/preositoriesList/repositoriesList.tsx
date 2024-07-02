import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { RepositoryCard } from '../repositoriesCard/repositoryCard';
import styled from 'styled-components';

export const RepositoriesList = () => {
    const repositories = useAppSelector((state) => state.repositories.repositories);
    const currentPage = useAppSelector((state) => state.repositories.currentPage);

    return (
        <Wrapper>
            <Container>
                {repositories
                    .filter((_, indx) => currentPage * 10 <= indx && indx < (currentPage + 1) * 10)
                    .map((rep) => (
                        <RepositoryCard key={rep.id} data={rep} />
                    ))}
            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100%;
`;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px 20px;
    align-items: flex-start;
`;
