import UserApi from "api/UserApi";
import LocalStorageService from "utils/LocalStorageService";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const login = createAsyncThunk('user/login',
  async (params) => {
    const currentUser = await UserApi.login(params);
    return currentUser;
  }
);

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    loading: false,
    error: ''
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.current = {};
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
      LocalStorageService.setUser(state.current)
      LocalStorageService.setToken(state.current.token)
    }
  }
});

export default UserSlice.reducer