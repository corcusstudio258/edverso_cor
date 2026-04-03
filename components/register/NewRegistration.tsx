'use client';

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

const UNIVERSITIES = ["Patliputra University"] as const;

const COLLEGES = [
  "A N College, Patna",
  "ANS College, Barh",
  "B D College, Patna",
  "B.S. College",
  "College Of Commerce, Arts & Science, Patna",
  "G J College, Rambagh, Bihta",
  "Ganga Devi Mahila Mahavidalaya, Patna",
  "J D Women’s College, Patna",
  "Jagat Narayan Lal College, Patna",
  "M M College, Bikram",
  "Mahila College, Khagaul",
  "Malti Dhari College, Naubatpur",
  "R L S Y College, Bakhtiarpur",
  "R P M College, Patna City",
  "Ram Krishna Dwarika College, Patna",
  "Ram Ratan Singh College, Mokama",
  "S M D College, Punpun",
  "Sri Arvind Mahila College, Patna",
  "Sri Guru Gobind Singh College, Patna",
  "T P S College, Patna",
  "Govt. Degree College, Rajgir",
  "Kisan College, Nalanda",
  "Nalanda College, Biharsharif",
  "Nalanda Mahila College, Biharsharif",
  "S P M College, Udantpuri",
  "S U College, Hilsa",
  "Oriental College, Patna City",
  "Sogara College, Biharsharif",
  "Allama Iqbal College, Biharsharif",
  "Awadhesh Prasad Mahavidyalaya",
  "B B M B G Kanya College",
  "B L P College, Masaurhi",
  "Bansropan Ram Bahadur Singh Yadav College, Kanhauli",
  "Chandradeo Prasad Verma College, Simri",
  "D N College, Masaurhi",
  "Dr. C P Thakur College, Naubatpur, Patna",
  "Jyoti Kunwar College, Fatehpur",
  "Kameshwar Prasad Singh College, Nadwan",
  "L P Shahi College, Patna",
  "Nunwati Jagdev Singh College, Bakhtiyarpur",
  "P L S College, Masaurhi",
  "P N K College, Achhua",
  "Patna Muslim Science College, Patna",
  "R P College, Datiyana",
  "R L S Y College, Anisabad, Patna",
  "R P S College, Bailey Road",
  "R P S Mahila College, Bailey Road",
  "Ram Roop Prasad College, Patna",
  "S K M V College, Fatuha",
  "S N A Evening College, Barh",
  "Sant Sandhya Das Mahila College, Barh",
  "Sir Ganesh Dutt Memorial College, Patna",
  "Sri Bhuwaneshwari Raja College, Barh",
  "Sri Ram Narayan College, Barh",
  "Trimurti College, Ismailpur"
] as const;

const MAJOR_SUBJECTS = [
  "BioTech",
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
  "Urdu",
  "Sanskrit",
  "Philosophy",
  "Psychology",
  "Sociology",
  "Commerce",
] as const;

const DEGREE_TYPES = ["UG", "PG"] as const;
const SEMESTERS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;
const GENDER_OPTIONS = ["Male", "Female", "Other"] as const;

// Indian mobile: 10 digits, starts with 6–9
const INDIAN_PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[a-zA-Z\s]{3,}$/;
// Roll number: exactly 12 digits
const ROLL_RE = /^\d{12}$/;

interface RegisterFormData {
  fullName: string;
  gender: string;
  universityName: string;
  collegeName: string;
  universityRegistrationNumber: string;
  universityRollNo: string;
  degree: string;
  majorSubject: string;
  semester: string;
  phoneNumber: string;
  email: string;
  password: string;
}

type FormErrors = Partial<Record<keyof RegisterFormData, string>>;

