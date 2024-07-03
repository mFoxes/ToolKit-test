import { createEffect, createStore } from 'effector';
import { RepositoryInfoQueriesDto } from '../types/queries/repositoryInfoQueriesDto';
import { repositoryInfoService } from '../api/repositoryInfoService';
import { LoadingState } from '../../../shared';
import { RepositoryInfoDto } from '../types/repositoryInfoDto';
import { OwnerInfoDto } from '../../../entities/types/ownerInfoDto';
import { formatRepositoryInfoResponse } from '../helpers/formatRepositoryInfoResponse';

export const getRepositoryInfo = createEffect<
    { login: string; name: string },
    RepositoryInfoQueriesDto,
    Error
>(async ({ login, name }) => {
    const response = await repositoryInfoService.getRepositoryInfo(login, name);
    return response.data;
});

export const resetRepositoryInfoState = createEffect<void, void>();

export const $ownerInfo = createStore<OwnerInfoDto | null>(null)
    .on<RepositoryInfoQueriesDto>(
        getRepositoryInfo.doneData,
        (_, payload) => formatRepositoryInfoResponse(payload)[0]
    )
    .reset(resetRepositoryInfoState);

export const $repositoryInfo = createStore<RepositoryInfoDto | null>(null)
    .on<RepositoryInfoQueriesDto>(
        getRepositoryInfo.doneData,
        (_, payload) => formatRepositoryInfoResponse(payload)[1]
    )
    .reset(resetRepositoryInfoState);

export const $isRepositoryInfoLoading = createStore<LoadingState>(LoadingState.Empty)
    .on(getRepositoryInfo, () => LoadingState.Pending)
    .on(getRepositoryInfo.doneData, () => LoadingState.Fulfilled)
    .on(getRepositoryInfo.fail, () => LoadingState.Rejected)
    .reset(resetRepositoryInfoState);
