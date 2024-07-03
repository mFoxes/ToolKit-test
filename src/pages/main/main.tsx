import { useEffect } from 'react';
import styled from 'styled-components';
import { RepositoriesList } from '../../components/preositoriesList/repositoriesList';
import { RepositoriesPagination } from '../../components/repositoriesPagination/repositoriesPagination';
import { Search } from '../../components/search/search';
import { LoadingState } from '../../constants/lodaingState';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
    getRepositoriesByName,
    setInitialState,
    setRepositoriesCurrentPage
} from '../../store/slices/repositoriesSlice';
import { useLocation, useSearchParams } from 'react-router-dom';

export const Main = () => {
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
        <MainWrapper>
            <Search currentSearchValue={searchParamsQuery} onSubmit={handleSubmit} />
            {isLoading === LoadingState.Pending ? (
                <>Loading...</>
            ) : (
                <>
                    <RepositoriesList />
                    <RepositoriesPagination />
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
