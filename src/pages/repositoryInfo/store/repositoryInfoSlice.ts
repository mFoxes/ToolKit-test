import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingState } from '../../../shared/constants/lodaingState';
import { RepositoryInfoDto } from '../../repositoryInfo/types/repositoryInfoDto';
import { formatRepositoryInfoResponse } from '../../repositoryInfo/helpers/formatRepositoryInfoResponse';
import { OwnerInfoDto } from '../../../entities/types/ownerInfoDto';
import { repositoryInfoService } from '../api/repositoryInfoService';
import { RepositoryInfoQueriesDto } from '../types/queries/repositoryInfoQueriesDto';

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
