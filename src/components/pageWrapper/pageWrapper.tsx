import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../header/header';
import { ContentContainer } from '../contentContainer/contentContainer';

export const PageWrapper = () => {
    return (
        <StyledPageWrapper>
            <Header />
            <ContentContainer fullHeight>
                <Outlet />
            </ContentContainer>
        </StyledPageWrapper>
    );
};

const StyledPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 100vh;
    height: 100%;
    width: 100%;
`;
