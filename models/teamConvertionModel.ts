import mongoose, { Document, model, Schema, Types } from "mongoose";

export interface TeamConvertionDocument extends Document {
  convertionId: String;
  cmpID: String;
  messages: Types.ObjectId[];
  contributors: {
    accesscontroluser: Types.ObjectId[];
    user: Types.ObjectId[];
  };
}
const teamConvertionSchema = new mongoose.Schema(
  {
    convertionId: {
      type: String,
      required: true,
      unique: true,
    },
    cmpID: { type: String, required: true },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMessages",
        required: true,
      },
    ],
    contributors: {
      accesscontroluser: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Access_contorl_Model",
        },
      ],

      user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    // Add more contributor types if needed
  },
  {
    timestamps: true,
  },
);

const TeamConvertions = mongoose.model("TeamConvertions", teamConvertionSchema);
export { TeamConvertions };
