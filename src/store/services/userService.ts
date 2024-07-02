import { apolloClient } from '../../apolloClient/apolloClient';
import { userQueries } from '../queries/userQueries';

export const userService = {
    getUserData: async () => {
        return await apolloClient.query({ query: userQueries.USER_DATA });
    }
};
