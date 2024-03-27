import { model, Schema } from "mongoose";

export interface ChatDocument extends Document {
  content: String;
  group?: String;
  next?: String;
  identifier:String;
}
const prechatSchema = new Schema<ChatDocument>(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    next: {
      type: String,
      trim: true,
      default:null
    },
    group: {
      type: String,
    },
    identifier:{
        type:String,
        required:true,
        unique:true
    }
  },
  { timestamps: true }
);

module.exports = model<ChatDocument>("Chat", prechatSchema);
