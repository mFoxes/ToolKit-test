import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingState } from '../../../shared/constants/lodaingState';
import { ContentContainer } from '../../../shared/ui/contentContainer/contentContainer';
import { Header } from '../../../shared/ui/header/header';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { getUserData } from '../store/userSlice';

export const LayoutPage = () => {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector((state) => state.user.isLoading);

    useEffect(() => {
        dispatch(getUserData());
    }, []);

    return (
        <LayoutWrapper>
            <Header />
            <ContentContainer fullHeight>
                {isLoading === LoadingState.Pending ? <>Loading</> : <Outlet />}
            </ContentContainer>
        </LayoutWrapper>
    );
};

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: calc(100vh - 30px);
    height: 100%;
    width: 100%;
    padding-bottom: 30px;
`;
