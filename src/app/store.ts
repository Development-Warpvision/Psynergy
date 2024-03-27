import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice';
import authSlice from "../features/authSlice"; // notifications : Alertslice.reducer,
import meSlice from "../features/meDetailsSlice";
import iamSlice from "../features/iam_authSlice";
import chatSlice from "../features/get_messagesSlice";

export const store: any = configureStore({
  reducer: {
    auth: authSlice,
    me: meSlice,
    iam: iamSlice,
    chat: chatSlice,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat(allProfile.middleware),
});
