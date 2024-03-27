namespace IComStaff {
  export interface IStaff {
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

export default IComStaff;
