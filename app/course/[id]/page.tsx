/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams, useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { getToken } from "@/lib/auth";
import { ChevronRight, ChevronLeft, Clock, BookOpen, CheckCircle } from "lucide-react";

interface TopicProgress {
  topic: string;
  currentPage: number;
  pagesRead: number[];
  pageStartTimes: { [pageNumber: number]: string };
  completed: boolean;
}

interface Student {
  internshipTopic?: string;
  currentTopicProgress?: TopicProgress;
  completedModules: number[];
  moduleGrades: Record<string, any>;
  assessmentCompleted?: boolean;
  certificateGenerated?: boolean;
}

const TOPIC_PAGES: Record<string, number> = {
  Healthcare: 55,
  "Financial Literacy": 55,
  "Digital Literacy": 55,
  "Skill Development": 55,
  "Community Development": 55,
  "Politics and Government": 55,
  Entrepreneurship: 55,
};

// Wrap the main component in Suspense
export default function CoursePage() {
  return (
    <Suspense fallback={<div>Loading course...</div>}>
      <CoursePageContent />
    </Suspense>
  );
}

function CoursePageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  // Handle params correctly for Next.js 16
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const topic = id ? decodeURIComponent(id) : "";
  const totalPages = TOPIC_PAGES[topic] || 50;

  const pageFromQuery = parseInt(searchParams.get("page") || "") || null;

  const [student, setStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState<number>(0);
  const [pagesRead, setPagesRead] = useState<number[]>([]);

  // Fetch student data once on mount
  useEffect(() => {
    const fetchStudent = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const res = await fetch("/api/students/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        
        if (data.ok && data.student) {
          setStudent(data.student);
          
          const topicProgress = data.student.currentTopicProgress;
          const savedPagesRead = topicProgress?.pagesRead || [];
          setPagesRead(savedPagesRead);

          // Determine starting page
          let startingPage = 1;
          if (pageFromQuery && pageFromQuery > 0 && pageFromQuery <= totalPages) {
            startingPage = pageFromQuery;
          } else if (topicProgress?.currentPage) {
            startingPage = topicProgress.currentPage;
          }

          setCurrentPage(startingPage);
          checkPageStatus(startingPage, savedPagesRead, topicProgress);
        }
      } catch (err) {
        console.error("Error fetching student:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [topic, pageFromQuery, totalPages]);

  // Check page status and set timer if needed
  const checkPageStatus = (page: number, savedPagesRead: number[], topicProgress?: TopicProgress) => {
    const isPageRead = savedPagesRead.includes(page);
    
    if (isPageRead) {
      setTimer(0);
      return;
    }

    const pageStartTime = topicProgress?.pageStartTimes?.[page];
    if (pageStartTime) {
      const timeElapsed = Math.floor((Date.now() - new Date(pageStartTime).getTime()) / 1000);
      if (timeElapsed >= 240) {
        markPageAsRead(page);
      } else {
        setTimer(240 - timeElapsed);
      }
    } else {
      setTimer(240);
      updatePageStartTime(page);
    }
  };

  // Update page start time in backend
  const updatePageStartTime = async (page: number) => {
    const token = getToken();
    if (!token || !student) return;

    try {
      await fetch("/api/students/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "pageStartTime",
          topic,
          page,
          startTime: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Error updating page start time:", err);
    }
  };

  // Mark page as read
  const markPageAsRead = async (page: number) => {
    const token = getToken();
    if (!token || !student) return;

    try {
      const res = await fetch("/api/students/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "markPageRead",
          topic,
          page,
        }),
      });
      
      const data = await res.json();
      if (data.ok && data.student) {
        setStudent(data.student);
        const newPagesRead = data.student.currentTopicProgress?.pagesRead || [];
        setPagesRead(newPagesRead);
        setTimer(0);
      }
    } catch (err) {
      console.error("Error marking page as read:", err);
    }
  };

  const isCurrentPageRead = pagesRead.includes(currentPage);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !isCurrentPageRead) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            markPageAsRead(currentPage);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, currentPage, isCurrentPageRead]);

  // SIMPLE NAVIGATION - FIXED
  const handleNext = () => {
    if(currentPage === totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
    if (currentPage < totalPages && (isCurrentPageRead || timer === 0)) {
      const nextPage = currentPage + 1;
      
      // Update UI immediately
      setCurrentPage(nextPage);
      
      // Update backend without waiting
      updateCurrentPage(nextPage);
      
      // Check status for new page
      checkPageStatus(nextPage, pagesRead, student?.currentTopicProgress);
    }
  };

  const handlePrev = () => {
  if (currentPage > 1) {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
  }
};


  // Update current page in backend - SIMPLIFIED
  const updateCurrentPage = async (newPage: number) => {
    const token = getToken();
    if (!token) return;

    try {
      await fetch("/api/students/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "updateCurrentPage",
          topic,
          currentPage: newPage,
        }),
      });
    } catch (err) {
      console.error("Error updating current page:", err);
    }
  };

  // Calculate progress
  const progress = Math.round(((currentPage) / totalPages) * 100);
  const isCompleted = currentPage > totalPages;
  const canGoNext = isCurrentPageRead || timer === 0;

  if (loading) {
    return <p className="text-center mt-20 text-lg text-gray-600">Loading...</p>;
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-12"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Course Completed!
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Congratulations! You've successfully completed all {totalPages} pages of the {topic} course.
            </p>
            <button
              onClick={() => window.location.href = `/course`}
              className="ml-4 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-lg"
            >
              Go to Course
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const slideSrc = `/${topic.toLowerCase().replace(/\s+/g, '-')}/slide_${currentPage}.png`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => window.location.href = '/course'}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {topic}
          </h1>
          <p className="text-gray-600 text-lg">
            Page {currentPage} of {totalPages}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress: {progress}%</span>
            <span>{pagesRead.length} / {totalPages} Pages Read</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Page Status Indicator */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-xl px-4 py-2 shadow-md border">
            <div className="flex items-center gap-2">
              {isCurrentPageRead ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">Page Read</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span className="text-blue-600 font-medium">
                    {timer > 0 ? `Reading - ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')} left` : 'Start Reading'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Slide Image */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex justify-center items-center min-h-[500px]">
          <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
            <Image
              src={slideSrc}
              alt={`${topic} - Page ${currentPage}`}
              fill
              className="object-contain rounded-xl"
              unoptimized
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = document.getElementById('fallback-content');
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
            <div className="text-center p-8 hidden" id="fallback-content">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {topic} - Page {currentPage}
              </h2>
              <p className="text-gray-600 text-lg">
                Content for {topic}, page {currentPage} of {totalPages}.
              </p>
            </div>
          </div>
        </div>

        {/* Timer Display */}
        {!isCurrentPageRead && timer > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-center"
          >
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">
                Please read this page carefully. Next page unlocks in:
              </span>
              <span className="text-blue-800 font-bold text-lg">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
               !canGoNext
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {currentPage === totalPages ? "Complete Course" : "Next"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}