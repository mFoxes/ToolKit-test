import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../pages/layout/store/userSlice';
import repositoriesReducer from '../../pages/home/store/repositoriesSlice';
import repositoryInfoReducer from '../../pages/repositoryInfo/store/repositoryInfoSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        repositories: repositoriesReducer,
        repositoryInfo: repositoryInfoReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