function validate(data: RegisterFormData): FormErrors {
  const e: FormErrors = {};

  if (!data.fullName.trim())
    e.fullName = "Full name is required.";
  else if (!NAME_RE.test(data.fullName.trim()))
    e.fullName = "Full name must be at least 3 letters and contain only letters.";

  if (!data.gender)
    e.gender = "Please select your gender.";

  if (!data.universityName)
    e.universityName = "Please select a university.";

  if (!data.collegeName)
    e.collegeName = "Please select a college.";

  if (!data.universityRegistrationNumber.trim())
    e.universityRegistrationNumber = "University registration number is required.";
  else if (data.universityRegistrationNumber.trim().length < 5)
    e.universityRegistrationNumber = "Enter a valid registration number (min 5 characters).";

  if (!data.universityRollNo.trim())
    e.universityRollNo = "University roll number is required.";
  else if (!ROLL_RE.test(data.universityRollNo.trim()))
    e.universityRollNo = "Roll number must be exactly 12 digits.";

  if (!data.degree)
    e.degree = "Please select degree type.";

  if (!data.majorSubject)
    e.majorSubject = "Please select a major subject.";

  if (!data.semester)
    e.semester = "Please select a semester.";

  if (!data.phoneNumber.trim())
    e.phoneNumber = "Phone number is required.";
  else if (!INDIAN_PHONE_RE.test(data.phoneNumber.trim()))
    e.phoneNumber = "Enter a valid 10-digit Indian mobile number (starts with 6–9).";

  if (!data.email.trim())
    e.email = "Email address is required.";
  else if (!EMAIL_RE.test(data.email.trim()))
    e.email = "Enter a valid email address.";

  return e;
}

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    gender: "",
    universityName: UNIVERSITIES[0],
    collegeName: "",
    universityRegistrationNumber: "",
    universityRollNo: "",
    degree: "",
    majorSubject: "",
    semester: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof RegisterFormData, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Handle the dynamic payment
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    
    // Update payment amount based on selected semester
    if (name === "semester") {
      if (value === "4") {
        setPaymentAmount(600); // Payment for semester 4
      } else if (value === "5") {
        setPaymentAmount(1000); // Payment for semester 5
      } else {
        setPaymentAmount(null); // No payment for other semesters
      }
    }

    if (touched[name as keyof RegisterFormData]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<keyof RegisterFormData, boolean>
    );
    setTouched(allTouched);
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fullName: formData.fullName.trim(),
        gender: formData.gender,
        universityName: formData.universityName,
        collegeName: formData.collegeName,
        universityRegistrationNumber: formData.universityRegistrationNumber.trim(),
        universityRollNo: formData.universityRollNo.trim(),
        degree: formData.degree,
        majorSubject: formData.majorSubject,
        semester: Number(formData.semester),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      const res = await api.post("/auth/register/new", payload);

      if (res.data?.ok) {
        toast.success("Registration successful!");
        const studentId = res.data?.student?.id || res.data?.studentId;
        if (studentId) {
          router.push(`/pay?studentId=${studentId}&email=${encodeURIComponent(formData.email)}`);
        } else {
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

  const filteredColleges = COLLEGES.filter((college) =>
    college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const field = (name: keyof RegisterFormData) => ({
    name,
    id: name,
    value: formData[name],
    onChange: handleChange,
    onBlur: handleBlur,
  });

  const errorMsg = (name: keyof RegisterFormData) =>
    touched[name] && errors[name] ? (
      <p className="mt-1 text-xs text-red-600">{errors[name]}</p>
    ) : null;

  const inputClass = (name: keyof RegisterFormData) =>
    `input w-full${touched[name] && errors[name] ? " border-red-500 focus:border-red-500 focus:ring-red-400" : ""}`;

  return (
    <div className="max-w-2xl w-full mx-auto space-y-8">
      <div className="card shadow-xl border-0">
        <div className="card-body p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Student Registration</h1>
            <p className="text-gray-600 mt-2">Fill in your details and continue to payment</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input {...field("fullName")} type="text" className={inputClass("fullName")} placeholder="Enter your full name" />
              {errorMsg("fullName")}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select {...field("gender")} className={inputClass("gender")}>
                <option value="">Select gender</option>
                {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              {errorMsg("gender")}
            </div>

            {/* University Name */}
            <div>
              <label htmlFor="universityName" className="block text-sm font-medium text-gray-700 mb-2">
                University Name <span className="text-red-500">*</span>
              </label>
              <select {...field("universityName")} className={inputClass("universityName")}>
                {UNIVERSITIES.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
              {errorMsg("universityName")}
            </div>

            {/* College Name */}
            <div>
              <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-2">
                College Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search college"
                className="input w-full mb-2"
              />
              <select {...field("collegeName")} className={inputClass("collegeName")}>
                <option value="">Select college</option>
                {filteredColleges.map((college) => (
                  <option key={college} value={college}>
                    {college}
                  </option>
                ))}
              </select>
              {errorMsg("collegeName")}
            </div>

            {/* Semester */}
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                Semester <span className="text-red-500">*</span>
              </label>
              <select {...field("semester")} className={inputClass("semester")}>
                <option value="">Select semester</option>
                {SEMESTERS.map((s) => <option key={s} value={s}>Semester {s}</option>)}
              </select>
              {errorMsg("semester")}
            </div>

            {/* Payment Display */}
            {paymentAmount !== null && (
              <div className="text-xl text-blue-600 font-semibold">
                Payment Amount: ₹{paymentAmount}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
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
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}