// app/certificate/page.tsx
"use client";

import CertificateView from "@/components/certificate/CertificateView";
import { api } from "@/lib/api";
import { decodeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface StudentData {
  _id: string;
  fullName: string;
  gender: string;
  rollNumber: string;
  degree: string;
  department: string;
  classSemester: string;
  collegeName: string;
  universityName: string;
  organizationRegNo: string;
  internshipStart: string; // Format: "18 October 2025"
  internshipEnd: string;
  durationHours: number;
  attendance: number;
  internshipTopic: string;
  currentTopicProgress: {
    topic: string;
    completed: boolean;
    assessmentDone: boolean;
    assessmentScore: number;
    grade: string;
    certificateIssued: boolean;
    completedAt: string;
  };
}

// Helper function to parse date string "18 October 2025" to Date object
const parseDateString = (dateStr: string): Date => {
  const months: { [key: string]: number } = {
    "January": 0, "February": 1, "March": 2, "April": 3,
    "May": 4, "June": 5, "July": 6, "August": 7,
    "September": 8, "October": 9, "November": 10, "December": 11
  };
  
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  
  // Fallback to current date if parsing fails
  return new Date();
};

// Helper function to calculate days between dates
const getDaysDifference = (startDate: Date, endDate: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay));
  return diffDays;
};

// Check if 10 days have passed since internship start
const hasTenDaysPassed = (internshipStart: string): boolean => {
  try {
    const startDate = parseDateString(internshipStart);
    const currentDate = new Date();
    
    // Set both dates to start of day for accurate comparison
    startDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    // Check if current date is after start date (should always be true)
    if (currentDate <= startDate) {
      return false;
    }
    
    const daysPassed = getDaysDifference(startDate, currentDate);
    return daysPassed >= 10;
  } catch (error) {
    console.error("Error calculating days passed:", error);
    return false;
  }
};

export default function CertificatePage() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        const token = localStorage.getItem("balaji_token");
        if (!token) {
          router.push("/login");
          return;
        }

        const decoded = decodeToken(token);
        if (!decoded) {
          router.push("/login");
          return;
        }
        
        const res = await api.get("/students/me");
        setStudentData(res.data.student);
      } catch (error) {
        console.error("Dashboard error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: Please Generating Your Certificate! Please login again</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Check if 10 days have passed since internship start
  const tenDaysPassed = hasTenDaysPassed(studentData.internshipStart);
  // const tenDaysPassed = true;

    const meetsOriginalConditions = (): boolean => {
    return  studentData?.currentTopicProgress?.grade != null;
  };

  // Show certificate only if 10 days have passed
  if (tenDaysPassed && meetsOriginalConditions()) {
    // Optional: You can add additional checks here if needed
    //   ? { ...studentData.currentTopicProgress, grade: studentData.currentTopicProgress.grade ?? "A+" }
    //   : { grade: "A+", certificateIssued: true };

    return (
      <CertificateView
        certificateData={{
          student: studentData,
          currentTopicProgress:studentData.currentTopicProgress,
        }}
      />
    );
  }

  // Show "Certificate Not Ready" page if less than 10 days have passed
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200 rounded-3xl p-8 sm:p-12 text-center transition-all hover:shadow-indigo-200">
        {/* 🎓 Certificate Icon / Illustration */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 flex items-center justify-center shadow-lg">
            <span className="text-white text-5xl">⏳</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Certificate Not Yet Available
        </h1>
        
        {/* Days Count Display */}
        <div className="mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full">
            <span className="font-bold mr-2">Day</span>
            <span className="text-xl font-bold">
              {getDaysDifference(parseDateString(studentData.internshipStart), new Date())}
            </span>
            <span className="ml-2">of 10</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 text-lg">
          Your certificate will be available 10 days after your internship start date.
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div 
            className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
            style={{ 
              width: `${Math.min(
                (getDaysDifference(parseDateString(studentData.internshipStart), new Date()) / 10) * 100, 
                100
              )}%` 
            }}
          ></div>
        </div>

        {/* Detailed Information */}
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 sm:p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-800 mb-3">📅 Timeline Information:</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Internship Start:</span>
              <span className="font-medium">{studentData.internshipStart}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Days Completed:</span>
              <span className="font-medium">
                {getDaysDifference(parseDateString(studentData.internshipStart), new Date())} days
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Days Remaining:</span>
              <span className="font-medium">
                {Math.max(0, 10 - getDaysDifference(parseDateString(studentData.internshipStart), new Date()))} days
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Certificate Available:</span>
              <span className="font-medium text-green-600">
                {(() => {
                  const startDate = parseDateString(studentData.internshipStart);
                  startDate.setDate(startDate.getDate() + 10);
                  return startDate.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  });
                })()}
              </span>
            </div>
          </div>
        </div>

        {/* Countdown Timer (Optional) */}
        {getDaysDifference(parseDateString(studentData.internshipStart), new Date()) < 10 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">⏰ Certificate Will Be Available In:</h4>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {10 - getDaysDifference(parseDateString(studentData.internshipStart), new Date())}
                </div>
                <div className="text-sm text-yellow-700">Days</div>
              </div>
            </div>
          </div>
        )}

        {/* Encouraging Message */}
        <p className="text-gray-700 font-medium text-lg mb-6">
          Complete your internship modules while you wait. Your certificate will be automatically generated on the 10th day.
        </p>

        {/* Progress Indicators */}
        {studentData.currentTopicProgress && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className={`p-4 rounded-lg ${studentData.currentTopicProgress.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
              <div className="font-semibold">Module Completion</div>
              <div className="text-2xl font-bold mt-1">
                {studentData.currentTopicProgress.completed ? '✅ Completed' : '📚 In Progress'}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${studentData.currentTopicProgress.assessmentDone ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              <div className="font-semibold">Assessment</div>
              <div className="text-2xl font-bold mt-1">
                {studentData.currentTopicProgress.assessmentDone ? '✅ Done' : '📝 Pending'}
              </div>
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.href = "/dashboard"}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all hover:scale-105"
          >
            Go Back to Dashboard
          </button>
        </div>

        {/* Auto-refresh reminder */}
        <p className="mt-6 text-sm text-gray-500">
          This page will automatically update when your certificate becomes available.
        </p>
      </div>
    </div>
  );
}