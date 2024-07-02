import styled from 'styled-components';
import { ContentContainer } from '../contentContainer/contentContainer';

export const Header = () => {
    return (
        <StyledHeader>
            <ContentContainer>GitHub Repositories</ContentContainer>
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.lightBlack};
    font-size: 24px;
`;
