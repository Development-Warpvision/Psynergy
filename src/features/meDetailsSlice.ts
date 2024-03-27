import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const user = localStorage.getItem("user");
const isStaff = localStorage.getItem("isStaff");

export const me = createAsyncThunk<any, any>(
  "auth/me",
  async ({}, thunkAPI) => {
    try {
      const res: any = await fetch(
        isStaff === "true"
          ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/iam/me`
          : `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(data));

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

      // return thunkAPI.rejectWithValue(message);
      return thunkAPI.rejectWithValue("error");
    }
  }
);

export const checkUser = createAsyncThunk<any, any>(
  "auth/check",
  async ({}, thunkAPI) => {
    try {
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/check`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (res.status === 200) {
        const data = await res.json();
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

      // return thunkAPI.rejectWithValue(message);
      return thunkAPI.rejectWithValue("error");
    }
  }
);

const meSlice = createSlice({
  name: "me",
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
      .addCase(me.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(me.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// export const checkMeOnSidebar = createAsyncThunk(
//   "auth/me/check",
//   async (thunkAPI) => {
//     try {
//       const res: any = await fetch(
//         `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/me`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             credentials: "include",
//           },
//         }
//       );
//       const data = await res.json();
//       // console.log(data);

//       if (res.status === 200) {
//         localStorage.setItem("user", JSON.stringify(data));
//         return data;
//       }
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       // return thunkAPI.rejectWithValue(message);
//       return thunkAPI.rejectWithValue("error");;
//     }
//   }
// );
export const { reset } = meSlice.actions;
export default meSlice.reducer;
