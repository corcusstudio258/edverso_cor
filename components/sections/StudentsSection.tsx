/* eslint-disable react/no-unescaped-entities */
"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BenefitCardProps {
  step: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

const StudentsSection: FC = () => {
  const benefits: BenefitCardProps[] = [
    {
      step: 1,
      title: "Easy Registration",
      description:
        "Complete your profile with basic information and upload required documents in minutes.",
      icon: "👤",
      duration: "1 min",
    },
    {
      step: 2,
      title: "Secure Payment",
      description:
        "Pay securely via Razorpay with multiple payment options and instant confirmation.",
      icon: "💳",
      duration: "1 min",
    },
    {
      step: 3,
      title: "Access Training",
      description:
        "Learn through 7 comprehensive subjects with materials, PPTs, and expert-led videos.",
      icon: "📚",
      duration: "120 hours",
    },
    {
      step: 4,
      title: "Assessment",
      description:
        "Take quizzes and assignments to evaluate your learning, growth, and understanding.",
      icon: "📝",
      duration: "60 mins",
    },
    {
      step: 5,
      title: "Get Certified",
      description:
        "Receive your UGC-compliant internship certificate instantly after completion.",
      icon: "🏆",
      duration: "Instant",
    },
  ];

  const stats = [
    { value: "100%", label: "UGC Compliant" },
    { value: "30 Days", label: "Program Duration" },
    { value: "7 Subjects", label: "Comprehensive Curriculum" },
    { value: "24/7", label: "Student Support" },
  ];

  return (
    <section
      id="students"
      className="relative overflow-hidden bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 py-20"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Your <span className="text-blue-200">Journey</span> to Certification
          </h2>
          <p className="text-blue-100 text-lg">
            A complete step-by-step experience — smooth, structured, and designed to help you shine.
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="relative max-w-5xl  mx-auto mb-16">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-300 via-blue-400 to-blue-600 rounded-full"></div>

          <div className="space-y-12 md:space-y-24">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                } items-center md:items-start`}
              >
                {/* Step Icon Circle */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-400 to-indigo-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-blue-950 z-20">
                  <span className="text-2xl">{benefit.icon}</span>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className={`mt-12 h-50 md:mt-0 w-full md:w-1/2 p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 ${
                    index % 2 === 0
                      ? "md:mr-auto md:ml-20"
                      : "md:ml-auto md:mr-20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 mt-8">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      {benefit.title}
                    </h3>
                    <span className="text-sm text-blue-200 bg-white/10 px-2 py-1 rounded-full">
                      {benefit.duration}
                    </span>
                  </div>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats + CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-xl text-center max-w-5xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Start Your Internship Journey Today
          </h3>
          <p className="text-blue-100 mb-8 text-base md:text-lg">
            Join thousands of students who've already completed their
            UGC-approved internships effortlessly.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-white/10 rounded-xl border border-white/10 shadow-sm"
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/register"
            className="inline-block bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-md"
          >
            Register Now
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-blue-200">
            <span>✅ Instant Offer Letter</span>
            <span>✅ Automated Certificate</span>
            <span>✅ Digital Signature</span>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 text-center max-w-3xl mx-auto shadow-xl"
        >
          <div className="text-5xl mb-4">🎓</div>
          <blockquote className="text-xl text-white italic mb-4">
            "The process was so smooth and modern! From registration to certification,
            everything was automated and stress-free. Absolutely loved it!"
          </blockquote>
          <div className="text-blue-200 font-semibold">
            - Priya Sharma, BCA Student
          </div>
        </motion.div>
      </div>

      {/* Glow effect background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[120%] bg-gradient-to-b from-blue-400/20 via-blue-500/10 to-transparent blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default StudentsSection;
