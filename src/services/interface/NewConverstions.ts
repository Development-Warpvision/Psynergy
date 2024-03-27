namespace INewConvertions {
  export interface Converstion {
    _id: string;
    users: User[];
    message: Message[];
    recievingMedium: string;
    cmpId: string;
    userSpecificId: string;
    labels: any[];
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    [key: string]: any;
  }

  export interface User {
    _id: string;
    username: string;
    cmpId: string;
    email: string;
    password: string;
    chatKey: string;
    online: boolean;
    emailNotificationsEnabled: boolean;
    available: boolean;
    assigner: any[];
    assignto: any[];
    messageAssign: any[];
    chatKeyExpiry: string;
    isVerified: boolean;
    message: string[];
    role: string[];
    staff: string[];
    label: any[];
    pinChat: any[];
    resetPasswordExpiry: string;
    otpExpiry: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    otpToken: string;
    outlookIdName: string;
    outlookSubscriptionId: string;
    outlookToken: string;
  }

  export interface Message {
    media: Media;
    contact: Contact;
    _id: string;
    _parentid: string;
    _msgid: string;
    recievingMedium: string;
    messages: any[];
    msgType: any[];
    isRead: boolean;
    receiveTime: string;
    messageBy: string;
    cmpId: string;
    conversationsId: string;
    __v: number;
  }

  export interface Media {
    emailMsg: EmailMsg;
    image: any[];
    video: any[];
    document: any[];
  }

  export interface EmailMsg {
    subject: string;
    body: string;
  }

  export interface Contact {
    from: string;
    to: To[];
    cc: any[];
  }

  export interface To {
    emailAddress: EmailAddress;
  }

  export interface EmailAddress {
    name: string;
    address: string;
  }
}
export default INewConvertions;
