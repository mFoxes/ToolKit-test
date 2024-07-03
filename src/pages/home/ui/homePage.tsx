import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingState } from '../../../shared/constants/lodaingState';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { RepositoriesList } from './components/repositoriesList';
import { RepositoriesPagination } from './components/repositoriesPagination';
import {
    getRepositoriesByName,
    setRepositoriesCurrentPage,
    setInitialState
} from '../store/repositoriesSlice';
import { Search } from '../../../shared/ui/search/search';

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsQuery = searchParams.get('query') ?? '';
    const searchParamsPage = searchParams.get('page');

    const login = useAppSelector((state) => state.user.login);
    const isLoading = useAppSelector((state) => state.repositories.isLoading);

    const handleSubmit = (value: string) => {
        searchParams.delete('page');
        setSearchParams(searchParams);
        loadData(value);
    };

    const loadData = async (value = '') => {
        if (value === '') {
            searchParams.delete('query');
            setSearchParams(searchParams);
        }
        if (value) {
            searchParams.set('query', value);
            setSearchParams(searchParams);
        }
        dispatch(getRepositoriesByName({ name: value, login }));
    };

    useEffect(() => {
        const preparePage = async () => {
            if (searchParamsPage !== null) {
                await dispatch(setRepositoriesCurrentPage(parseInt(searchParamsPage)));
            }
            loadData(searchParamsQuery);
        };
        preparePage();
        return () => {
            dispatch(setInitialState());
        };
    }, []);

    useEffect(() => {
        const preparePage = async () => {
            await dispatch(setRepositoriesCurrentPage(0));
            loadData();
        };
        if (searchParamsQuery === '' && !searchParamsPage) {
            preparePage();
        }
    }, [searchParamsQuery, searchParamsPage]);

    return (
        <HomeWrapper>
            <Search currentSearchValue={searchParamsQuery} onSubmit={handleSubmit} />
            {isLoading === LoadingState.Pending ? (
                <>Loading...</>
            ) : (
                <>
                    <RepositoriesList />
                    <RepositoriesPagination />
                </>
            )}
        </HomeWrapper>
    );
};

const HomeWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
