// models/Admin.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IAdmin extends Document {
  _id: Types.ObjectId;

  // Personal Info
  fullName: string;
  email: string;
  passwordHash: string;

  // Organization Info (optional)
  orgName?: string;
  organizationAddress?: string;
  organizationContact?: string;

  // System Fields
  role: "admin";
  isActive: boolean;

  // metadata
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    // Personal Info
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },

    // Organization Info
    orgName: { type: String },
    organizationAddress: { type: String },
    organizationContact: { type: String },

    // System Fields
    role: { type: String, enum: ["admin"], default: "admin" },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Admin: Model<IAdmin> =
  (mongoose.models.Admin as Model<IAdmin>) || mongoose.model<IAdmin>("Admin", AdminSchema);