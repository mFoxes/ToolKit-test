import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getUserData } from '../../store/slices/userSlice';
import { ContentContainer } from '../contentContainer/contentContainer';
import { Header } from '../header/header';

export const Layout = () => {
    const dispatch = useAppDispatch();

    if (process.env.NODE_ENV === 'development') {
        loadDevMessages();
        loadErrorMessages();
    }

    useEffect(() => {
        dispatch(getUserData());
    }, []);

    return (
        <LayoutWrapper>
            <Header />
            <ContentContainer fullHeight>
                <Outlet />
            </ContentContainer>
        </LayoutWrapper>
    );
};

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 100vh;
    height: 100%;
    width: 100%;
`;
