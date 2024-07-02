import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../services/userService';
import { LoadingState } from '../../constants/lodaingState';
import { ViewerData } from '../../types/viewerData';
import { UserData } from '../../types/userData';
import { AuthorizedState } from '../../constants/authorizedState';

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

export const getUserData = createAsyncThunk<ViewerData<UserData>>(
    `${sliceName}/getUserData`,
    async (_, thunkAPI) => {
        try {
            const response = await userService.getUserData();
            console.log('response', response);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue('Unauthorized');
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
