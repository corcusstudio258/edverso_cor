/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/payments/create-cash-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";

export async function POST(req: NextRequest) {
  try {
    const { studentId, amount } = await req.json();

    // Validate required fields
    if (!studentId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: studentId, amount" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find student
    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Check if student already paid
    if (student.hasPaid) {
      return NextResponse.json(
        { error: "Student has already completed payment" },
        { status: 400 }
      );
    }

    // Check if there's already a pending cash payment
    if (student.payment?.method === "cash" && student.payment?.status === "pending" && !student.payment.paymentId) {
      return NextResponse.json({
        success: true,
        message: "Cash payment request Already Created",
        studentId: student._id,
        payment: student.payment
      });
    }

    const amountInPaise = amount*100
    // Create cash payment record in student model
    student.payment = {
      orderId: `cash_${Date.now()}`,
      amount: amountInPaise,
      status: "pending", // Will be changed to "paid" when admin approves
      method: "cash"
    };

    // Save but don't mark as paid yet
    await student.save();

    return NextResponse.json({
      success: true,
      message: "Cash payment request created. Awaiting admin approval.",
      studentId: student._id,
      payment: student.payment
    });

  } catch (error: any) {
    console.error("Create cash payment error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}