import { Document, Schema, model } from "mongoose";

// Contact interface
interface Contact {
  emailAddress: string;
  contactNumber: string;
}

// Company document interface
export interface CompanyDocument extends Document {
  name: string;
  address: string;
  owner: string;
  contact: Contact;
}

// Company schema
const companySchema = new Schema<CompanyDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    contact: {
      emailAddress: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

// Company model
const Company = model<CompanyDocument>("Company", companySchema);

export { Company };
