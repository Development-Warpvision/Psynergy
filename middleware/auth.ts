const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import { IUserRequest } from "../controllers/inteface";

exports.isAuthenticated = (SchemaModel: any) => {
  return async (req: IUserRequest, res: Response, next: any) => {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ errors: [{ message: "Please Login to Access" }] });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData);
    let userReq = await SchemaModel.findById(decodedData.id);
    if (userReq !== null) {
      console.log(userReq);

      req.user = await userReq;
    }

    // if (req.user != null) {
    // return res
    //   .status(400)
    //   .json({ errors: [{ message: "Need Previlage access" }] });
    // }
    next();
  };
};

exports.hasPermissionRole = (role: Array<string>, SchemaModel: any) => {
  return async (req: IUserRequest, res: Response, next: any) => {
    const user = await SchemaModel.findById(req.user._id).select("role");
    if (user !== null) {
      const isTrue = (): boolean => {
        for (let i: number = 0; i < role.length; i++) {
          for (let index: number = 0; index < user.role.length; index++) {
            // //console.log(role[i]);
            if (role[i] === user.role[index]) {
              return true;
            }
          }
        }
        return false;
      };

      if (!isTrue()) {
        return res.status(401).json({
          errors: [{ message: "You didn't have required permission" }],
        });
      }
    }
    next();
  };
};
