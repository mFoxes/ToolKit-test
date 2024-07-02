import React from 'react';
import { RepositoryDto } from '../../types/repositoryDto';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ReactComponent as RepositoryStarSvg } from '../../assets/svg/repository-star.svg';

interface RepositoryCardProps {
    data: RepositoryDto;
}

export const RepositoryCard = ({ data, ...props }: RepositoryCardProps) => {
    return (
        <Container>
            <TopContainer>
                <TitleLink to={`/repository/${data.owner.login}/${data.name}`}>
                    {data.name}
                </TitleLink>
                <Stars>
                    {data.stargazerCount}
                    <RepositoryStarSvg />
                </Stars>
            </TopContainer>
            <LastCommit>
                {data.commits.length ? (
                    <>
                        Дата последнего коммита:{' '}
                        {moment(new Date(data.commits[0].committedDate)).format('DD.MM.YYYY')}
                    </>
                ) : (
                    'Коммитов нет'
                )}
            </LastCommit>
            <UrlWrapper>
                <a href={data.url}>Go to GitHub</a>
            </UrlWrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 calc(50% - 40px - calc(2 * 20px / 2));
    border: 2px solid ${(props) => props.theme.colors.darkGrey};
    max-height: 120px;
    border-radius: 8px;
    padding: 10px 20px;
    gap: 10px;
    @media (max-width: 660px) {
        flex: 1 1 calc(100% - 40px);
    }
`;

const TopContainer = styled.div`
    display: flex;
    gap: 20px;
    justify-content: space-between;
`;

const TitleLink = styled(Link)`
    color: ${(props) => props.theme.colors.lightBlack};
    text-decoration: none;
    font-size: 26px;
    font-weight: 800;
`;

const Stars = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 22px;
    line-height: 100%;
    svg {
        height: 20px;
        width: 20px;
    }
`;

const LastCommit = styled.div`
    flex: 1 1 100%;
`;

const UrlWrapper = styled.div`
    display: flex;
    justify-content: end;
    a {
        color: ${(props) => props.theme.colors.blue};
        text-decoration: none;
        font-weight: 800;
    }
`;
