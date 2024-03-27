import { model, Schema } from "mongoose";

export interface ChatDocument extends Document {
  latestMessage: String;
  users: String[];
}
const chatSchema = new Schema<ChatDocument>(
  {
    users: [
      {
        type: String,
        ref: "User",
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

module.exports = model<ChatDocument>("Chat", chatSchema);
