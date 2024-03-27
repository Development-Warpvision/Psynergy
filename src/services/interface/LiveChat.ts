namespace ILiveChat {
  export interface Root {
    _id: string;
    name: string;
    userEmail: string;
    chat: Chat[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface Chat {
    userMsg?: string;
    name?: string;
    email?: string;
    time: string;
    _id: string;
    agentReply?: string;
  }

  export interface GroupChatRoot {
    [key: string]: GroupChat;
  }

  export interface GroupChat {
    groupName: string;
    chats: ChatGroup[];
  }

  export interface ChatGroup {
    _id: string;
    name: string;
    userEmail: string;
    chat: Coversation[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface Coversation {
    userMsg?: string;
    name?: string;
    email?: string;
    time: string;
    _id: string;
    agentReply?: string;
  }
}

export default ILiveChat;
