import React, { HTMLProps } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AuthorizedState } from '../../constants/authorizedState';
import { Navigate } from 'react-router-dom';

interface RequireAuthProvider extends HTMLProps<HTMLDivElement> {}

export const RequireAuthProvider = ({ children, ...props }: RequireAuthProvider) => {
    const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

    if (isAuthorized === AuthorizedState.Empty) {
        return <></>;
    }

    if (isAuthorized === AuthorizedState.Unauthorized) {
        return <>Проверьте Access Token в .env файле</>;
    }

    return <>{children}</>;
};
