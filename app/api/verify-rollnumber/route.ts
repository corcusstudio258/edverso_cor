/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const rollNumber = searchParams.get("rollNumber");
    const phoneNumber = searchParams.get("phoneNumber");
    const certificateId = searchParams.get("certificateId");
    const email = searchParams.get("email");

    if (!rollNumber && !phoneNumber && !certificateId && !email) {
      return NextResponse.json(
        { 
          verified: false,
          error: "Please provide at least one search parameter (rollNumber, phoneNumber, certificateId, or email)" 
        },
        { status: 400 }
      );
    }

    // Build query based on provided parameters
    const query: any = {};
    
    if (rollNumber) {
      query.rollNumber = rollNumber;
    } else if (phoneNumber) {
      query.contactNumber = phoneNumber;
    } else if (email) {
      query.email = email;
    }
    // Note: certificateId might need special handling based on your certificate system
    
    const student = await Student.findOne(query)
      .select("-passwordHash -payment -__v -createdAt -updatedAt")
      .lean();

    if (!student) {
      return NextResponse.json(
        {
          verified: false,
          message: "No student found with the provided details or student is not registered with BALAJEE SEWA SANSTHAN"
        },
        { status: 404 }
      );
    }

    // Date formatting utility
    const formatDate = (date: Date | string | null | undefined): string | null => {
      if (!date) return null;
      const parsed = typeof date === "string" ? new Date(date) : date;
      if (Number.isNaN(parsed.getTime())) return null;
      return parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    // Check if any certificate is issued
    const issuedCertificates = student.topicProgress?.filter(
      (topic: any) => topic.grade != null
    ) || [];

    if (issuedCertificates.length === 0) {
      return NextResponse.json(
        {
          verified: false,
          message: "Student found but no certificate has been issued yet",
          student: {
            name: student.fullName,
            rollNumber: student.rollNumber,
            collegeName: student.collegeName,
            universityName: student.universityName,
            status: "Registered but certificate not issued"
          }
        },
        { status: 200 }
      );
    }

    // Format response data
    const formattedCertificates = issuedCertificates.map((cert: any) => ({
      topic: cert.topic,
      grade: cert.grade || "Not Graded",
      assessmentScore: cert.assessmentScore || 0,
      completedAt: formatDate(cert.completedAt),
      certificateIssued: cert.certificateIssued
    }));

    const responseData = {
      verified: true,
      organization: "BALAJEE SEWA SANSTHAN",
      student: {
        name: student.fullName,
        rollNumber: student.rollNumber,
        collegeName: student.collegeName,
        universityName: student.universityName,
        degree: student.degree,
        department: student.department,
        classSemester: student.classSemester,
        email: student.email,
        contactNumber: student.contactNumber,
        internshipStart: formatDate(student.internshipStart),
        internshipEnd: formatDate(student.internshipEnd),
        durationHours: student.durationHours || 0,
        registrationStatus: student.registrationStatus,
        hasPaid: student.hasPaid,
        certificates: formattedCertificates
      },
      verificationDate: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    return NextResponse.json(responseData);

  } catch (err: any) {
    console.error("Certificate verification error:", err);
    return NextResponse.json(
      { 
        verified: false,
        error: err.message || "Server error during verification" 
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { rollNumber, phoneNumber, certificateId, email } = body;

    if (!rollNumber && !phoneNumber && !certificateId && !email) {
      return NextResponse.json(
        { 
          verified: false,
          error: "Please provide at least one search parameter (rollNumber, phoneNumber, certificateId, or email)" 
        },
        { status: 400 }
      );
    }

    // Build query based on provided parameters
    const query: any = {};
    
    if (rollNumber) {
      query.rollNumber = rollNumber;
    } else if (phoneNumber) {
      query.contactNumber = phoneNumber;
    } else if (email) {
      query.email = email;
    }
    
    // Filter by organization
    query.organizationRegNo = "BALAJEE SEWA SANSTHAN";
    
    const student = await Student.findOne(query)
      .select("-passwordHash -payment -__v -createdAt -updatedAt")
      .lean();

    if (!student) {
      return NextResponse.json(
        {
          verified: false,
          message: "No student found with the provided details"
        },
        { status: 404 }
      );
    }

    // Check for issued certificates
    const issuedCertificates = student.topicProgress?.filter(
      (topic: any) => topic.certificateIssued === true
    ) || [];

    if (issuedCertificates.length === 0) {
      return NextResponse.json(
        {
          verified: false,
          message: "Certificate not issued for this student",
          studentDetails: {
            name: student.fullName,
            rollNumber: student.rollNumber,
            collegeName: student.collegeName
          }
        },
        { status: 200 }
      );
    }

    // Format dates
    const formatDate = (date: Date | string | null | undefined): string | null => {
      if (!date) return null;
      const parsed = typeof date === "string" ? new Date(date) : date;
      if (Number.isNaN(parsed.getTime())) return null;
      return parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const responseData = {
      verified: true,
      message: "Certificate verified successfully",
      organization: "BALAJEE SEWA SANSTHAN",
      student: {
        name: student.fullName,
        universityRollNumber: student.rollNumber,
        collegeName: student.collegeName,
        universityName: student.universityName,
        registeredWith: "BALAJEE SEWA SANSTHAN",
        certificates: issuedCertificates.map((cert: any) => ({
          topic: cert.topic,
          grade: cert.grade || "Not Graded",
          issueDate: formatDate(cert.completedAt),
          status: "Issued"
        }))
      }
    };

    return NextResponse.json(responseData);

  } catch (err: any) {
    console.error("Certificate verification error:", err);
    return NextResponse.json(
      { 
        verified: false,
        error: "Verification failed. Please try again." 
      },
      { status: 500 }
    );
  }
}