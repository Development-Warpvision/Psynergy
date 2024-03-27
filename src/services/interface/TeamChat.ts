namespace ITeamChat {
  //  get FetchAll user types
  export interface IUserData {
    _id: string;
    username: string;
    email: string;
    role: string[];
    loginStatus: boolean;
    cmpID: string;
  }

  // getrequest for selected convertion

  export interface ISelectedConvertion {
    _id: string;
    convertionId: string;
    cmpID: string;
    messages: Message[];
    contributors: Contributor[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface Message {
    _id: string;
    cmpID: string;
    from: string;
    to: string[];
    message: string;
    convertionId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface Contributor {
    _id: string;
    email: string;
    loginStatus: boolean;
    cmpId: string;
    username: string;
    password: string;
    role: string[];
    assigner: any[];
    assignto: any[];
    message: any[];
    messageAssign: any[];
    createdby: string;
    passwordRequest: boolean;
    __v: number;
  }

  export interface ISelectMessage {
    cmpID: string;
    from: string;
    to: string[];
    message: string;
  }

  export interface IMyConvertionUser {
    // map(arg0: (item: any) => any): unknown;
    contributors: Contributors;
    _id: string;
    convertionId: string;
    cmpID: string;
    messages: String[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface ISelectMyConvertionUser {
    contributors: Contributors;
    _id: string;
    convertionId: string;
    cmpID: string;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface Contributors {
    flatMap(arg0: (contributorType: any[]) => any[]): IMyConvertionUser[];
    accesscontroluser: Accesscontroluser[];
    user: User[];
  }

  export interface Accesscontroluser {
    _id: string;
    email: string;
    loginStatus: boolean;
    username: string;
    role: string[];
    cmpID: string;
  }

  export interface User {
    _id: string;
    username: string;
    loginStatus: boolean;
    email: string;
    role: string[];
    cmpID: string;
  }
}

export default ITeamChat;
