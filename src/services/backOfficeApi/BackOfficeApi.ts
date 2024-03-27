import axios from "axios";
import Messenger from "../interface/Messenger";

export const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const getConversations = ({
  medium,
}: {
  medium: "messenger" | "gmail";
}) =>
  http.get<Messenger.AllExsistingMesseges[]>(
    "/api/v1/conversations/getMessage",
    {
      params: { medium },
    },
  );

export const sendMessengerMessage = (
  params: Messenger.SendMessengerMessage,
) => {
  const facebookCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("facebook="));
  console.log("facebookCookie", facebookCookie);
  // return http.post<string>("/api/v1/meta/webhook", {
  //   params,
  //   Headers: {
  //     Cookies: facebookCookie,
  //   },
  // });
};
