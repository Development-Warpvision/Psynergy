const Message = require("../../models/live_chat_model");
const asyncHandler = require("express-async-handler");
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validator/src/base";
import {
  Result,
  validationResult,
} from "express-validator/src/validation-result";

exports.addPredefinedChat = asyncHandler(
  async (req: Request, res: Response) => {
    const { message, groupname, next, identifier } = req.body;
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await Message.create({ message, groupname, next, identifier });
  }
);
