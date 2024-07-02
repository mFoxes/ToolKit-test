import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import repositoriesReducer from './slices/repositoriesSlice';
import repositoryInfoReducer from './slices/repositoryInfoSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        repositories: repositoriesReducer,
        repositoryInfo: repositoryInfoReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
