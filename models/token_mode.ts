import { model, Schema, Document } from "mongoose";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export interface UserDocument extends Document {
    _id: string;
    token: string;

}

const userSchema = new Schema<UserDocument>(
    {
        _id: {
            type: String,
        },
        token: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);



module.exports = model<UserDocument>("Token", userSchema);
