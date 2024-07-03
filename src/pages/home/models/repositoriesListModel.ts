import { createEffect, createStore } from 'effector';
import { RepositoriesByQueryQueriesDto } from '../types/queries/repositoriesQueriesDto';
import { repositoriesService } from '../api/repositoriesService';
import { RepositoryDto } from '../types/repositoryDto';
import { formatRepositoriesByQueryResponse } from '../helpers/formatRepositoriesByQueryResponse';
import { LoadingState } from '../../../entities';

export const getRepositoriesByName = createEffect<
    { name: string; login: string },
    RepositoriesByQueryQueriesDto,
    Error
>(async ({ name, login }) => {
    const query = name ? `${name} in:name` : login;
    const response = await repositoriesService.getRepositoriesByName(query);
    return response.data;
});

export const resetRepositoriesState = createEffect<void, void>();
export const setRepositoriesCurrentPage = createEffect<number, number>((value) => value);

export const $repositoriesContent = createStore<RepositoryDto[]>([])
    .on(getRepositoriesByName, () => [])
    .on<RepositoriesByQueryQueriesDto>(getRepositoriesByName.doneData, (_, payload) =>
        formatRepositoriesByQueryResponse(payload)
    )
    .reset(resetRepositoriesState);

export const $repositoryCount = createStore<number>(0)
    .on<RepositoriesByQueryQueriesDto>(
        getRepositoriesByName.doneData,
        (_, payload) => payload.search.repositoryCount
    )
    .on(getRepositoriesByName.fail, () => 0)
    .reset(resetRepositoriesState);

export const $currentRepositoriesPage = createStore<number>(0)
    .on(setRepositoriesCurrentPage, (_, payload) => payload)
    .reset(resetRepositoriesState);

export const $isRepositoriesLoading = createStore<LoadingState>(LoadingState.Empty)
    .on(getRepositoriesByName, () => LoadingState.Pending)
    .on(getRepositoriesByName.doneData, () => LoadingState.Fulfilled)
    .on(getRepositoriesByName.fail, () => LoadingState.Rejected)
    .reset(resetRepositoriesState);
