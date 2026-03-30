/* eslint-disable @typescript-eslint/no-unused-vars */
// app/verify-certificate/page.tsx
"use client";

import { useEffect, useState } from "react";

interface VerificationResult {
  valid: boolean;
  message?: string;
  student?: {
    name: string;
    rollNumber: string;
    college: string;
    university: string;
    internshipTopic: string;
    grade: string;
    verifiedAt: string;
  };
}

export default function VerifyCertificatePage() {
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const data = searchParams.get('data');
        
        if (!data) {
          setVerificationResult({
            valid: false,
            message: "No verification data provided"
          });
          return;
        }

        const response = await fetch(`/api/verify-certificate?data=${data}`);
        const result = await response.json();
        
        setVerificationResult(result);
      } catch (error) {
        setVerificationResult({
          valid: false,
          message: "Verification failed"
        });
      } finally {
        setLoading(false);
      }
    };

    verifyCertificate();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {verificationResult?.valid ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Certificate Verified
            </h1>
            <div className="text-left bg-green-50 p-4 rounded-lg mb-6">
              <p><strong>Name:</strong> {verificationResult.student?.name}</p>
              <p><strong>Roll No:</strong> {verificationResult.student?.rollNumber}</p>
              <p><strong>College:</strong> {verificationResult.student?.college}</p>
              <p><strong>Internship Topic:</strong> {verificationResult.student?.internshipTopic}</p>
              <p><strong>Grade:</strong> {verificationResult.student?.grade}</p>
              <p><strong>Verified At:</strong> {new Date(verificationResult.student?.verifiedAt || '').toLocaleString()}</p>
            </div>
            <p className="text-green-700 font-medium">
              This certificate is authentic and issued by BALAJEE SEWA SANSTHAN
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Verification Failed
            </h1>
            <p className="text-red-600 mb-6">
              {verificationResult?.message || "This certificate could not be verified"}
            </p>
            <p className="text-gray-600 text-sm">
              Please contact the institution if you believe this is an error.
            </p>
          </>
        )}
      </div>
    </div>
  );
}