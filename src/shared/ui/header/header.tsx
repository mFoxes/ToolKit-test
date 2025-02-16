import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ContentContainer } from '../contentContainer/contentContainer';
import React from 'react';
import { useUnit } from 'effector-react';
import { $login } from '../../../pages/layout';
import { routesNameService } from '../../';

export const Header = () => {
    const login = useUnit($login);

    return (
        <HeaderWrapper>
            <ContentContainer>
                <ContentWrapper>
                    <TitleLink to={routesNameService.homePage}>GitHub Repositories</TitleLink>
                    <Login>{login}</Login>
                </ContentWrapper>
            </ContentContainer>
        </HeaderWrapper>
    );
};

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 80px;
    width: 100%;
    background-color: ${(props) => props.theme.colors.lightBlack};
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
`;

const TitleLink = styled(Link)`
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.lightBlack};
    text-decoration: none;
    font-size: 32px;
`;

const Login = styled.div`
    color: ${(props) => props.theme.colors.white};
    font-size: 18px;
`;
