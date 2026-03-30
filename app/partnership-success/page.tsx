// app/college-partnership-success/page.tsx
'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Home, Phone, ArrowRight } from "lucide-react";

export default function CollegePartnershipSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-xl w-full text-center border border-green-100"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Partnership Request Submitted
        </h1>
        <p className="text-gray-600 text-base mb-6 leading-relaxed">
          Thank you for reaching out! Our partnership team has received your details.  
          We’ll connect with you within <span className="font-semibold text-green-700">2–3 working days</span>.
        </p>

        {/* Divider */}
        <div className="h-px w-24 bg-green-300 mx-auto mb-8"></div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <Home className="w-10 h-10" />
            Go to Homepage
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 border-2 border-green-600 text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition-all"
          >
            <Phone className="w-10 h-10" />
            Contact Support
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold transition-all group"
          >
            Register Another College
            <ArrowRight className="w-10 h-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-500 mt-8">
          We appreciate your interest in partnering with <span className="font-semibold text-green-700">Edervso</span>.  
          Together, let’s simplify internships for students nationwide.
        </p>
      </motion.div>
    </div>
  );
}
