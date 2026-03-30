/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-assign-module-variable */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getToken } from "@/lib/auth";
import { modules } from "@/data/module";

interface Student {
  internshipTopic?: string;
  topicProgress?: Array<{
    topic: string;
    completed: boolean;
    assessmentDone: boolean;
    assessmentScore?: number;
    grade?: string;
  }>;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

// Wrap in Suspense
export default function AssessmentPage() {
  return (
    <Suspense fallback={<div>Loading assessment...</div>}>
      <AssessmentPageContent />
    </Suspense>
  );
}

function AssessmentPageContent() {
  const params = useParams();
  const router = useRouter();

  // Handle params correctly for Next.js 16
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const topic = id || "";

  const [student, setStudent] = useState<Student>({})
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [grade, setGrade] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showReview, setShowReview] = useState(false)

  // Find module by topic name
  const module = modules.find((m) => 
    m.title.toLowerCase() === topic?.toLowerCase()
  )
  const questions = module?.assessment?.questions || []

  useEffect(() => {
    const fetchStudent = async () => {
      const token = getToken()
      if (!token) return

      try {
        const res = await fetch("/api/students/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (data.ok && data.student) {
          setStudent({
            internshipTopic: data.student.internshipTopic,
            topicProgress: data.student.topicProgress || [],
          })
        }
      } catch (error) {
        console.error("Error fetching student data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStudent()
  }, [])

  // Check if student has completed the module
  const currentTopicProgress = student.topicProgress?.find(
    (tp) => tp.topic === student.internshipTopic
  )
  // const isModuleCompleted = currentTopicProgress?.completed || false
  const isModuleCompleted = true

  if (loading) return <div className="text-center mt-20">Loading assessment...</div>
  if (!module) return <div className="text-center mt-20">Module not found for topic: {topic}</div>
  if (questions.length === 0) return <div className="text-center mt-20">No assessment available for this module.</div>
  
  // Redirect if module not completed
  if (!isModuleCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="text-4xl">🔒</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              Assessment Locked
            </h1>
            
            <p className="text-gray-600 text-lg mb-6">
              You need to complete the <span className="font-semibold">{student.internshipTopic}</span> module first before taking the assessment.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => router.push("/course")}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
              >
                Back to Dashboard
              </button>
              
              <button
                onClick={() => router.push(`/course/${student.internshipTopic}`)}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
              >
                Continue Learning
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  const handleSelectOption = (qIndex: number, optionIndex: number) => {
    if (submitted) return
    
    const newAnswers = [...answers]
    newAnswers[qIndex] = optionIndex
    setAnswers(newAnswers)
  }

  const calculateGrade = (percent: number) => {
    if (percent >= 90) return "A+"
    if (percent >= 80) return "A"
    if (percent >= 70) return "B+"
    if (percent >= 60) return "B"
    if (percent >= 50) return "C+"
    if (percent >= 33) return "C"
    return "F"
  }

  const handleSubmit = async () => {
    if (answers.length < questions.length) {
      alert(`Please answer all questions. You have ${questions.length - answers.length} unanswered.`)
      return
    }

    const correctCount = questions.reduce((acc: any, q: any, i: any) => {
      const selectedOption = q.options[answers[i]]
      return selectedOption === q.answer ? acc + 1 : acc
    }, 0)
    
    const percent = Math.round((correctCount / questions.length) * 100)
    const g = calculateGrade(percent)

    setScore(percent)
    setGrade(g)
    setSubmitted(true)

    // Update backend with assessment completion
    const token = getToken()
    if (!token) return

    try {
      const res = await fetch("/api/students/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "completeAssessment",
          topic: student.internshipTopic,
          score: percent,
          grade: g,
          passed: percent >= 33,
        }),
      })

      const data = await res.json()
      if (!data.ok) {
        console.error("Failed to update assessment:", data.error)
      }
    } catch (error) {
      console.error("Error updating assessment progress:", error)
    }
  }

