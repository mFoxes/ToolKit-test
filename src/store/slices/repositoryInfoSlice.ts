import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingState } from '../../constants/lodaingState';
import { OwnerInfoDto } from '../../types/ownerInfoDto';
import { RepositoryInfoQueriesDto } from '../../types/queries/repositoryQueriesDto';
import { RepositoryInfoDto } from '../../types/repositoryInfoDto';
import { repositoryInfoService } from '../services/repositoryInfoService';
import { formatRepositoryInfoResponse } from '../../helpers/formatRepositoryInfoResponse';

const sliceName = 'repositoryInfo';

interface InitialState {
    ownerInfo: OwnerInfoDto | undefined;
    repositoryInfo: RepositoryInfoDto | undefined;

    isLoading: LoadingState;
}

const initialState: InitialState = {
    ownerInfo: undefined,
    repositoryInfo: undefined,

    isLoading: LoadingState.Empty
};

export const getRepositoryInfo = createAsyncThunk<
    RepositoryInfoQueriesDto,
    { login: string; name: string }
>(`${sliceName}/getRepositoryInfo`, async (params, thunkAPI) => {
    try {
        const { login, name } = params;
        const response = await repositoryInfoService.getRepositoryInfo(login, name);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const repositoryInfoSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setInitialState: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRepositoryInfo.pending, (state) => {
            state.isLoading = LoadingState.Pending;
        });
        builder.addCase(getRepositoryInfo.fulfilled, (state, action) => {
            const copyPayload = JSON.parse(JSON.stringify(action.payload));
            const [ownerInfo, repositoryInfo] = formatRepositoryInfoResponse(copyPayload);

            state.ownerInfo = ownerInfo;
            state.repositoryInfo = repositoryInfo;
            state.isLoading = LoadingState.Fulfilled;
        });
        builder.addCase(getRepositoryInfo.rejected, (state) => {
            state.isLoading = LoadingState.Rejected;
        });
    }
});

export const { setInitialState } = repositoryInfoSlice.actions;
export default repositoryInfoSlice.reducer;
