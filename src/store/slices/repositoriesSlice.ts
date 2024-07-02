import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingState } from '../../constants/lodaingState';
import { formatRepositoriesByQueryResponse } from '../../helpers/formatRepositoriesByQueryResponse';
import { RepositoriesByQueryQueriesDto } from '../../types/queries/repositoriesQueriesDto';
import { RepositoryDto } from '../../types/repositoryDto';
import { repositoriesService } from '../services/repositoriesService';

const sliceName = 'repositories';

interface InitialState {
    repositories: RepositoryDto[];

    isLoading: LoadingState;
}

const initialState: InitialState = {
    repositories: [],

    isLoading: LoadingState.Empty
};

export const getRepositoriesByName = createAsyncThunk<
    RepositoriesByQueryQueriesDto,
    { name: string; login: string; after?: string }
>(`${sliceName}/getRepositoriesByName`, async (params, thunkAPI) => {
    try {
        const { name, login, after } = params;
        const query = name ? `${name} in:name` : login;
        const response = await repositoriesService.getRepositoriesByName(query, after);
        console.log('response', response);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const repositoriesSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setInitialState: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRepositoriesByName.pending, (state) => {
            state.isLoading = LoadingState.Pending;
        });
        builder.addCase(getRepositoriesByName.fulfilled, (state, action) => {
            const copyPayload = JSON.parse(JSON.stringify(action.payload));
            state.repositories = formatRepositoriesByQueryResponse(copyPayload);
            state.isLoading = LoadingState.Fulfilled;
        });
        builder.addCase(getRepositoriesByName.rejected, (state) => {
            state.isLoading = LoadingState.Rejected;
        });
    }
});

export const { setInitialState } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
