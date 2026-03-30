/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
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

    await dbConnect();
    const admin = await Admin.findOne({ email: body.email.toLowerCase() });
    
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!admin.passwordHash) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if admin is active
    if (!admin.isActive) {
      return NextResponse.json(
        { error: "Admin account is deactivated" },
        { status: 403 }
      );
    }

    const isMatch = await bcrypt.compare(body.password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Build JWT payload
    const payload = {
      sub: admin._id.toString(),
      email: admin.email,
      role: "admin",
      name: admin.fullName,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    const safeAdmin = {
      id: admin._id.toString(),
      fullName: admin.fullName,
      email: admin.email,
      orgName: admin.orgName,
      role: admin.role,
    };

    return NextResponse.json({ ok: true, token, admin: safeAdmin });
  } catch (err: any) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}