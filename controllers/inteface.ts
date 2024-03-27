import { Request, Response } from "express";

export interface IUserRequest extends Request {
  user: {
    _id: String;
    email: String;
    cmpId: string;
  };
  file: {
    originalname: string;
    path: any;
  };
}

export interface IMessageRequest extends Request {
  params: {
    chatId: string;
  };
  file: {
    filename: string;
  };
  user: {
    _id: number;
  };
}
