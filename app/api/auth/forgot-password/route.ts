/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, phoneNumber, newPassword } = await req.json();

    console.log("🟢 Forgot password request received:", { email, phoneNumber });

    // Validate required fields
    if (!email || !phoneNumber) {
      return NextResponse.json(
        { error: "Email and phone number are required" },
        { status: 400 }
      );
    }

    if (!newPassword) {
      return NextResponse.json(
        { error: "New password is required" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Find student by email and phone number
    const student = await Student.findOne({ 
      email: email.toLowerCase().trim(),
      contactNumber: phoneNumber.trim()
    });

    if (!student) {
      console.log("❌ No student found with matching email and phone number");
      return NextResponse.json(
        { error: "No account found with the provided email and phone number" },
        { status: 404 }
      );
    }

    console.log("✅ Student found:", student.email);

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Update student's password
    student.passwordHash = passwordHash;
    student.updatedAt = new Date();

    await student.save();

    console.log("✅ Password updated successfully for:", student.email);

    return NextResponse.json({
      success: true,
      message: "Password reset successfully. You can now login with your new password."
    });

  } catch (err: any) {
    console.error("🔥 Forgot password error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}