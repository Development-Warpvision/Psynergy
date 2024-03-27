import mongoose, { model, Schema, Types } from "mongoose";

export interface ConversationsDocument extends Document {
  message: Types.ObjectId[];
  users: String[];
  recievingMedium: String;
  cmpId: String;
  userSpecificId: String;
  usersDetail: String[];
  labels: String[];
  isRead: boolean;
}

const conversationsSchema = new Schema<ConversationsDocument>(
  {
    users: [
      {
        type: String,
        ref: "User",
      },
    ],
    message: [
      {
        type: Schema.Types.ObjectId,
        ref: "MessageSchema",
      },
    ],
    recievingMedium: {
      type: String,
      required: true,
    },
    cmpId: {
      type: String,
    },
    userSpecificId: {
      type: String,
      unique: true,
    },
    labels: {
      type: [String],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Conversations = mongoose.model<ConversationsDocument>(
  "Conversations",
  conversationsSchema,
);

export { Conversations };
