import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: process.env.REACT_APP_GITHUB_URL,
    cache: new InMemoryCache(),
    headers: {
        authorization: process.env.REACT_APP_GITHUB_ACCESS_TOKEN
            ? `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
            : ''
    }
});
