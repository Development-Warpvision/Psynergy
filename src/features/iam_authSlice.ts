import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const user = localStorage.getItem("user");

type Todo = {
  email: string;
  password: string;
  token: string;
  user: any;
};

export const iamlogin = createAsyncThunk<Todo, any>(
  "iam/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/iam/login`,
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
        localStorage.setItem(
          "label",
          JSON.stringify(data.user.createdby.label)
        );

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

export const iamsignup = createAsyncThunk<Todo, any>(
  "iam/signup",
  async ({ username, password, email, role }, thunkAPI) => {
    // console.log(username, password, email, role);

    try {
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/iam/signup`,
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
            role,
          }),
        }
      );
      const data = await res.json();
      // console.log(data);

      if (res.status === 200) {
        // console.log(data.user);

        localStorage.setItem("user", JSON.stringify(data));

        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const iamPasswordReset = createAsyncThunk<Todo, any>(
  "iam/password/reset",
  async ({ email }, thunkAPI) => {
    try {
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/iam/password/reset`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
          }),
        }
      );
      const data = await res.json();
      // console.log(data);

      if (res.status === 200) {
        // console.log(data.user);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const iamPasswordUpdate = createAsyncThunk<Todo, any>(
  "iam/password/reset",
  async ({ email, newPassword }, thunkAPI) => {
    try {
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/iam/password/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            newPassword,
            email,
          }),
        }
      );
      const data = await res.json();
      // console.log(data);

      if (res.status === 200) {
        // console.log(data.user);
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
export const IamdeleteProfile = createAsyncThunk<Todo, any>(
  "iam/delete",
  async ({ email }, thunkAPI) => {
    try {
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/iam/delete/staff`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
          }),
        }
      );
      const data = await res.json();
      // console.log(data);

      if (res.status === 200) {
        // console.log(data.user);

        localStorage.setItem("user", JSON.stringify(data));

        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const iamSlice: any = createSlice({
  name: "iam",
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
      .addCase(iamlogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(iamlogin.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(iamlogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      });
  },
});

export const { reset } = iamSlice.actions;
export default iamSlice.reducer;
