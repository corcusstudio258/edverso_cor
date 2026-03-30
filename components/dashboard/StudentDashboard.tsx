// app/dashboard/StudentDashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { decodeToken } from "@/lib/auth";
import { api } from "@/lib/api";

interface StudentData {
  id: string;
  // Personal Info
  fullName: string;
  gender: string;
  parentName: string;
  contactNumber: string;
  email: string;
  passwordHash: string;

  // Academic Info
  universityName: string;
  degree: string;
  collegeName: string;
  department: string;
  rollNumber: string;
  classSemester: string;

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyRelation: string;

  // Internship Info
  organizationName: string;
  organizationRegNo: string;
  organizationAddress: string;
  organizationContact: string;
  internshipStart: string;
  internshipEnd: string;
  durationHours: number;

  // Registration Status
  registrationStatus: string;
  hasPaid: boolean;
  attendance: number;
  assessmentScore: number;
}


export default function StudentDashboard() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

        setStudent(res.data.student);
      } catch (error) {
        console.error("Dashboard error:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [router]);

  const handlePrintConsent = () => {
    if (!student) return;

    const consentWindow = window.open("", "_blank");
    if (consentWindow) {

      consentWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Internship Consent Form - ${student.fullName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 40px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #000;
              padding-bottom: 20px;
            }
            .organization {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .form-title {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              font-weight: bold;
              font-size: 16px;
              margin-bottom: 10px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 5px;
            }
            .field {
              margin-bottom: 8px;
            }
            .field-label {
              display: inline-block;
              width: 250px;
              font-weight: bold;
            }
            .field-value {
              display: inline-block;
              border-bottom: 1px solid #333;
              min-width: 300px;
              padding: 0 10px;
            }
            .declaration {
              margin-top: 30px;
            }
            .declaration-item {
              margin-bottom: 8px;
              text-align: justify;
            }
            .signature-section {
              margin-top: 50px;
            }
            .signature-line {
              border-top: 1px solid #333;
              width: 300px;
              margin-top: 40px;
            }
            .office-use {
              margin-top: 50px;
              border-top: 2px solid #000;
              padding-top: 20px;
            }
            .print-btn {
              display: none;
            }
            .pt-10{
              padding-top: 60px;
              }
            @media print {
              body { margin: 20px; }
              .print-btn { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="organization">${student.universityName}</div>
            <div class="form-title">Internship Consent and Information Form</div>
            <div>To be filled by students and submitted to their concerned departments :</div>
          </div>

          <div class="section">
            <div class="field">
              <span class="field-label">College Name:</span>
              <span class="field-value">${student.collegeName}</span>
            </div>
            <div class="field">
              <span class="field-label">Degree:</span>
              <span class="field-value">${student.degree}</span>
            </div>
            <div class="field">
              <span class="field-label">Department:</span>
              <span class="field-value">${student.department}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">1. Student Personal Information</div>
            <div class="field">
              <span class="field-label">Name:</span>
              <span class="field-value">${student.fullName}</span>
            </div>
            <div class="field">
              <span class="field-label">Gender:</span>
              <span class="field-value">${student.gender}</span>
            </div>
            <div class="field">
              <span class="field-label">Parent/Guardian Name:</span>
              <span class="field-value">${student.parentName}</span>
            </div>
            <div class="field">
              <span class="field-label">University Roll No. :</span>
              <span class="field-value">${student.rollNumber}</span>
            </div>
            <div class="field">
              <span class="field-label">Class / Semester:</span>
              <span class="field-value">${student.classSemester}</span>
            </div>
            <div class="field">
              <span class="field-label">Contact Number:</span>
              <span class="field-value">${student.contactNumber}</span>
            </div>
            <div class="field">
              <span class="field-label">Email ID:</span>
              <span class="field-value">${student.email}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">2. Internship Details</div>
            <div class="field">
              <span class="field-label">Name of Organization/Firm:</span>
              <span class="field-value">${student.organizationName}</span>
            </div>
            <div class="field">
              <span class="field-label"> Organization Registration No:</span>
              <span class="field-value">456</span>
            </div>
            <div class="field">
              <span class="field-label">Organization Address:</span>
              <span class="field-value">${student.organizationAddress}</span>
            </div>
            <div class="field">
              <span class="field-label">Organization Contact Number:</span>
              <span class="field-value">${student.organizationContact}</span>
            </div>
            <div class="field">
              <span class="field-label">Internship Start Date:</span>
              <span class="field-value">${student.internshipStart}</span>
            </div>
            <div class="field">
              <span class="field-label">Internship End Date:</span>
              <span class="field-value">${student.internshipEnd}</span>
            </div>
            <div class="field">
              <span class="field-label">Total Duration (in hours):</span>
              <span class="field-value">60 Hours</span>
            </div>
          </div>

          <div class="section pt-10">
            <div class="section-title">3. Emergency Contact Details</div>
            <div class="field">
              <span class="field-label">Name:</span>
              <span class="field-value">${student.emergencyContactName || ""}</span>
            </div>
            <div class="field">
              <span class="field-label">Contact Number:</span>
              <span class="field-value">${student.emergencyContactNumber || ""}</span>
            </div>
            <div class="field">
              <span class="field-label">Relation:</span>
              <span class="field-value">${student.emergencyRelation || ""}</span>
            </div>
          </div>

          <div class="section declaration">
            <div class="section-title">4. Student Declaration</div>
            <div class="declaration-item">
              I hereby declare that —
            </div>
            <div class="declaration-item">
              1. The above information provided by me is true to the best of my knowledge.
            </div>
            <div class="declaration-item">
              2. I will keep my department/college informed and follow all rules and regulations of the
              organization during the internship.
            </div>
            <div class="declaration-item">
              3. I understand that internship is part of my academic curriculum and I will complete it on
              time and submit the report.
            </div>
            <div class="declaration-item">
              4. In case of any incident/accident during the internship, I will not hold the
              college/department responsible.
            </div>
            
            <div class="signature-section">
              <div class="field">
                <span class="field-label">Student Signature:</span>
                <span class="field-value"></span>
              </div>
              <div class="field">
                <span class="field-label">Date:</span>
                <span class="field-value"></span>
              </div>
            </div>
          </div>

          <div class="office-use">
            <div class="section-title">5. Department Approval (For Office Use Only)</div>
            <div class="field">
              <span class="field-label">Head of Department/Principal/NEP Coordinator Signature & Seal:</span>
              <span class="field-value"></span>
            </div>
            <div class="field">
              <span class="field-label">Approval Date:</span>
              <span class="field-value"></span>
            </div>
            </div>

          <button class="print-btn" onclick="window.print()">Print Consent Form</button>
          
          <script>
            setTimeout(() => {
              window.print();
              setTimeout(() => {
                window.close();
              }, 1000);
            }, 500);
          </script>
        </body>
        </html>
      `);

      consentWindow.document.close();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load student data.</p>
          <Link href="/login" className="text-blue-600 hover:text-blue-700">
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section with Print Consent Button */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {student.fullName}! 👋
              </h1>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Your Registration number is , {student.organizationRegNo}! 
              </h1>
              <p className="text-gray-600">
                Track your internship progress and access your learning
                materials.
              </p>
            </div>
            <button
              onClick={handlePrintConsent}
              className="mt-4 lg:mt-0 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>🖨️</span>
              <span>Print Consent Form</span>
            </button>
          </div>

          {/* Important Notice */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-blue-500 text-lg">📋</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Important: Print Your Consent Form
                </h3>
                <p className="text-sm text-blue-600 mt-1">
                  Please print and submit the consent form to your
                  college/department as soon as possible. This is required for
                  internship registration.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Rest of the dashboard content remains the same */}
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Attendance"
            value={`${student.attendance}%`}
            description="Current attendance rate"
            icon="📊"
            color="blue"
          />
          <StatCard
            title="Assessment Score"
            value={`0%`}
            description="Overall performance"
            icon="🎯"
            color="green"
          />
          <StatCard
            title="Days Completed"
            value="0/30"
            description="Internship progress"
            icon="📅"
            color="purple"
          />
          <StatCard
            title="Certificate"
            value= "Ready"
            description="Completion status"
            icon="🏆"
            color="green"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-bold text-gray-900">
                  Quick Actions
                </h2>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ActionCard
                    title="Continue Learning"
                    description="Access your course materials and continue where you left off"
                    icon="📚"
                    href="/course"
                    buttonText="Go to Course"
                  />
                  <ActionCard
                    title="View Progress"
                    description="Check your attendance and assessment progress"
                    icon="📈"
                    href="/profile"
                    buttonText="View Profile"
                  />
                  <ActionCard
                    title="Download Certificate"
                    description="Get your internship completion certificate"
                    icon="🏆"
                    href="/certificate"
                    buttonText="Get Certificate"
                  />
                  <ActionCard
                    title="Support Center"
                    description="Need help? Contact our support team"
                    icon="💬"
                    href="/contact"
                    buttonText="Get Help"
                  />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card mt-6">
              <div className="card-header">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Activity
                </h2>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <ActivityItem
                    title="New Assignment Available"
                    description="Database Design Project"
                    time="1 day ago"
                    type="assignment"
                  />
                  <ActivityItem
                    title="Attendance Updated"
                    description="Your attendance has been recorded"
                    time="2 days ago"
                    type="attendance"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Student Info Card */}
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">
                  Student Information
                </h3>
              </div>
              <div className="card-body space-y-3">
                <InfoItem label="Roll Number" value={student.rollNumber} />
                <InfoItem label="College" value={student.collegeName} />
                <InfoItem label="Department" value={student.department} />
                <InfoItem label="Email" value={student.email} />
                <InfoItem label="Status" value="Active" status="success" />
              </div>
            </div>

            {/* Progress Card */}
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">
                  Internship Progress
                </h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <ProgressItem label="Registration" completed={true} />
                  <ProgressItem label="Payment" completed={student.hasPaid} />
                  <ProgressItem
                    label="Course Progress"
                    completed={false}
                    progress={50}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: string;
  color: "blue" | "green" | "purple" | "yellow" | "red";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  color,
}) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}
          >
            <span className="text-xl">{icon}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Action Card Component
interface ActionCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  buttonText: string;
  disabled?: boolean;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  href,
  buttonText,
  disabled,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors duration-200">
      <div className="flex items-start space-x-3">
        <div className="text-2xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <Link
            href={href}
            className={`btn ${
              disabled
                ? "btn-secondary opacity-50 cursor-not-allowed"
                : "btn-primary"
            } text-sm py-2 px-4`}
            onClick={(e) => disabled && e.preventDefault()}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

// Activity Item Component
interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  type: "completed" | "assignment" | "attendance";
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  description,
  time,
  type,
}) => {
  const getIcon = () => {
    switch (type) {
      case "completed":
        return "✅";
      case "assignment":
        return "📝";
      case "attendance":
        return "📊";
      default:
        return "🔔";
    }
  };

  return (
    <div className="flex items-start space-x-3">
      <div className="text-lg flex-shrink-0 mt-0.5">{getIcon()}</div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
};

// Info Item Component
interface InfoItemProps {
  label: string;
  value: string;
  status?: "success" | "warning" | "error";
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50";
      case "warning":
        return "text-yellow-600 bg-yellow-50";
      case "error":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}:</span>
      <span
        className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor()}`}
      >
        {value}
      </span>
    </div>
  );
};

// Progress Item Component
interface ProgressItemProps {
  label: string;
  completed: boolean;
  progress?: number;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  label,
  completed,
  progress,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center space-x-2">
        {progress !== undefined ? (
          <>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-8">{progress}%</span>
          </>
        ) : (
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              completed
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {completed ? "✓" : "..."}
          </div>
        )}
      </div>
    </div>
  );
};
