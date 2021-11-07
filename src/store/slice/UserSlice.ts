import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "api/UserApi";
import LocalStorageService from "utils/LocalStorageService";

interface UserState {
  current: any;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  current: {},
  loading: false,
  error: ''
}

export const login: any = createAsyncThunk('user/login',
  async (params: any) => {
    const currentUser = await UserApi.login(params);
    return currentUser;
  }
);

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state: UserState) => {
      state.loading = true;
    },
    [login.rejected]: (state: UserState, action: any) => {
      state.loading = false;
      state.error = action.error;
      state.current = {};
    },
    [login.fulfilled]: (state: UserState, action: any) => {
      state.loading = false;
      state.current = action.payload;
      LocalStorageService.setEncode('user', state.current)
      LocalStorageService.setEncode('token', state.current.token)
    }
  }
});

export default UserSlice.reducer