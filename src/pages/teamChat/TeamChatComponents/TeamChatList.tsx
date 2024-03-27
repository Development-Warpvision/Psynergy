import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { selectedConvertions } from "../../../services/backOfficeApi/TeamChatApi";
import ITeamChat from "../../../services/interface/TeamChat";
import ILogedUser from "../../../services/interface/userData";

// plz include userModel also serching field now only add for the accessModel

const TeamChatList: React.FC<{
  userData: ITeamChat.IMyConvertionUser | ITeamChat.IUserData;
  loggedUser: ILogedUser.ILogedUserData | null;
  onChatSelect: (
    id: string,
    messages: ITeamChat.ISelectMessage[] | [],
    username: string,
  ) => void;
}> = ({ userData, loggedUser, onChatSelect }) => {
  // console.log("userdata", userData);

  const [selectedChat, setSelectedChat] = useState<string>("");

  useEffect(() => {
    if ("contributors" in userData) {
      const accessControlUsers = (
        userData.contributors.accesscontroluser || []
      ).filter((x) => x && x._id !== loggedUser?.user._id);

      const regularUsers = (userData.contributors.user || []).filter(
        (x) => x && x._id !== loggedUser?.user._id,
      );

      const filterContributers: (
        | ITeamChat.Accesscontroluser
        | ITeamChat.User
      )[] = accessControlUsers.concat(regularUsers);

      setFilteredData(filterContributers);
      // console.log("filteredData", filterContributers);
    } else {
      setFilteredData([userData]);
    }
  }, [userData, loggedUser?.user._id]);

  const [filteredData, setFilteredData] = useState<ITeamChat.User[]>([]);
  const handleChatSelect = async (username: string, id: string) => {
    // Assuming you have 'loggedUser' and 'setMessages' and 'setSelectedChat' defined
    const fromUser = loggedUser?.user?._id;
    const toUser = id;

    const getConvertionId = (from: string | undefined, to: string) => {
      return [from, to].sort().join("_");
    };

    const convertionId = getConvertionId(fromUser, toUser);

    try {
      const response = await selectedConvertions({
        convertionId: convertionId,
      });
      console.log("res...........", response);
      const mapMessages = response.data.messages;
      // console.log("map", mapMessages);
      const updateMessage = mapMessages.map((chat) => ({
        cmpID: chat.cmpID,
        from: chat.from,
        to: chat.to,
        message: chat.message,
      }));
      onChatSelect(id, updateMessage, username);
      setSelectedChat(username);
    } catch (error: any) {
      if (error.message.includes("404")) {
        // Handle 404 response here
        onChatSelect(id, [], username);
        setSelectedChat(username);
      } else {
        // Handle other errors here
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <Box>
      {filteredData.map((user) => (
        <ListItem
          key={user._id}
          button
          selected={selectedChat === user.username}
          onClick={() => handleChatSelect(user.username, user._id)}>
          <ListItemAvatar>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              color="primary">
              <Avatar
                alt={user.username}
                src="./avatar.png"
                sx={{ backgroundColor: "transparent" }}
              />
            </Badge>
          </ListItemAvatar>
          <ListItemText primary={user.username} secondary={user.role} />
        </ListItem>
      ))}
    </Box>
  );
};

export default TeamChatList;
