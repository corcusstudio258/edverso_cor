// models/Student.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type Gender = "Male" | "Female" | "Other";
export type RegistrationStatus = "pending" | "completed" | "cancelled";

export interface TopicProgress {
  topic: string;
  currentPage: number;
  pagesRead: number[];
  pageStartTimes: Record<number, Date>;
  completed: boolean; // true when all pages are read
  assessmentDone: boolean; // true when assessment is completed
  assessmentScore?: number;
  grade?: string;
  completedAt?: Date; // when topic is fully completed (pages + assessment)
  certificateIssued?: boolean;
}

export interface IStudent extends Document {
  _id: Types.ObjectId;

  // Personal Info
  fullName: string;
  gender: Gender;
  parentName?: string;
  contactNumber: string;
  email: string;
  passwordHash: string;

  // Academic Info
  universityName: string;
  collegeName: string;
  degree: string;
  department: string;
  rollNumber: string;
  classSemester: string;

  // Emergency Contact
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  emergencyRelation?: string;

  // Internship Info
  organizationName?: string;
  organizationRegNo?: string;
  organizationAddress?: string;
  organizationContact?: string;
  internshipStart?: Date | null;
  internshipEnd?: Date | null;
  durationHours?: number;

  // Payment & uploads
  registrationStatus: RegistrationStatus;
  hasPaid: boolean;
  payment?: {
    orderId?: string;
    paymentId?: string;
    signature?: string;
    amount?: number;
    status?: "pending" | "paid" | "failed";
    method?: string;
  };
  offerLetterUrl?: string;

  // System Fields
  attendance: number;

  // Course & Topic Progress
  internshipTopic?: string;
  topicProgress: TopicProgress[];

  // metadata
  createdAt: Date;
  updatedAt: Date;
}

const TopicProgressSchema = new Schema<TopicProgress>(
  {
    topic: { type: String, required: true },
    currentPage: { type: Number, default: 1 },
    pagesRead: { type: [Number], default: [] },
    pageStartTimes: { type: Map, of: Date, default: {} },
    completed: { type: Boolean, default: false }, // Module completion (all pages read)
    assessmentDone: { type: Boolean, default: false }, // Assessment completion
    assessmentScore: { type: Number },
    grade: { type: String },
    completedAt: { type: Date }, // When both module and assessment are done
    certificateIssued: { type: Boolean, default: false },
  },
  { _id: false }
);

const StudentSchema = new Schema<IStudent>(
  {
    // Personal Info
    fullName: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    parentName: { type: String, required: false },
    contactNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },

    // Academic Info
    universityName: { type: String, required: true },
    degree: { type: String, required: true },
    collegeName: { type: String, required: true },
    department: { type: String, required: true },
    rollNumber: { type: String, required: true },
    classSemester: { type: String, required: true },

    // Internship Info
    organizationName: { type: String },
    organizationRegNo: { type: String },
    organizationAddress: { type: String },
    organizationContact: { type: String },
    internshipStart: { type: Date, default: null },
    internshipEnd: { type: Date, default: null },
    durationHours: { type: Number },

    // Emergency Contact
    emergencyContactName: { type: String, required: false },
    emergencyContactNumber: { type: String, required: false },
    emergencyRelation: { type: String, required: false },

    // Payment & uploads
    registrationStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    hasPaid: { type: Boolean, default: false },
    payment: {
      orderId: { type: String },
      paymentId: { type: String },
      signature: { type: String },
      amount: { type: Number },
      method: { type: String , default: "razorpay" },
      status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
    },
    offerLetterUrl: { type: String },

    // System Fields
    attendance: { type: Number, default: 0 },

    // Course Progress
    internshipTopic: { type: String, default: null },
    topicProgress: { type: [TopicProgressSchema], default: [] },
  },
  { timestamps: true }
);

export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);