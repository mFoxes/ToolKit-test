import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingState } from '../../../shared/constants/lodaingState';
import { repositoriesService } from '../api/repositoriesService';
import { formatRepositoriesByQueryResponse } from '../helpers/formatRepositoriesByQueryResponse';
import { RepositoriesByQueryQueriesDto } from '../types/queries/repositoriesQueriesDto';
import { RepositoryDto } from '../types/repositoryDto';

const sliceName = 'repositories';

interface InitialState {
    repositories: RepositoryDto[];
    repositoryCount: number;
    currentPage: number;

    isLoading: LoadingState;
}

const initialState: InitialState = {
    repositories: [],
    repositoryCount: 0,
    currentPage: 0,

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
        },
        setRepositoriesCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRepositoriesByName.pending, (state) => {
            state.repositories = [];
            state.isLoading = LoadingState.Pending;
        });
        builder.addCase(getRepositoriesByName.fulfilled, (state, action) => {
            const copyPayload = JSON.parse(JSON.stringify(action.payload));
            state.repositories = formatRepositoriesByQueryResponse(copyPayload);
            state.repositoryCount = action.payload.search.repositoryCount;
            state.isLoading = LoadingState.Fulfilled;
        });
        builder.addCase(getRepositoriesByName.rejected, (state) => {
            state.isLoading = LoadingState.Rejected;
        });
    }
});

export const { setInitialState, setRepositoriesCurrentPage } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
