import { createEffect, createStore } from 'effector';
import { AuthorizedState } from '../../../entities/constants/authorizedState';
import { LoadingState } from '../../../shared';
import { userService } from '../api/userService';
import { UserQueriesDto } from '../types/queries/userQueriesDto';

export const getUserData = createEffect<void, UserQueriesDto, Error>(async () => {
    const response = await userService.getUserData();
    return response.data;
});

export const $login = createStore<string>('').on<UserQueriesDto>(
    getUserData.doneData,
    (_, payload) => payload.viewer.login
);

export const $isAuthorized = createStore<AuthorizedState>(AuthorizedState.Empty)
    .on(getUserData.doneData, () => AuthorizedState.Authorized)
    .on(getUserData.fail, () => AuthorizedState.Unauthorized);

export const $isUserDataLoading = createStore<LoadingState>(LoadingState.Empty)
    .on(getUserData, () => LoadingState.Pending)
    .on(getUserData.doneData, () => LoadingState.Fulfilled)
    .on(getUserData.fail, () => LoadingState.Rejected);
