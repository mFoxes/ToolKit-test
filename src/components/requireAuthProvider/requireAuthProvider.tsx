import React, { HTMLProps } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AuthorizedState } from '../../constants/authorizedState';
import { Navigate } from 'react-router-dom';

interface RequireAuthProvider extends HTMLProps<HTMLDivElement> {}

export const RequireAuthProvider = ({ children, ...props }: RequireAuthProvider) => {
    const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

    if (isAuthorized === AuthorizedState.Unauthorized) {
        return <Navigate to={{ pathname: '/unauthorized' }} replace />;
    }

    return <>{children}</>;
};
