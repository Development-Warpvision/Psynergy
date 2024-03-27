import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookieValue from "../componets/utils/getCookie";
// axios.defaults.withCredentials = true; // enable sending cookies

export const outlookAuthSlice = createAsyncThunk<null, any>(
  "mediumauth/get",
  async ({}, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/demo/signin`,
      );

      if (res.status === 200) {
        console.log("response....", res);
        return await res.data;
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

export const gmailAuthSlice = createAsyncThunk<null, any>(
  "mediumauth/get",
  async ({}, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/gmail/gettoken`,
      );
      if (res.status === 200) {
        return await res.data;
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

export const facebookPageAuthSlice = createAsyncThunk<any, any>(
  "mediumauth/get",
  async ({ access_token, userID }, thunkAPI) => {
    console.log(access_token);
    console.log(userID);
    try {
      const res = await axios.get(
        `https://graph.facebook.com/me?access_token=${access_token}`,
        { withCredentials: false },
      );
      console.log(access_token);
      console.log(res.data);
      return await res.data;
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

export const facebookLogout = createAsyncThunk<any, any>(
  "mediumauth/facebook/logout",
  async ({}, thunkAPI) => {
    try {
      const facebookcookie = getCookieValue("facebook");
      const facebookuserid = getCookieValue("facebookuserid");
      const res = await axios.get(
        `https://graph.facebook.com/v15.0/${facebookuserid}/permissions?access_token=${facebookcookie}`,
        { withCredentials: true },
      );

      return await res.data;
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

export const gmailLogout = createAsyncThunk<null, any>(
  "mediumauth/gmail/logout",
  async ({}, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/gmail/logout`,
        { withCredentials: true },
      );
      if (res.status === 200) {
        return await res.data;
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

export const outlookLogout = createAsyncThunk<null, any>(
  "mediumauth/outlook/logout",
  async ({}, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/demo/logout`,
        null,
        { withCredentials: true },
      );
      if (res.status === 200) {
        return await res.data;
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
