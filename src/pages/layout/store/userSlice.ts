import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingState } from '../../../shared/constants/lodaingState';
import { userService } from '../api/userService';
import { AuthorizedState } from '../../../entities/constants/authorizedState';
import { UserQueriesDto } from '../types/queries/userQueriesDto';

const sliceName = 'user';

interface InitialState {
    login: string;
    isAuthorized: AuthorizedState;
    isLoading: LoadingState;
}

const initialState: InitialState = {
    login: '',
    isAuthorized: AuthorizedState.Empty,
    isLoading: LoadingState.Empty
};

export const getUserData = createAsyncThunk<UserQueriesDto>(
    `${sliceName}/getUserData`,
    async (_, thunkAPI) => {
        try {
            const response = await userService.getUserData();
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const userSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setInitialState: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserData.pending, (state) => {
            state.isLoading = LoadingState.Pending;
        });
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.login = action.payload.viewer.login;
            state.isAuthorized = AuthorizedState.Authorized;
            state.isLoading = LoadingState.Fulfilled;
        });
        builder.addCase(getUserData.rejected, (state) => {
            state.isAuthorized = AuthorizedState.Unauthorized;
            state.isLoading = LoadingState.Rejected;
        });
    }
});

export const { setInitialState } = userSlice.actions;
export default userSlice.reducer;
