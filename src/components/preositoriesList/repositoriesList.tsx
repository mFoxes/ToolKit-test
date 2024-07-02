import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { RepositoryCard } from '../repositoriesCard/repositoryCard';
import styled from 'styled-components';

export const RepositoriesList = () => {
    const repositories = useAppSelector((state) => state.repositories.repositories);
    return (
        <Wrapper>
            <Container>
                {repositories.map((rep) => (
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
