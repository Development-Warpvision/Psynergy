import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { outlookChat } from "../features/get_messagesSlice";

const FetchChat = () => {
  const dispatch = useDispatch<any>();

  dispatch(outlookChat({})).then(
    (onResolved: any) => {
      // console.log("done");
    },
    (onRejected: any) => {
      // console.log("reje");
    }
  );
  return <div>FetchChat</div>;
};

export default FetchChat;
