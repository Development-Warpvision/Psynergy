import mongoose, { model, Schema, Document, Types } from "mongoose";
import {
  createDecipheriv,
  createHash,
  randomBytes,
  randomInt,
} from "node:crypto";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export interface UserDocument extends Document {
  username: string;
  emailNotificationsEnabled: boolean;
  online: boolean;
  available: boolean;
  email: string;
  password: string;
  resetPasswordToken?: string;
  chatKey: string;
  chatKeyExpiry: Date;
  resetPasswordExpiry?: Date;
  otpToken?: String;
  otpExpiry?: Date;
  isVerified: boolean;
  role: String[];
  staff: [];
  label: String[];
  assigner: [];
  assignto: [];
  messageAssign: [];
  message: Types.ObjectId[];
  is_pay: boolean;
  cmpId: string;
  facebookToken: String;
  instagramToken: String;
  whatsappToken: String;
  gmailToken: String;
  outlookToken: String;
  facebookIdName: String;
  instagramIdName: String;
  whatsappIdName: String;
  gmailIdName: String;
  outlookIdName: String;
  outlookSubscriptionId: string;
  pinChat: [];

  comparePassword(password: string): boolean;
  generateToken(): string;
  getResetPasswordToken(): Promise<string>;
  getOtp(): Promise<string>;
  compareOtp(enteredOtp: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    cmpId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    chatKey: { type: String },
    online: {
      type: Boolean,
      default: true,
    },
    emailNotificationsEnabled: {
      type: Boolean,
      default: true,
    },
    available: {
      type: Boolean,
      default: true,
    },

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
    messageAssign: [
      {
        type: String,
        ref: "MessageSchema",
      },
    ],
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date, default: Date.now },
    chatKeyExpiry: { type: Date },
    otpToken: { type: String },
    otpExpiry: { type: Date, default: Date.now },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MessageSchema",
      },
    ],
    role: {
      type: [String],
      required: true,
      default: ["admin"],
    },
    staff: [
      {
        type: Schema.Types.ObjectId,
        ref: ["Access_contorl_Model", "User"],
      },
    ],
    label: [
      {
        type: String,
        default: [
          "Sales",
          "Support",
          "Inquiry",
          "Payment Done",
          "Same Details",
        ],
      },
    ],
    pinChat: [
      {
        type: Schema.Types.ObjectId,
        ref: "Conversations",
      },
    ],
    facebookToken: {
      type: String,
    },

    instagramToken: {
      type: String,
    },

    whatsappToken: {
      type: String,
    },

    gmailToken: {
      type: String,
    },

    outlookToken: {
      type: String,
    },
    facebookIdName: {
      type: String,
    },

    instagramIdName: {
      type: String,
    },

    whatsappIdName: {
      type: String,
    },

    gmailIdName: {
      type: String,
    },

    outlookIdName: {
      type: String,
    },
    outlookSubscriptionId: {
      type: String,
    },
    is_pay: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (this: UserDocument, next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: String) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = randomBytes(20).toString("hex");

  this.resetPasswordToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpiry = Date.now() + 300000;

  return resetToken;
};

userSchema.methods.getOtp = async function () {
  const otpToken = randomInt(1000, 9999).toString();

  this.otpToken = await bcrypt.hash(otpToken, 12);
  this.otpExpiry = Date.now() + 15 * 60 * 1000;

  return otpToken;
};

userSchema.methods.compareOtp = async function (enteredOtp: String) {
  return await bcrypt.compare(enteredOtp, this.otpToken);
};

const User = mongoose.model("User", userSchema);

export { User };
