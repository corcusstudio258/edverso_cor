// app/register/page.tsx
import type { Metadata } from "next";
import RegistrationForm from "@/components/register/RegistrationForm";

export const metadata: Metadata = {
  title: "Register - Balaji UGC Internship LMS",
  description: "Join thousands of students and colleges. Register for UGC-mandated internship programs and certification.",
  keywords: "student registration, college registration, UGC internship, sign up",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <RegistrationForm/>
    </div>
  );
}
import RegisterForm from "@/components/register/NewRegistration";

export default function RegisterPage() {
  return <RegisterForm />;
}
