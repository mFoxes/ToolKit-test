import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { RepositoryCard } from '../repositoriesCard/repositoryCard';
import styled from 'styled-components';

export const RepositoriesList = () => {
    const repositories = useAppSelector((state) => state.repositories.repositories);
    return (
        <Container>
            {repositories.map((rep) => (
                <RepositoryCard key={rep.id} data={rep} />
            ))}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 100%;
    gap: 20px 20px;
`;
