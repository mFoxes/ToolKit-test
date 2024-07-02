import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import './reset.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './constants/theme';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apolloClient/apolloClient';
import { Provider } from 'react-redux';
import { store } from './store/store';

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
