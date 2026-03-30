/* eslint-disable react/no-unescaped-entities */
// app/course/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getToken } from "@/lib/auth";
import {
  BookOpen,
  Award,
  ChevronRight,
  RefreshCw,
  FileBadge2,
  CheckCircle,
  XCircle,
  Lock,
  Clock,
} from "lucide-react";

const TOPICS = [
  "Healthcare",
  "Financial Literacy",
  "Digital Literacy",
  "Skill Development",
  "Community Development",
  "Politics and Government",
  "Entrepreneurship",
];

// 🔧 Control variable - Set this to true when you want to enable assessments
const IS_ASSESSMENT_LIVE = true;

interface TopicProgress {
  topic: string;
  currentPage: number;
  pagesRead?: number[];
  completed: boolean; // Module completion
  assessmentDone: boolean; // Assessment completion
  grade?: string;
  assessmentScore?: number;
  completedAt?: string;
}

interface Student {
  internshipTopic?: string;
  topicProgress?: TopicProgress[];
  certificateIssued?: boolean;
}

export default function CoursePage() {
  const [student, setStudent] = useState<Student>({});
  const [loading, setLoading] = useState(true);
  const [selectingTopic, setSelectingTopic] = useState(false);

  const fetchStudent = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch("/api/students/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.ok && data.student) {
        console.log("Student data:", data.student);
        setStudent(data.student);
      }
    } catch (err) {
      console.error("Error fetching student:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleSelectTopic = async (topic: string) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch("/api/students/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "selectTopic",
          topic,
        }),
      });

      const data = await res.json();
      if (data.ok && data.student) {
        setStudent(data.student);
        setSelectingTopic(false);
      } else {
        console.error("Topic update failed:", data.error);
      }
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  const handleChangeTopic = () => setSelectingTopic(true);

  if (loading)
    return <p className="text-center mt-20 text-lg text-gray-600">Loading...</p>;

  if (!student.internshipTopic || selectingTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
              Choose Your Internship Topic
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select your 60-hour internship topic. You can switch it later if needed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.map((topic, index) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleSelectTopic(topic)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{topic}</h3>
                  <BookOpen className="text-blue-600 w-6 h-6" />
                </div>
                <p className="text-gray-600 text-sm">
                  Dive into {topic.toLowerCase()} and complete your internship journey.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Get current topic progress
  const currentTopicProgress = student.topicProgress?.find(
    (tp) => tp.topic === student.internshipTopic
  );

  const totalPages = 55;
  const currentPage = currentTopicProgress?.currentPage || 1;
  const pagesRead = currentTopicProgress?.pagesRead?.length || 0;
  
  // Calculate progress based on pages read
  const progress = Math.min(Math.round((pagesRead / totalPages) * 100), 100);

  const isModuleCompleted = currentTopicProgress?.completed || false;
  // const isModuleCompleted = true;
  const isAssessmentDone = currentTopicProgress?.assessmentDone || false;
  const assessmentScore = currentTopicProgress?.assessmentScore || 0;
  const isAssessmentPassed = isAssessmentDone && assessmentScore >= 60;
  
  // Certificate is ready when module is completed AND assessment is passed
  const isCertificateReady = isModuleCompleted && isAssessmentPassed;

  console.log("Dashboard state:", {
    isModuleCompleted,
    isAssessmentDone,
    assessmentScore,
    isAssessmentPassed,
    isCertificateReady
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Welcome to Your Internship Dashboard
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            You've selected{" "}
            <span className="font-semibold text-blue-700">
              {student.internshipTopic}
            </span>{" "}
            as your internship topic. Let's continue learning and grow! 🌱
          </p>
          <button
            onClick={handleChangeTopic}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Change Topic
          </button>
        </motion.div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 mb-10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Your Progress
              </h2>
              <p className="text-gray-600">
                Keep up the pace! Every page read brings you closer to your goal.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-3xl font-bold text-blue-700">{progress}%</p>
              <p className="text-gray-500 text-sm">Completed</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
              className="h-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{pagesRead}</p>
              <p className="text-sm text-gray-600">Pages Read</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalPages}</p>
              <p className="text-sm text-gray-600">Total Pages</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {isModuleCompleted ? "Done" : "Ongoing"}
              </p>
              <p className="text-sm text-gray-600">Module Status</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {isAssessmentDone ? (isAssessmentPassed ? "Passed" : "Failed") : "Coming Soon"}
              </p>
              <p className="text-sm text-gray-600">Assessment</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Start Course */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 250 }}
            onClick={() => {
              window.location.href = `/course/${student.internshipTopic}?page=${currentPage >= totalPages ? 1 : currentPage}`;
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 cursor-pointer shadow-lg hover:shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                {isModuleCompleted ? "Review Course" : "Continue Course"}
              </h2>
              <BookOpen className="w-8 h-8" />
            </div>
            <p className="text-blue-100 text-sm mb-4">
              {isModuleCompleted 
                ? "Module completed! You can review materials."
                : `Continue from page ${currentPage} of ${totalPages}.`
              }
            </p>
            <div className="flex justify-center">
              <ChevronRight className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Assessment */}
          <motion.div
            whileHover={{ scale: IS_ASSESSMENT_LIVE && isModuleCompleted ? 1.03 : 1 }}
            transition={{ type: "spring", stiffness: 250 }}
            onClick={() => {
              if (IS_ASSESSMENT_LIVE && isModuleCompleted) {
                window.location.href = `/course/${(student.internshipTopic || '').replace(/\s/g, "")}/assessment`;
              }
            }}
            className={`rounded-2xl p-8 border shadow-md ${
              IS_ASSESSMENT_LIVE && isModuleCompleted
                ? "bg-white border-gray-200 cursor-pointer hover:shadow-lg"
                : "bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {isAssessmentDone ? "Assessment Result" : "Take Assessment"}
              </h2>
              {!IS_ASSESSMENT_LIVE ? (
                <Clock className="w-8 h-8 text-orange-500" />
              ) : !isModuleCompleted ? (
                <Lock className="w-8 h-8 text-gray-400" />
              ) : isAssessmentDone ? (
                isAssessmentPassed ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500" />
                )
              ) : (
                <Award className="w-8 h-8 text-yellow-500" />
              )}
            </div>
            
            {!IS_ASSESSMENT_LIVE ? (
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-orange-800 text-sm font-medium text-center">
                    ⏳ Assessment Coming Soon!
                  </p>
                </div>
                <p className="text-gray-600 text-sm text-center">
                  Assessments will be available soon. Complete your module and stay prepared!
                </p>
                <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700 text-xs text-center">
                    💡 <strong>Tip:</strong> Focus on completing the course material first.
                  </p>
                </div>
              </div>
            ) : !isModuleCompleted ? (
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm font-medium">
                    🔒 Complete the module first to unlock assessment
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  Read all {totalPages} pages to access the assessment.
                </p>
              </div>
            ) : isAssessmentDone ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Score:</span>
                  <span className={`font-bold ${isAssessmentPassed ? "text-green-600" : "text-red-600"}`}>
                    {assessmentScore}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-bold text-blue-600">{currentTopicProgress?.grade}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-bold ${isAssessmentPassed ? "text-green-600" : "text-red-600"}`}>
                    {isAssessmentPassed ? "PASSED" : "FAILED"}
                  </span>
                </div>
                {!isAssessmentPassed && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/course/${(student.internshipTopic || '').replace(/\s/g, "")}/assessment`
                    }}
                    className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Retake Assessment
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm font-medium">
                    ✅ Module completed! Ready for assessment
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  Take the assessment to qualify for your certificate.
                </p>
              </div>
            )}
          </motion.div>

          {/* Certificate */}
          <motion.div
            whileHover={{ scale: isCertificateReady ? 1.03 : 1 }}
            transition={{ type: "spring", stiffness: 250 }}
            onClick={() =>
              isCertificateReady && (window.location.href = `/certificate`)
            }
            className={`rounded-2xl p-8 border shadow-md ${
              isCertificateReady
                ? "bg-white border-gray-200 cursor-pointer hover:shadow-lg"
                : "bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Generate Certificate
              </h2>
              <FileBadge2
                className={`w-8 h-8 ${
                  isCertificateReady ? "text-green-600" : "text-gray-400"
                }`}
              />
            </div>
            
            {isCertificateReady ? (
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm font-medium">
                    🎉 All requirements completed! Generate your certificate.
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  Click to generate and download your internship certificate.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm font-medium">
                    {!isModuleCompleted 
                      ? "Complete the module first"
                      : !isAssessmentDone 
                        ? "Complete assessment first" 
                        : "Pass the assessment to unlock"
                    }
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  {!isModuleCompleted 
                    ? `Read all ${totalPages} pages to continue.`
                    : !isAssessmentDone 
                      ? IS_ASSESSMENT_LIVE 
                        ? "Take and pass the assessment." 
                        : "Assessment will be available soon."
                      : "Retake the assessment and score 60% or higher."
                  }
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Motivational Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-3">Keep Going 🚀</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            "Success is the sum of small efforts, repeated day in and day out."
            Every page you finish brings you closer to your goal.
          </p>
          {!IS_ASSESSMENT_LIVE && (
            <div className="mt-4 p-4 bg-blue-500 bg-opacity-20 rounded-lg">
              <p className="text-blue-100 font-medium">
                📢 <strong>Note:</strong> Assessments will be available soon. Focus on completing your course material!
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}