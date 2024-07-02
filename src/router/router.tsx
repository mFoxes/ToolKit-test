import { createBrowserRouter } from 'react-router-dom';
import { PageWrapper } from '../components/pageWrapper/pageWrapper';

export const router = createBrowserRouter([
    {
        element: <PageWrapper />,
        children: [
            {
                path: '/',
                element: <>test1</>
            },
            {
                path: '/repository/:id',
                element: <>test2</>
            }
        ]
    }
]);
