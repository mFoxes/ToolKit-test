import styled from 'styled-components';

export const MainPage = () => {
    return (
        <MainPageWrapper>
            <div>search</div>
            <div>list</div>
            <PaginatorWrapper>paginator</PaginatorWrapper>
        </MainPageWrapper>
    );
};

const MainPageWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

const PaginatorWrapper = styled.div`
    margin-top: auto;
`;
