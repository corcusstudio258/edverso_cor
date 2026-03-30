/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forgot-password/ForgotPasswordForm.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

type ResetStep = 'credentials' | 'success';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<ResetStep>('credentials');
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate required fields
    if (!email || !phoneNumber) {
      setError("Email and phone number are required");
      setLoading(false);
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password");
      setLoading(false);
      return;
    }

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Basic phone number validation (at least 10 digits)
    const phoneRegex = /^\d{10,}$/;
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setError("Please enter a valid phone number (at least 10 digits)");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/forgot-password", {
        email: email.toLowerCase().trim(),
        phoneNumber: cleanPhone,
        newPassword
      });
      
      if (res.data?.success) {
        toast.success("Password reset successfully!");
        setStep('success');
      }
    } catch (err: any) {
      console.error("Reset password error:", err);
      const errorMessage = err.response?.data?.error || "Failed to reset password. Please check your details and try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Email, phone number and new password
  if (step === 'credentials') {
    return (
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email, phone number, and new password to reset your password.
          </p>
        </div>

        {/* Form Card */}
        <div className="card shadow-xl border-0">
          <div className="card-body p-8">
            {error && (
              <div className="p-4 rounded-lg mb-6 bg-red-50 border border-red-200 text-red-800">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-lg">
                    ⚠️
                  </div>
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-10"
                    placeholder="Enter your registered email"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input pl-10"
                    placeholder="Enter your registered phone number"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter the phone number associated with your account
                </p>
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password *
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input"
                  placeholder="Enter new password (min. 6 characters)"
                  minLength={6}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input"
                  placeholder="Confirm your new password"
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-3 text-lg font-semibold relative overflow-hidden group"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2 relative z-10">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Resetting password...</span>
                  </div>
                ) : (
                  <span className="relative z-10">Reset Password</span>
                )}
                <div className="absolute inset-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 z-0"></div>
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                href="/login" 
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                ← Back to login
              </Link>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-700">
            🔒 For security, we verify both your email and phone number before resetting your password.
          </p>
        </div>
      </div>
    );
  }

  // Step 2: Success
  if (step === 'success') {
    return (
      <div className="max-w-md w-full space-y-8">
        {/* Success Card */}
        <div className="card shadow-xl border-0">
          <div className="card-body p-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Password Reset Successful!
            </h2>
            
            <p className="text-gray-600 mb-6">
              Your password has been reset successfully. You can now login with your new password.
            </p>

            <Link
              href="/login"
              className="btn btn-primary w-full py-3 text-lg font-semibold"
            >
              Go to Login
            </Link>

            <div className="mt-6">
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-sm text-green-700">
            🔒 For security reasons, please log in with your new password and consider logging out of other devices.
          </p>
        </div>
      </div>
    );
  }

  return null;
}