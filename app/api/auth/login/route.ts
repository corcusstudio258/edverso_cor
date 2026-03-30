/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("JWT_SECRET not defined in .env.local");

type Body = { email: string; password: string };

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json();
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    console.log("Connecting to MongoDB...");
await dbConnect();
console.log("Connected successfully");

    const student = await Student.findOne({ email: body.email.toLowerCase() });
    if (!student) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!student.passwordHash) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(body.password, student.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🚨 Block login if not paid
    if (!student.hasPaid) {
      return NextResponse.json(
        {
          error:
            "Payment pending. Please complete registration payment before login.",
          student: { id: student._id.toString() }, // 👈 send studentId
        },
        { status: 403 }
      );
    }

    // 🚨 Block login if registration incomplete
    if (student.registrationStatus !== "completed") {
      return NextResponse.json(
        { error: "Registration incomplete", student: { id: student._id.toString() } },
        { status: 403 }
      );
    }

    // build JWT payload
    const payload = {
      sub: student._id.toString(),
      name : student.fullName,
      email: student.email,
      role: "student",
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    const safeStudent = {
      id: student._id.toString(),
      fullName: student.fullName,
      email: student.email,
      registrationStatus: student.registrationStatus,
      hasPaid: student.hasPaid,
    };

    return NextResponse.json({ ok: true, token, student: safeStudent });
  } catch (err: any) {
    console.error("login error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
