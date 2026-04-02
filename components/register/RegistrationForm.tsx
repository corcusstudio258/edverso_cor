// app/register/RegistrationForm.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import StudentRegistration from "./StudentRegistration";
import CollegeRegistration from "./CollegeRegistration";
import NewRegistration from "./NewRegistration";

type RegistrationType = 'student' | 'college';

export default function RegistrationForm() {
  const [activeTab, setActiveTab] = useState<RegistrationType>('student');

  const tabs = [
    { id: 'student' as const, name: 'Student Registration', icon: '🎓', description: 'Individual student account' },
    { id: 'college' as const, name: 'College Registration', icon: '🏛️', description: 'Institutional partnership' },
  ];

  return (
    <div className="max-w-4xl w-full space-y-8">

      {/* Main Registration Card */}
      <div className="card shadow-2xl border-0 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="grid grid-cols-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-6 px-8 text-center transition-all duration-300 group ${
                  activeTab === tab.id
                    ? 'bg-blue-50 border-b-2 border-blue-600'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-2xl">{tab.icon}</span>
                  <span className={`font-semibold text-lg ${
                    activeTab === tab.id ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {tab.name}
                  </span>
                  <span className={`text-sm ${
                    activeTab === tab.id ? 'text-blue-500' : 'text-gray-500'
                  }`}>
                    {tab.description}
                  </span>
                </div>
                
                {/* Active indicator */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'student' ? <StudentRegistration/> : <CollegeRegistration/>}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <FeatureCard
          icon="⚡"
          title="Instant Setup"
          description="Get started in minutes with quick registration and verification"
        />
        <FeatureCard
          icon="🎯"
          title="UGC Compliant"
          description="100% compliant with government internship guidelines"
        />
        <FeatureCard
          icon="🔒"
          title="Secure & Reliable"
          description="Bank-grade security for all your data and payments"
        />
      </div>

      {/* Support Section */}
      <div className="text-center mt-8">
        <p className="text-gray-600">
          Need assistance?{" "}
          <Link href="/contact" className="font-semibold text-blue-600 hover:text-blue-500">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
}

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};