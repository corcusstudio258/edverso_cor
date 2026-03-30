/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export default function VerifyCertificatePage() {
  const [searchType, setSearchType] = useState("rollNumber");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!searchValue.trim()) {
      setError("Please enter a value to search");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const params = new URLSearchParams();
      params.set(searchType, searchValue);

      const response = await fetch(`/api/verify-rollnumber?${params}`);
      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.message || "Verification failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Certificate Verification Portal
          </h1>
          <p className="text-gray-600">
            BALAJEE SEWA SANSTHAN - Student Certificate Verification System
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Verify Student Certificate
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter student details to verify certificate authenticity
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search By
                </label>
                <div className="flex space-x-4">
                  {["rollNumber", "phoneNumber", "email"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSearchType(type)}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        searchType === type
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {type === "rollNumber" && "University Roll Number"}
                      {type === "phoneNumber" && "Phone Number"}
                      {type === "email" && "Email"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {searchType === "rollNumber" && "University Roll Number"}
                  {searchType === "phoneNumber" && "Phone Number"}
                  {searchType === "email" && "Email Address"}
                </label>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={
                    searchType === "rollNumber"
                      ? "Enter university roll number"
                      : searchType === "phoneNumber"
                      ? "Enter phone number"
                      : "Enter email address"
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleVerify()}
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={loading || !searchValue.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify Certificate"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="border-t pt-6">
              <div
                className={`p-6 rounded-lg ${
                  result.verified
                    ? "bg-green-50 border border-green-200"
                    : "bg-yellow-50 border border-yellow-200"
                }`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      result.verified ? "bg-green-100" : "bg-yellow-100"
                    }`}
                  >
                    {result.verified ? (
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-lg font-medium">
                    {result.verified ? "Certificate Verified" : "Certificate Not Issued"}
                  </h3>
                </div>

                {result.verified ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Student Name</p>
                        <p className="text-lg font-semibold">{result.student.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">University Roll Number</p>
                        <p className="text-lg font-semibold">{result.student.rollNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">College Name</p>
                        <p className="text-lg">{result.student.collegeName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">University Name</p>
                        <p className="text-lg">{result.student.universityName}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-md font-medium mb-3">Issued Certificates</h4>
                      <div className="space-y-3">
                        {result.student.certificates.map((cert: any, index: number) => (
                          <div key={index} className="p-4 bg-white border rounded-md">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Topic: {cert.topic}</p>
                                <p className="text-sm text-gray-600">Grade: {cert.grade}</p>
                                <p className="text-sm text-gray-600">
                                  Completed: {cert.completedAt || "N/A"}
                                </p>
                              </div>
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                ISSUED
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600">
                        Registered with: <span className="font-semibold">BALAJEE SEWA SANSTHAN</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Verified on: {result.verificationDate}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-gray-700">{result.message}</p>
                    {result.student && (
                      <div className="p-4 bg-white border rounded-md">
                        <p className="font-medium">{result.student.name}</p>
                        <p className="text-sm text-gray-600">Roll Number: {result.student.rollNumber}</p>
                        <p className="text-sm text-gray-600">College: {result.student.collegeName}</p>
                        <p className="text-sm text-red-600 font-medium mt-2">
                          Status: Certificate Not Issued
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            About This Portal
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Official certificate verification system of BALAJEE SEWA SANSTHAN</li>
            <li>• Verify student internship certificates instantly</li>
            <li>• Search by University Roll Number, Phone Number, or Email</li>
            <li>• Real-time verification against official database</li>
            <li>• For official college use only</li>
          </ul>
        </div>
      </div>
    </div>
  );
}