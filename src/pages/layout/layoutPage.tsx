import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingState, ContentContainer, Header } from '../../shared';
import { useUnit } from 'effector-react';
import { $isUserDataLoading, getUserData } from './models/layoutPageModel';

export const LayoutPage = () => {
    const isLoading = useUnit($isUserDataLoading);

    useEffect(() => {
        getUserData();
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
