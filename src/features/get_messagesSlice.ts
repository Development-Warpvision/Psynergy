import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true; // enable sending cookies

export const getConverstaions = createAsyncThunk<any, any>(
  "conversations/get",
  async ({ skip }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/conversations/conversation?skip=${skip}`,
      );

      if (res.status === 200) {
        const data = await res.data.chats;
        console.log("convvv", res.data);
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
  },
);

export const getAllConverstaionsforStaff = createAsyncThunk<any, any>(
  "conversations/get",

  async ({ userId }, thunkAPI) => {
    try {
      // const res = await axios.get("/api/v1/meta/conversation/");
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/conversations/conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userId,
          }),
        },
      );
      const data = await res.json();

      if (res.status === 200) {
        return data.chats;
      } else {
        return thunkAPI.rejectWithValue("error");
      }
    } catch (error: any) {
      // console.log("error");
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();

      return thunkAPI.rejectWithValue("error");
    }
  },
);

export const getRecentChats = createAsyncThunk<null, any>(
  "conversations/get",

  async ({}, thunkAPI) => {
    try {
      // const res = await axios.get("/api/v1/meta/conversation/");
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/conversations/conversation/recent`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const data = await res.json();

      if (res.status === 200) {
        return data.chats;
      } else {
        return thunkAPI.rejectWithValue("error");
      }
    } catch (error: any) {
      // console.log("error");
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();

      return thunkAPI.rejectWithValue("error");
    }
  },
);

export const PinnedChats = createAsyncThunk<null, any>(
  "conversations/pin",

  async ({ chatid }, thunkAPI) => {
    try {
      // const res = await axios.get("/api/v1/meta/conversation/");
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/conversations/conversation/pin`,
        {
          method: "PUT",
          body: JSON.stringify({ chatid }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const data = await res.json();
      //  console.log("datalhh", data)
      if (res.status === 200) {
        return data.chats;
      } else {
        // console.log(data)
        return data;
        return thunkAPI.rejectWithValue("error");
      }
    } catch (error: any) {
      console.log("error", error);
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();

      return thunkAPI.rejectWithValue("error");
    }
  },
);

export const outlookChat = createAsyncThunk<null, any>(
  "conversations/outlook/get",
  async ({}, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/outlook/getmail`,
        {
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        console.log("getMail.....", res.data);
        return res.data;
      } else {
        return thunkAPI.rejectWithValue("error");
      }
    } catch (error: any) {
      console.log("error");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue("error");
    }
  },
);

export const gmailChat = createAsyncThunk<null, any>(
  "conversations/gmail/get",
  async ({}, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/gmail/getmail`,
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        console.log("res............................", res);
        return res.data;
      } else {
        return thunkAPI.rejectWithValue("error");
      }
    } catch (error: any) {
      // console.log("error");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue("error");
    }
  },
);

export const metaChat = createAsyncThunk<any, any>(
  "conversations/meta/get",
  async ({ msgPlatform }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/meta/getMsg/`,
        {
          params: { msgPlatform },
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        // console.log(res.data.data);
        return res.data;
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
  },
);

const chatSlice: any = createSlice({
  name: "chat",
  initialState: {
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
      .addCase(getConverstaions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConverstaions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getConverstaions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // console.log("reject");
      });
  },
});

export const readChat = createAsyncThunk<any, any>(
  "conversations/read",
  async ({ chatId }, thunkAPI) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/conversations/read`,
        {
          chatId,
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        console.log("res......", res);
        return "true";
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
  },
);

export const { reset } = chatSlice.actions;
export default chatSlice.reducer;
