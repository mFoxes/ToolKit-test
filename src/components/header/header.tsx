import styled from 'styled-components';
import { ContentContainer } from '../contentContainer/contentContainer';
import { useAppSelector } from '../../hooks/useAppSelector';

export const Header = () => {
    const userLogin = useAppSelector((state) => state.user.login);

    return (
        <HeaderWrapper>
            <ContentContainer>
                <ContentWrapper>
                    <Title>GitHub Repositories</Title>
                    <Login>{userLogin}</Login>
                </ContentWrapper>
            </ContentContainer>
        </HeaderWrapper>
    );
};

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
    background-color: ${(props) => props.theme.colors.lightBlack};
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 40px;
`;

const Title = styled.div`
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.lightBlack};
    font-size: 24px;
`;

const Login = styled.div`
    color: ${(props) => props.theme.colors.white};
    font-size: 16px;
`;
