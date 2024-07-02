import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/layout';
import { Main } from '../pages/main/main';
import { RequireAuthProvider } from '../components/requireAuthProvider/requireAuthProvider';
import { RepositoryInfo } from '../pages/repositoryInfo/repositoryInfo';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <RequireAuthProvider>
                        <Main />
                    </RequireAuthProvider>
                )
            },
            {
                path: '/repository/:login/:name',
                element: <RepositoryInfo />
            }
        ]
    }
]);
