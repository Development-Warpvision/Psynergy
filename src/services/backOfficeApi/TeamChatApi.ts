import ITeamChat from "../interface/TeamChat";
import { http } from "./BackOfficeApi";

export const fetchAllAccessUsers = () => {
  return http.get<ITeamChat.IUserData[]>("/api/v1/teamchat/getAllUser");
};

export const selectedConvertions = (params: { convertionId: string }) => {
  return http.get<ITeamChat.ISelectMyConvertionUser>(
    "/api/v1/teamchat/getSelectedConversation",
    { params: { convertionId: params.convertionId } },
  );
};

export const sendNewMessage = (messageData: ITeamChat.ISelectMessage) => {
  return http.post<ITeamChat.ISelectMessage>(
    "/api/v1/teamchat/newMessage",
    messageData,
  );
};

export const fetchMyAllConvertionsuser = (params: {
  userId: string | undefined;
}) => {
  return http.get<ITeamChat.IMyConvertionUser[]>(
    "/api/v1/teamchat/getAllMyConversions",
    { params: { userId: params.userId } },
  );
};

export const fetchAllUsers = () => {
  return http.get<ITeamChat.IUserData[]>("/api/v1/teamchat/getAllMainUser");
};
