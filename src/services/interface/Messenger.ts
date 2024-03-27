namespace Messenger {
  export interface AllExsistingMesseges {
    _msgid: string;
    media: Media;
    contact: Contact;
    _id: string;
    _parentid: string;
    recievingMedium: string;
    msgType: any[];
    isRead: boolean;
    receiveTime: string;
    messageBy: string;
    cmpId: string;
    conversationsId: string;
    __v: number;
  }

  export interface Media {
    message: string;
    msgId: string;
    image?: string[];
    video: any;
    document: any[];
  }

  export interface Contact {
    name: string;
    from: string;
    to: To[];
    cc: any[];
  }

  export interface To {
    name: string;
    email: string;
    id: string;
  }

  export type GroupedConversation = { [key: string]: AllExsistingMesseges[] };

  // Send Message Via Messenger
  export interface SendMessengerMessage {
    object: string
    entry: Entry[]
  }
  
  export interface Entry {
    id: string
    messaging: Messaging[]
  }
  
  export interface Messaging {
    sender: Sender
    recipient: Recipient
    message: Message
  }
  
  export interface Sender {
    id: string
  }
  
  export interface Recipient {
    id: string
  }
  
  export interface Message {
    text: string
  }
  
}

export default Messenger;
