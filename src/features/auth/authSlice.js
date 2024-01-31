import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const userexist = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: userexist ? userexist : null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "something went wrong",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registeruser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registeruser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registeruser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logoutuser.fulfilled, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.user = null;
        state.message = "";
      });
  },
});
export default authSlice.reducer;

export const registeruser = createAsyncThunk(
  "REGISTER/USER",
  async (formdata,thunkAPI) => {
    // console.log(formdata);
    try {
      return await authService.register(formdata);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutuser = createAsyncThunk("LOGOUT/USER", async () => {
  localStorage.removeItem("user");
});

export const login = createAsyncThunk(
  "LOGIN/USER",
  async (formdata, thunkAPI) => {
    try {
      return await authService.login(formdata);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