  const handleGoBack = () => router.push("/course")
  const handleRetake = () => {
    setAnswers([])
    setSubmitted(false)
    setScore(null)
    setGrade(null)
    setCurrentQuestion(0)
    setShowReview(false)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isPassed = score !== null && score >= 33

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {module.title} - Assessment
          </h1>
          <p className="text-gray-600 mb-4">
            {!submitted 
              ? `Question ${currentQuestion + 1} of ${questions.length}`
              : showReview 
                ? "Review Your Answers"
                : "Assessment Completed"
            }
          </p>
          
          {/* Progress Bar */}
          {!submitted && (
            <div className="w-full bg-gray-200 rounded-full h-3 max-w-2xl mx-auto">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
              />
            </div>
          )}
        </motion.div>

        {!submitted ? (
          <>
            {/* Current Question */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-8"
            >
              <p className="font-semibold text-gray-900 mb-6 text-xl">
                Q{currentQuestion + 1}. {questions[currentQuestion].question}
              </p>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((opt: string, idx: number) => {
                  const isSelected = answers[currentQuestion] === idx
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQuestion, idx)}
                      className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? "bg-blue-50 text-blue-800 border-blue-500 shadow-md"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      <span className="font-medium mr-3">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md text-lg"
                >
                  Submit Assessment ✓
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Next Question →
                </button>
              )}
            </div>

            {/* Question Navigation Dots */}
            {/* <div className="flex justify-center gap-2 mt-8 flex-wrap">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentQuestion === index
                      ? "bg-blue-600 scale-125"
                      : answers[index] !== undefined
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                  title={`Question ${index + 1}${answers[index] !== undefined ? " - Answered" : ""}`}
                />
              ))}
            </div> */}
          </>
        ) : showReview ? (
          /* Review Section - Show All Questions and Answers */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-center">Review Your Answers</h2>
              <p className="text-gray-600 text-center mb-6">
                Your score: <span className="font-bold text-blue-600">{score}%</span> | Grade: <span className="font-bold text-green-600">{grade}</span>
              </p>
            </div>

            {questions.map((q, i) => {
              const selectedAnswerIndex = answers[i]
              const selectedAnswer = q.options[selectedAnswerIndex]
              const correctAnswer = q.answer
              const isCorrect = selectedAnswer === correctAnswer
              
              return (
                <div
                  key={q.id}
                  className={`bg-white p-6 rounded-2xl shadow-md border-2 ${
                    isCorrect ? "border-green-200" : "border-red-200"
                  }`}
                >
                  <p className="font-semibold text-gray-900 mb-4 text-lg">
                    Q{i + 1}. {q.question}
                  </p>
                  
                  <div className="space-y-3">
                    {q.options.map((opt: string, idx: number) => {
                      const isSelected = selectedAnswerIndex === idx
                      const isCorrectOption = opt === correctAnswer
                      
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border-2 ${
                            isCorrectOption
                              ? "bg-green-50 border-green-300 text-green-800"
                              : isSelected && !isCorrectOption
                              ? "bg-red-50 border-red-300 text-red-800"
                              : "bg-gray-50 border-gray-200 text-gray-800"
                          }`}
                        >
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          {opt}
                          {isCorrectOption && <span className="ml-2 text-green-600 font-bold">✓ Correct Answer</span>}
                          {isSelected && !isCorrectOption && <span className="ml-2 text-red-600 font-bold">✗ Your Answer</span>}
                        </div>
                      )
                    })}
                  </div>
                  
                  {!isCorrect && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        <strong>Explanation:</strong> You selected "{selectedAnswer}" but the correct answer is "{correctAnswer}"
                      </p>
                    </div>
                  )}
                </div>
              )
            })}

            <div className="text-center space-x-4">
              <button
                onClick={() => setShowReview(false)}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
              >
                Back to Results
              </button>
              <button
                onClick={handleGoBack}
                className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        ) : (
          /* Results Summary Section */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center"
          >
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isPassed 
                ? "bg-green-100 text-green-600" 
                : "bg-red-100 text-red-600"
            }`}>
              {isPassed ? (
                <span className="text-4xl">🎉</span>
              ) : (
                <span className="text-4xl">📝</span>
              )}
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Assessment {isPassed ? "Completed!" : "Results"}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-2xl font-bold text-blue-600">{score}%</p>
                <p className="text-blue-800">Score</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-2xl font-bold text-green-600">{grade}</p>
                <p className="text-green-800">Grade</p>
              </div>
              <div className={`p-4 rounded-xl ${
                isPassed ? "bg-green-50" : "bg-red-50"
              }`}>
                <p className={`text-2xl font-bold ${
                  isPassed ? "text-green-600" : "text-red-600"
                }`}>
                  {isPassed ? "PASSED" : "FAILED"}
                </p>
                <p className={isPassed ? "text-green-800" : "text-red-800"}>
                  Status
                </p>
              </div>
            </div>

            {isPassed ? (
              <p className="text-green-600 text-lg mb-6">
                Congratulations! You've passed the assessment and are eligible for your certificate. 🏆
              </p>
            ) : (
              <p className="text-red-600 text-lg mb-6">
                You need at least 33% to pass. Don't worry, you can retake the assessment.
              </p>
            )}

            <div className="space-x-4 space-y-4 sm:space-y-0">
              <button
                onClick={() => setShowReview(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition shadow-md"
              >
                Review Answers
              </button>
              
              <button
                onClick={handleGoBack}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
              >
                Back to Dashboard
              </button>
              
              {!isPassed && (
                <button
                  onClick={handleRetake}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
                >
                  Retake Assessment
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}