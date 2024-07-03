import React, { HTMLProps } from 'react';
import { AuthorizedState } from '../../entities/constants/authorizedState';
import { useUnit } from 'effector-react';
import { $isAuthorized } from '../../pages/layout';

interface RequireAuthProviderProps extends HTMLProps<HTMLDivElement> {}

export const RequireAuthProvider = ({ children }: RequireAuthProviderProps) => {
    const isAuthorized = useUnit($isAuthorized);

    if (isAuthorized === AuthorizedState.Empty) {
        return <></>;
    }

    if (isAuthorized === AuthorizedState.Unauthorized) {
        return <>Проверьте Access Token в .env файле</>;
    }

    return <>{children}</>;
};
