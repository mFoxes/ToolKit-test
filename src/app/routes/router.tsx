import { createBrowserRouter } from 'react-router-dom';
import { LayoutPage } from '../../pages/layout';
import { RepositoryInfoPage } from '../../pages/repositoryInfo';
import { HomePage } from '../../pages/home';
import React from 'react';
import { RequireAuthProvider } from '../../features/requireAuthProvider/requireAuthProvider';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPage />,
        children: [
            {
                index: true,
                element: (
                    <RequireAuthProvider>
                        <HomePage />
                    </RequireAuthProvider>
                )
            },
            {
                path: '/repository/:login/:name',
                element: (
                    <RequireAuthProvider>
                        <RepositoryInfoPage />
                    </RequireAuthProvider>
                )
            }
        ]
    }
]);
