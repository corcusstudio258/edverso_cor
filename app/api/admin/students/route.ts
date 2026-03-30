/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/admin/students/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await dbConnect();

    // 🔐 Get Authorization Header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 🔍 Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    // ✅ Optional: Check if user is admin
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied: Admins only" },
        { status: 403 }
      );
    }

    // 📦 Fetch all students
    const students = await Student.find().select("-passwordHash");

    return NextResponse.json({
      ok: true,
      count: students.length,
      students,
    });
  } catch (err: any) {
    console.error("admin/students route error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

// 🗑️ DELETE endpoint to remove students with pending payment status
export async function DELETE(req: Request) {
  try {
    await dbConnect();

    // 🔐 Get Authorization Header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 🔍 Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    // ✅ Check if user is admin
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied: Admins only" },
        { status: 403 }
      );
    }

    // 🚨 SAFETY CHECK - Add confirmation in body
    const { confirm } = await req.json();
    if (confirm !== "DELETE_PENDING_STUDENTS") {
      return NextResponse.json(
        { 
          error: "Confirmation required. Send { confirm: 'DELETE_PENDING_STUDENTS' } in body",
          warning: "This will permanently delete all students with payment.status: 'pending'"
        },
        { status: 400 }
      );
    }

    // 🔍 First, check how many students will be deleted
    const pendingStudents = await Student.find({ "payment.status": "pending" });
    
    console.warn(`[DELETE PENDING STUDENTS] ${new Date().toISOString()} - 
      Admin ${decoded.email || decoded.id} attempting to delete ${pendingStudents.length} students`);

    // 🗑️ Delete students with payment.status: 'pending'
    const deleteResult = await Student.deleteMany({ 
      "payment.status": "pending" 
    });

    return NextResponse.json({
      ok: true,
      message: "Students with pending payment status deleted successfully",
      deletedCount: deleteResult.deletedCount,
      details: `Deleted ${deleteResult.deletedCount} student(s) with payment status: pending`,
      timestamp: new Date().toISOString(),
      admin: decoded.email || decoded.id
    });
  } catch (err: any) {
    console.error("DELETE /api/admin/students error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}