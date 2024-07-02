import { useEffect } from 'react';
import styled from 'styled-components';
import { RepositoriesList } from '../../components/preositoriesList/repositoriesList';
import { Search } from '../../components/search/search';
import { LoadingState } from '../../constants/lodaingState';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
    getRepositoriesByName,
    getUserRepositories,
    setInitialState
} from '../../store/slices/repositoriesSlice';

export const Main = () => {
    const dispatch = useAppDispatch();

    const login = useAppSelector((state) => state.user.login);
    const isLoading = useAppSelector((state) => state.repositories.isLoading);

    const handleSubmit = (value: string) => {
        loadData(value);
    };

    const loadData = async (value = '') => {
        await dispatch(setInitialState());
        if (value !== '') {
            dispatch(getRepositoriesByName({ name: value }));
        } else {
            dispatch(getUserRepositories({ login }));
        }
    };

    useEffect(() => {
        loadData();
        return () => {
            dispatch(setInitialState());
        };
    }, []);

    return (
        <MainWrapper>
            <Search onSubmit={handleSubmit} />
            {isLoading === LoadingState.Pending ? (
                <>Loading...</>
            ) : (
                <>
                    <RepositoriesList />
                    <div>paginator</div>
                </>
            )}
        </MainWrapper>
    );
};

const MainWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
