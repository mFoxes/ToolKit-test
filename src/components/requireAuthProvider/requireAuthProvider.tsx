import { HTMLProps } from 'react';
import { AuthorizedState } from '../../constants/authorizedState';
import { useAppSelector } from '../../hooks/useAppSelector';

interface RequireAuthProviderProps extends HTMLProps<HTMLDivElement> {}

export const RequireAuthProvider = ({ children, ...props }: RequireAuthProviderProps) => {
    const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

    if (isAuthorized === AuthorizedState.Empty) {
        return <></>;
    }

    if (isAuthorized === AuthorizedState.Unauthorized) {
        return <>Проверьте Access Token в .env файле</>;
    }

    return <>{children}</>;
};
