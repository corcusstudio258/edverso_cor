/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/payments/verify/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";

const RZP_KEY_SECRET = (() => {
  const secret = process.env.RZP_KEY_SECRET;
  if (!secret) throw new Error("RZP_KEY_SECRET missing");
  return secret;
})();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    if (!studentId || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    // Verify signature: HMAC_SHA256(order_id + "|" + payment_id, key_secret)
    const generated = crypto
      .createHmac("sha256", RZP_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await dbConnect();

    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Warn if orderId mismatch (still allow)
    if (!student.payment || student.payment.orderId !== razorpay_order_id) {
      console.warn("Order id mismatch for student", studentId);
    }

    // Calculate internship start (now) and end (+30 days)
    const internshipStart = new Date();
    const internshipEnd = new Date(internshipStart.getTime() + 10 * 24 * 60 * 60 * 1000);

    // Update payment and internship info
    const payment = student.payment ?? (student.payment = {});
    payment.paymentId = razorpay_payment_id;
    payment.signature = razorpay_signature;
    payment.status = "paid";

    student.hasPaid = true;
    student.registrationStatus = "completed";
    student.internshipStart = internshipStart;
    student.internshipEnd = internshipEnd;

    await student.save();

    return NextResponse.json({
      ok: true,
      message: "Payment verified and registration completed",
      internshipStart: internshipStart.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      internshipEnd: internshipEnd.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
  } catch (err: any) {
    console.error("verify payment error", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}