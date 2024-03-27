import { model, Schema } from "mongoose";
  
const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        chatId: {
            type: Schema.Types.ObjectId,
            ref: "Chat"
        },
        content: {
            type: String,
            trim: true,
            required: true,
        },
        img:
        {
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true }
);

module.exports = model("Message", messageSchema);