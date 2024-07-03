import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes/router';
import './app/styles/reset.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './app/theme/theme';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './shared/api/apolloClient';
import { Provider } from 'react-redux';
import { store } from './app/store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>
);
