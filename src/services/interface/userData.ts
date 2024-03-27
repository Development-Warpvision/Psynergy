namespace ILogedUser {
  export interface ILogedUserData {
    success: boolean;
    user: User;
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
    message: any[];
    role: string[];
    staff: Staff[];
    label: any[];
    pinChat: any[];
    resetPasswordExpiry: string;
    otpExpiry: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    otpToken: string;
  }

  export interface Staff {
    _id: string;
    email: string;
    loginStatus: boolean;
    cmpId: string;
    username: string;
    role: string[];
    assigner: any[];
    assignto: any[];
    message: any[];
    messageAssign: any[];
    createdby: string;
    passwordRequest: boolean;
    __v: number;
  }
}
export default ILogedUser;
