/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/payments/cash-payments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";
import { validateToken, getUserRole } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Admin authentication
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !validateToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = getUserRole(token);
    if (role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    await dbConnect();

    // Find students with cash payments (both pending and approved)
    const cashPayments = await Student.find({
      "payment.method": "cash"
    })
    .select("fullName email rollNumber organizationRegNo contactNumber payment createdAt")
    .sort({ createdAt: -1 });

    const formattedPayments = cashPayments.map(student => ({
      studentId: student._id,
      studentName: student.fullName,
      email: student.email,
      rollNumber: student.rollNumber,
      organizationRegNo: student.organizationRegNo,
      contactNumber: student.contactNumber,
      amount: student.payment?.amount,
      orderId: student.payment?.orderId,
      paymentId: student.payment?.paymentId,
      status: student.payment?.status || "pending",
      createdAt: student.createdAt
    }));

    return NextResponse.json({
      success: true,
      payments: formattedPayments
    });

  } catch (error: any) {
    console.error("Get cash payments error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}