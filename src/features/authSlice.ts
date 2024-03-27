import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const user = localStorage.getItem("user");

export const login = createAsyncThunk<any, any>(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      const data = await res.json();

      if (res.status === 201) {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("label", JSON.stringify(data.user.label));

        // console.log(data.user._id);

        return data;
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue("error");
    }
  }
);

export const register = createAsyncThunk<any, any>(
  "auth/login",
  async ({ email, username, password, cmpId }, thunkAPI) => {
    try {
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            username,
            password,
            cmpId,
          }),
        }
      );
      const data = await res.json();

      if (res.status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue("error");
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue("error");
    }
  }
);

const authSlice: any = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
