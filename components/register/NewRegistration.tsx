/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
//app/register/NewRegistration.tsx
'use client';

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import app from "next/app";

const UNIVERSITIES = ["Patliputra University"] as const;

const COLLEGES = [
  "A.N. College, Patna",
  "B.D. College, Patna",
  "College of Commerce, Arts & Science, Patna",
  "Magadh Mahila College, Patna",
  "Patna Women's College, Patna",
  "Ram Krishna Dwarika College, Patna",
  "S.N. Sinha College, Jehanabad",
  "Nalanda College, Bihar Sharif",
  "T.P.S. College, Patna",
  "Government Degree College, Patna",
] as const;

const MAJOR_SUBJECTS = [
  "Computer Science",
  "BCA",
  "BBA",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Botany",
  "Zoology",
  "Economics",
  "Political Science",
  "History",
  "Geography",
  "Hindi",
  "English",
  "Commerce",
] as const;

const SEMESTERS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

interface RegisterFormData {
  fullName: string;
  universityName: string;
  collegeName: string;
  universityRegistrationNumber: string;
  universityRollNo: string;
  majorSubject: string;
  semester: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    universityName: UNIVERSITIES[0],
    collegeName: "",
    universityRegistrationNumber: "",
    universityRollNo: "",
    majorSubject: "",
    semester: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormValid = useMemo(() => {
    return Object.values(formData).every((value) => value.trim() !== "");
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        universityName: formData.universityName,
        collegeName: formData.collegeName,
        universityRegistrationNumber: formData.universityRegistrationNumber,
        universityRollNo: formData.universityRollNo,
        majorSubject: formData.majorSubject,
        semester: Number(formData.semester),
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
      };

      const res = await api.post("/auth/register", payload);

      if (res.data?.ok) {
        toast.success("Registration successful!");

        // Redirect to payment gateway page
        // Assumes backend returns student id after registration
        const studentId = res.data?.student?.id || res.data?.studentId;

        if (studentId) {
          router.push(`/pay?studentId=${studentId}&email=${encodeURIComponent(formData.email)}`);
        } else {
          // fallback if backend does not return student id
          router.push(`/pay?email=${encodeURIComponent(formData.email)}`);
        }
      } else {
        toast.error(res.data?.message || "Registration failed");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto space-y-8">
      <div className="card shadow-xl border-0">
        <div className="card-body p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Student Registration</h1>
            <p className="text-gray-600 mt-2">
              Fill in your details and continue to payment
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter your full name"
              />
            </div>

            {/* 2. University Name */}
            <div>
              <label htmlFor="universityName" className="block text-sm font-medium text-gray-700 mb-2">
                University Name
              </label>
              <select
                id="universityName"
                name="universityName"
                required
                value={formData.universityName}
                onChange={handleChange}
                className="input w-full"
              >
                {UNIVERSITIES.map((university) => (
                  <option key={university} value={university}>
                    {university}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. College Name */}
            <div>
              <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-2">
                College Name
              </label>
              <select
                id="collegeName"
                name="collegeName"
                required
                value={formData.collegeName}
                onChange={handleChange}
                className="input w-full"
              >
                <option value="">Select college</option>
                {COLLEGES.map((college) => (
                  <option key={college} value={college}>
                    {college}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. University Registration Number */}
            <div>
              <label
                htmlFor="universityRegistrationNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                University Registration Number
              </label>
              <input
                id="universityRegistrationNumber"
                name="universityRegistrationNumber"
                type="text"
                required
                value={formData.universityRegistrationNumber}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter university registration number"
              />
            </div>

            {/* 5. University Roll No */}
            <div>
              <label htmlFor="universityRollNo" className="block text-sm font-medium text-gray-700 mb-2">
                University Roll No
              </label>
              <input
                id="universityRollNo"
                name="universityRollNo"
                type="text"
                required
                value={formData.universityRollNo}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter university roll number"
              />
            </div>

            {/* 6. Major Subject */}
            <div>
              <label htmlFor="majorSubject" className="block text-sm font-medium text-gray-700 mb-2">
                Major Subject
              </label>
              <select
                id="majorSubject"
                name="majorSubject"
                required
                value={formData.majorSubject}
                onChange={handleChange}
                className="input w-full"
              >
                <option value="">Select major subject</option>
                {MAJOR_SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* 7. Semester */}
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                Semester
              </label>
              <select
                id="semester"
                name="semester"
                required
                value={formData.semester}
                onChange={handleChange}
                className="input w-full"
              >
                <option value="">Select semester</option>
                {SEMESTERS.map((semester) => (
                  <option key={semester} value={semester}>
                    Semester {semester}
                  </option>
                ))}
              </select>
            </div>

            {/* 8. Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter phone number"
              />
            </div>

            {/* 9. Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter email address"
              />
            </div>

            {/* 10. Create Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Create Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input w-full pr-12"
                  placeholder="Create password"
                />
                <button
                  type="button"
                  title="Toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {showPassword ? (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="btn btn-primary w-full py-3 text-lg font-semibold relative overflow-hidden group disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 relative z-10">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <span className="relative z-10">Submit & Continue to Payment</span>
              )}

              <div className="absolute inset-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 z-0"></div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
              >
                Submit
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}