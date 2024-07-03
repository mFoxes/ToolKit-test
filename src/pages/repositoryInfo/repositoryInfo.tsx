import moment from 'moment';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as RepositoryStarSvg } from '../../assets/svg/repository-star.svg';
import { LoadingState } from '../../constants/lodaingState';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getRepositoryInfo, setInitialState } from '../../store/slices/repositoryInfoSlice';

export const RepositoryInfo = () => {
    const dispatch = useAppDispatch();
    const params = useParams();

    const ownerInfo = useAppSelector((state) => state.repositoryInfo.ownerInfo);
    const repositoryInfo = useAppSelector((state) => state.repositoryInfo.repositoryInfo);
    const isLoading = useAppSelector((state) => state.repositoryInfo.isLoading);

    useEffect(() => {
        if (params.login && params.name) {
            dispatch(getRepositoryInfo({ login: params.login, name: params.name }));
        }

        return () => {
            dispatch(setInitialState());
        };
    }, []);

    if (isLoading === LoadingState.Pending) {
        return <>Loading...</>;
    }

    return (
        <Container>
            <Left>
                <ProjectTitle>
                    <Title>{repositoryInfo?.name}</Title>
                    <Stars>
                        <RepositoryStarSvg />
                        {repositoryInfo?.stargazerCount}
                    </Stars>
                </ProjectTitle>

                <div>
                    {repositoryInfo?.commits.length ? (
                        <>
                            Дата последнего коммита:{' '}
                            {moment(new Date(repositoryInfo?.commits[0]?.committedDate)).format(
                                'DD.MM.YYYY'
                            )}
                        </>
                    ) : (
                        'Коммитов нет'
                    )}
                </div>
                <DescriptionContainer>
                    <DescriptionTitle>Описание:</DescriptionTitle>
                    <Description>{repositoryInfo?.description}</Description>
                </DescriptionContainer>
            </Left>

            <Right>
                <OwnerContainer>
                    <OwnerImg src={ownerInfo?.avatarUrl} alt={ownerInfo?.login} />
                    <a href={ownerInfo?.url}>{ownerInfo?.login}</a>
                </OwnerContainer>

                <LanguageContainer>
                    Языки:
                    <LanguageList>
                        {repositoryInfo?.languages.map((lang) => (
                            <LanguageItem key={lang.id}>{lang.name}</LanguageItem>
                        ))}
                    </LanguageList>
                </LanguageContainer>
            </Right>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 20px;
`;

const Stars = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 24px;
    line-height: 100%;
    svg {
        height: 20px;
        width: 20px;
    }
`;

const Title = styled.div`
    color: ${(props) => props.theme.colors.lightBlack};
    font-size: 32px;
    font-weight: 800;
`;

const Left = styled.div`
    flex: 1 1 calc(80% - 20px);
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const Right = styled.div`
    flex: 1 1 calc(20% - 20px);
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ProjectTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const OwnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const OwnerImg = styled.img`
    width: 100%;
`;

const LanguageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const LanguageList = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

const LanguageItem = styled.div`
    padding: 4px 8px;
    border: 2px solid ${(props) => props.theme.colors.darkGrey};
    border-radius: 20px;
`;

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const DescriptionTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
`;

const Description = styled.div`
    font-size: 18px;
`;
