import { createAsyncThunk } from "@reduxjs/toolkit";

type Todo = {
  msgId: string;
  role: string;
  labels: any;
  user: any;
};

export const taskAssign = createAsyncThunk<Todo, any>(
  "label_staskAssign",
  async ({ msgId, userId }, thunkAPI) => {
    try {
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/assigntask/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            msgId,
          }),
        }
      );
      const data = await res.json();
      // console.log(data);
      if (res.status === 200) {
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

export const labelAssign = createAsyncThunk<Todo, any>(
  "auth/role",
  async ({ name, userId }, thunkAPI) => {
    // console.log(name, userId);

    try {
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/roletask/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            role_name: name,
          }),
        }
      );
      const data = await res.json();
      // console.log(data);
      localStorage.setItem("user", JSON.stringify(data));

      if (res.status === 200) {
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

export const labeltoList = createAsyncThunk<Todo, any>(
  "auth/label",
  async ({ label, method }, thunkAPI) => {
    try {
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/label`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            label,
          }),
        }
      );
      const data = await res.json();

      if (res.status === 200) {
        // // console.log(data.label);
        localStorage.setItem("label", JSON.stringify(data.label));
        return data;
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

export const labelAssigntoConverstaion = createAsyncThunk<Todo, any>(
  "auth/label",
  async ({ label, id }, thunkAPI) => {
    try {
      const res: any = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/label/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            label,
            id,
          }),
        }
      );
      const data = await res.json();

      if (res.status === 200) {
        return data;
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
