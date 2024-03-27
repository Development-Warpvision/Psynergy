import mongoose, { Document, model, Schema, Types } from "mongoose";

export interface TeamMessageDocument extends Document {
  cmpID: String;
  from: Types.ObjectId;
  to: Types.ObjectId[];
  message: String;
  convertionId: String;
}
const teamMessageSchema = new mongoose.Schema(
  {
    cmpID: {
      type: String,
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Access_contorl_Model",
      required: true,
    },
    to: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Access_contorl_Model",
        required: true,
      },
    ],
    message: {
      type: String,
      required: true,
    },
    convertionId: {
      type: String,
      ref: "TeamConvertions",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const TeamMessages = mongoose.model("TeamMessages", teamMessageSchema);
export { TeamMessages };
