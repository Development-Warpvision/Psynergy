import mongoose, { Document, Schema, model, Types } from "mongoose";

// WebService document interface
export interface ServiceDocument extends Document {
  serviceName: string;
  accessToken: {
    value: string;
    expiresAt: Date;
  };
  cmpId: Types.ObjectId;
  authName: string;
  subscriptionId: string;
  sessionId: string;
  clintState: string;
}

// WebService schema
const ServiceSchema = new Schema<ServiceDocument>(
  {
    serviceName: {
      type: String,
      required: true,
    },
    accessToken: {
      value: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Date,
        required: true,
      },
    },
    cmpId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    authName: {
      type: String,
      required: true,
    },
    subscriptionId: {
      type: String,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    clintState: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// WebService model
const Service = model<ServiceDocument>("Service", ServiceSchema);

export { Service };
