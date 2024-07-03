import styled from 'styled-components';
import React from 'react';
import { useUnit } from 'effector-react';
import { $currentRepositoriesPage, $repositoriesContent } from '../../models/repositoriesListModel';
import { RepositoryCard } from '../';

export const RepositoriesList = () => {
    const repositories = useUnit($repositoriesContent);
    const currentPage = useUnit($currentRepositoriesPage);

    if (!repositories.length) {
        return <NotFoundContainer>Ничего не найдено</NotFoundContainer>;
    }

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

const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;
`;
