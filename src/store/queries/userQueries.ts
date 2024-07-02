import { gql } from '@apollo/client';

export const userQueries = {
    USER_DATA: gql`
        query {
            viewer {
                login
            }
        }
    `
};
