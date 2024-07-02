import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect } from 'react';
import { getRepositoriesByName } from '../../store/slices/repositoriesSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { RepositoriesList } from '../../components/preositoriesList/repositoriesList';

export const Main = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRepositoriesByName({ name: '' }));
    }, []);

    return (
        <MainWrapper>
            <div>search</div>
            <RepositoriesList />
            <PaginatorWrapper>paginator</PaginatorWrapper>
        </MainWrapper>
    );
};

const MainWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const PaginatorWrapper = styled.div`
    margin-top: auto;
`;
