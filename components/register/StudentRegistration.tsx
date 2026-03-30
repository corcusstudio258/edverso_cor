/* eslint-disable @typescript-eslint/no-explicit-any */
// app/register/StudentRegistration.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface StudentFormData {
  // Personal Info
  fullName: string;
  gender: "Male" | "Female" | "Other";
  parentName: string;
  contactNumber: string;
  email: string;
  password: string;
  confirmPassword: string;

  // Academic Info
  universityName : string,
  collegeName: string;
  degree: string;
  department: string;
  rollNumber: string;
  classSemester: string;

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyRelation: string;
}

export default function StudentRegistration() {
  const [formData, setFormData] = useState<StudentFormData>({
    // Personal Info
    fullName: '',
    gender: "Male",
    parentName: '',
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: '',

    // Academic Info
    universityName: '',
    collegeName: '',
    degree: '',
    department: '',
    rollNumber: '',
    classSemester: '5th Semester',

    // Emergency Contact
    emergencyContactName: '',
    emergencyContactNumber: '',
    emergencyRelation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    // Validate phone number (basic)
    if (formData.contactNumber.length < 10) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    // Validate emergency contact number
    if (formData.emergencyContactNumber.length < 10) {
      setError("Please enter a valid emergency contact number");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/register/student", {
        // Personal Info
        fullName: formData.fullName,
        gender: formData.gender,
        parentName: formData.parentName,
        contactNumber: formData.contactNumber,
        email: formData.email,
        password: formData.password,

        // Academic Info
        universityName : formData.universityName,
        collegeName: formData.collegeName,
        degree : formData.degree,
        department: formData.department,
        rollNumber: formData.rollNumber,
        classSemester: formData.classSemester,

       

        // Emergency Contact
        emergencyContactName: formData.emergencyContactName,
        emergencyContactNumber: formData.emergencyContactNumber,
        emergencyRelation: formData.emergencyRelation,
      });

      if (res.data?.ok) {
        // Redirect to payment page with student ID and email
        toast.success("Registration successful!");
        router.push(`/pay?studentId=${res.data.studentId}&organizationRegNo=${res.data.organizationRegNo}&email=${formData.email}&fullName=${encodeURIComponent(formData.fullName)}`);
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err?.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Student Registration</h3>
        <p className="text-gray-600">
          Complete your registration for UGC-mandated internship program
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">✕</span>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div className="card p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
            <span>Personal Information</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="input"
                placeholder="Enter your full name as per official records"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="input"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Parent Name */}
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
                Parent/Guardian Name *
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                required
                value={formData.parentName}
                onChange={handleChange}
                className="input"
                placeholder="Enter parent or guardian name"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  required
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">10-digit mobile number</p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information Section */}
        <div className="card p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
            <span>Academic Information</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* University Name */}
            <div className="md:col-span-2">
              <label htmlFor="universityName" className="block text-sm font-medium text-gray-700 mb-2">
                University Name *
              </label>
              <input
                type="text"
                id="universityName"
                name="universityName"
                required
                value={formData.universityName}
                onChange={handleChange}
                className="input"
                placeholder="Enter your university full name"
              />
            </div>

            {/* College Name */}
            <div className="md:col-span-2">
              <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-2">
                College Name *
              </label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                required
                value={formData.collegeName}
                onChange={handleChange}
                className="input"
                placeholder="Enter your college full name"
              />
            </div>
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-2">
                Degree *
              </label>
              <select
                id="degree"
                name="degree"
                required
                value={formData.degree}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Degree</option>
                <option value="UG">UG</option>
                <option value="PG">PG</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Department/Stream *
              </label>
              <select
                id="department"
                name="department"
                required
                value={formData.department}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Department</option>
                <option value="BA">BA</option>
                <option value="BCOM">BCOM</option>
                <option value="BBA">BBA</option>
                <option value="BCA">BCA</option>
                <option value="BSC">BSC</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Class/Semester */}
            <div>
              <label htmlFor="classSemester" className="block text-sm font-medium text-gray-700 mb-2">
                Class/Semester *
              </label>
              <select
                id="classSemester"
                name="classSemester"
                required
                value={formData.classSemester}
                onChange={handleChange}
                className="input"
                defaultValue="5th Semester"
              >
                <option value="">Select Class/Semester</option>
                {/* <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="4th Semester">4th Semester</option> */}
                <option value="5th Semester">5th Semester</option>
                {/* <option value="6th Semester">6th Semester</option>
                <option value="7th Semester">7th Semester</option>
                <option value="8th Semester">8th Semester</option> */}
              </select>
            </div>

            {/* Roll Number */}
            <div>
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-2">
                University Roll Number *
              </label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                required
                value={formData.rollNumber}
                onChange={handleChange}
                className="input"
                placeholder="Enter your college roll number"
              />
            </div>

            
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="card p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">3</span>
            <span>Emergency Contact Information</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Emergency Contact Name */}
            <div>
              <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact Name *
              </label>
              <input
                type="text"
                id="emergencyContactName"
                name="emergencyContactName"
                required
                value={formData.emergencyContactName}
                onChange={handleChange}
                className="input"
                placeholder="Full name of emergency contact"
              />
            </div>

            {/* Emergency Contact Number */}
            <div>
              <label htmlFor="emergencyContactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="emergencyContactNumber"
                  name="emergencyContactNumber"
                  required
                  value={formData.emergencyContactNumber}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="Emergency contact phone number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Emergency Relation */}
            <div className="md:col-span-2">
              <label htmlFor="emergencyRelation" className="block text-sm font-medium text-gray-700 mb-2">
                Relationship with Emergency Contact *
              </label>
              <select
                id="emergencyRelation"
                name="emergencyRelation"
                required
                value={formData.emergencyRelation}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Guardian">Guardian</option>
                <option value="Spouse">Spouse</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Security Section */}
        <div className="card p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">4</span>
            <span>Account Security</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input pl-10 pr-10"
                  placeholder="Create a strong password"
                />
                <button
                title="view password"
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg 
                    className={`h-5 w-5 ${showPassword ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600 transition-colors`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    {showPassword ? (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </>
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input pl-10 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                title="Toggle password visibility"
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <svg 
                    className={`h-5 w-5 ${showConfirmPassword ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600 transition-colors`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    {showConfirmPassword ? (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </>
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </>
                    )}
                  </svg>
                    </button>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
              Privacy Policy
            </Link>
            . I understand that the internship organization details, roll number verification, 
            and other administrative fields will be managed by the platform administrators.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-4 text-lg font-semibold relative overflow-hidden group"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating Account...</span>
            </div>
          ) : (
            <>
              <span className="relative z-10">Complete Registration</span>
              <div className="absolute inset-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
            </>
          )}
        </button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}