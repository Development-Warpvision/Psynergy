import mongoose, { model, Schema, Document } from "mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export interface AccessControlDocument extends Document {
  username: string;
  email: String;
  password: string;
  role: String[];
  cmpId: String;
  assigner: [];
  assignto: [];
  message: [];
  messageAssign: [];
  createdby: Schema.Types.ObjectId;
  passwordRequest: boolean;
  loginStatus: boolean;
  activityType: String; // e.g., 'Assigned'
  ticketAssigned: boolean;
  comparePassword(enteredPassword: String): Promise<boolean>;
  generateToken(): string;
}
const access_control_Schema = new Schema<AccessControlDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  loginStatus: {
    type: Boolean,
    default: false,
  },

  cmpId: {
    type: String,
    required: true,
  },
  activityType: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
  role: {
    type: [String],
    required: [true, "Please enter role"],
    minlength: 5,
  },
  ticketAssigned: { type: Boolean },

  assigner: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  assignto: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  message: [
    {
      type: String,
      ref: "MessageSchema",
    },
  ],
  messageAssign: [
    {
      type: String,
      ref: "MessageSchema",
    },
  ],
  createdby: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  passwordRequest: {
    type: Boolean,
    default: false,
  },
});

access_control_Schema.pre(
  "save",
  async function (this: AccessControlDocument, next) {
    ``;
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  },
);
access_control_Schema.methods.comparePassword = async function (
  enteredPassword: String,
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

access_control_Schema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const AccessContorlModel = mongoose.model(
  "Access_contorl_Model",
  access_control_Schema,
);

export { AccessContorlModel };
