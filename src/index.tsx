import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes/router';
import './app/styles/reset.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './app/theme/theme';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './shared';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </ApolloProvider>
    </React.StrictMode>
);
