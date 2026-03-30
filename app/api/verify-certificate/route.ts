/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/verify-certificate/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const encodedData = searchParams.get('data');

    if (!encodedData) {
      return NextResponse.json({ error: "No verification data provided" }, { status: 400 });
    }

    // Decode the verification data
    const decodedData = JSON.parse(atob(encodedData));
    const { studentId } = decodedData;

    // Find student and verify certificate
    const student = await Student.findOne({
      rollNumber: studentId
    }).lean();

    if (!student) {
      return NextResponse.json({ 
        valid: false,
        message: "Certificate not found or invalid" 
      });
    }

    // Check if certificate is issued for current topic
    const currentTopicProgress = student.topicProgress?.find(
      (p: any) => p.topic === student.internshipTopic
    );

    // Return verification result
    return NextResponse.json({
      valid: true,
      student: {
        name: student.fullName,
        rollNumber: student.rollNumber,
        college: student.collegeName,
        university: student.universityName,
        internshipTopic: student.internshipTopic,
        grade: currentTopicProgress?.grade,
        issueDate: currentTopicProgress?.completedAt,
        verifiedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("Certificate verification error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}