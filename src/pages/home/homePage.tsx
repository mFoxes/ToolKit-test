import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingState } from '../../shared/constants/lodaingState';
import { RepositoriesList } from './features/repositoriesList/repositoriesList';
import { RepositoriesPagination } from './features/repositoriesPagination/repositoriesPagination';
import { Search } from '../../shared/ui/search/search';
import {
    $isRepositoriesLoading,
    getRepositoriesByName,
    resetRepositoriesState,
    setRepositoriesCurrentPage
} from './models/repositoriesListModel';
import { useUnit } from 'effector-react';
import { $login } from '../layout/models/layoutPageModel';

export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsQuery = searchParams.get('query') ?? '';
    const searchParamsPage = searchParams.get('page');

    const login = useUnit($login);
    const isLoading = useUnit($isRepositoriesLoading);

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
        getRepositoriesByName({ name: value, login });
    };

    useEffect(() => {
        const preparePage = async () => {
            if (searchParamsPage !== null) {
                await setRepositoriesCurrentPage(parseInt(searchParamsPage));
            }
            loadData(searchParamsQuery);
        };
        preparePage();
        return () => {
            resetRepositoriesState();
        };
    }, []);

    useEffect(() => {
        const preparePage = async () => {
            await setRepositoriesCurrentPage(0);
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
