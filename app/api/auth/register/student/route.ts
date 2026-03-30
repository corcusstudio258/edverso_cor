/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";
import bcrypt from "bcryptjs";

type Body = {
  fullName: string;
  gender: "Male" | "Female" | "Other";
  parentName: string;
  contactNumber: string;
  email: string;
  password: string;
  universityName: string;
  collegeName: string;
  degree: string;
  department: string;
  rollNumber: string;
  classSemester: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyRelation: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json();

    // Basic validation
    const required: Array<keyof Body> = [
      "fullName",
      "gender",
      "parentName",
      "contactNumber",
      "email",
      "password",
      "universityName",
      "collegeName",
      "degree",
      "department",
      "rollNumber",
      "classSemester",
      "emergencyContactName",
      "emergencyContactNumber",
      "emergencyRelation"
    ];
    for (const key of required) {
      if (!body[key]) {
        return NextResponse.json({ error: `${key} is required` }, { status: 400 });
      }
    }

    await dbConnect();

    // Check if email already exists
    const existsEmail = await Student.findOne({ email: body.email });
    if (existsEmail) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Generate unique 6-digit organizationRegNo
    const lastStudent = await Student.findOne({}, {}, { sort: { createdAt: -1 } });
    const nextRegNumber = lastStudent?.organizationRegNo
      ? String(parseInt(lastStudent.organizationRegNo) + 1).padStart(6, "0")
      : "000001";

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(body.password, salt);

    // Organization + Internship Info
    const organizationName = "Balaji Seva Sansathan (BSS)";
    const organizationAddress = "Railly, Pandarak, Patna- 803221";
    const organizationContact = "9341041274";
    const durationHours = 120;

    // Internship start & end (will be updated to actual payment date later)
    const internshipStart = null;
    const internshipEnd = null;

    const student = await Student.create({
      fullName: body.fullName,
      gender: body.gender,
      parentName: body.parentName,
      contactNumber: body.contactNumber,
      email: body.email.toLowerCase(),
      passwordHash,
      universityName: body.universityName,
      collegeName: body.collegeName,
      degree: body.degree,
      department: body.department,
      rollNumber: body.rollNumber,
      classSemester: body.classSemester,
      organizationName,
      organizationRegNo: nextRegNumber,
      organizationAddress,
      organizationContact,
      internshipStart,
      internshipEnd,
      durationHours,
      emergencyContactName: body.emergencyContactName,
      emergencyContactNumber: body.emergencyContactNumber,
      emergencyRelation: body.emergencyRelation,
      registrationStatus: "pending",
      hasPaid: false,
    });

    return NextResponse.json({ ok: true, studentId: student._id.toString(), organizationRegNo: student.organizationRegNo }, { status: 201 });
  } catch (err: any) {
    console.error("register error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
