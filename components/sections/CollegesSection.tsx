// components/sections/CollegesSection.tsx
import { FC } from "react";
import Link from "next/link";

interface CollegeFeatureProps {
  icon: string;
  title: string;
  description: string;
  available: boolean;
}

const CollegesSection: FC = () => {
  const features: CollegeFeatureProps[] = [
    {
      icon: "👥",
      title: "Bulk Student Onboarding",
      description: "Upload multiple students via CSV/Excel with automatic profile creation.",
      available: true,
    },
    {
      icon: "📊",
      title: "Progress Monitoring",
      description: "Track student progress, attendance, and completion rates in real-time.",
      available: true,
    },
    {
      icon: "📋",
      title: "Certificate Management",
      description: "Automated certificate issuance and download for all enrolled students.",
      available: true,
    },
    {
      icon: "📈",
      title: "Analytics Dashboard",
      description: "Comprehensive reports on student performance and program effectiveness.",
      available: false,
    },
    {
      icon: "🔗",
      title: "API Integration",
      description: "Seamless integration with existing college management systems.",
      available: false,
    },
    {
      icon: "🎯",
      title: "Custom Workflows",
      description: "Tailored processes to match your college's specific requirements.",
      available: false,
    },
  ];

  const partnershipBenefits = [
    "Zero setup cost for partner colleges",
    "Dedicated account manager",
    "Priority support and training",
    "Custom reporting and analytics",
    "UGC compliance guarantee",
    "Bulk discount packages"
  ];

  return (
    <section id="colleges" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            For <span className="gradient-text">Colleges & Institutions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Streamline UGC-mandated internship programs with our comprehensive management platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Features Grid */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">College Dashboard Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <CollegeFeature key={feature.title} {...feature} index={index} />
              ))}
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Partnership Benefits</h3>
            <div className="space-y-4 mb-8">
              {partnershipBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h4 className="font-bold text-lg mb-2">Ready to Partner With Us?</h4>
              <p className="text-blue-100 mb-4 text-sm">
                Join hundreds of colleges already using our platform for UGC internship management.
              </p>
              <Link
                href="/register"
                className="btn bg-white text-blue-600 hover:bg-blue-50 font-semibold w-full text-center transition-all duration-200 hover:scale-105"
              >
                Request College Partnership
              </Link>
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Metric value="150+" label="Partner Colleges" description="Across India" />
            <Metric value="50K+" label="Students Enrolled" description="Active users" />
            <Metric value="98%" label="Satisfaction Rate" description="College feedback" />
            <Metric value="24/7" label="Support" description="Dedicated team" />
          </div>
        </div>

        {/* Integration Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Seamless Integration with Your Systems
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our platform integrates with popular college management systems and follows 
            UGC guidelines to ensure compliance and smooth operations.
          </p>
          <div className="flex flex-wrap justify-center gap-6 opacity-75">
            <IntegrationLogo name="ERP Systems" />
            <IntegrationLogo name="Student Portals" />
            <IntegrationLogo name="LMS Platforms" />
            <IntegrationLogo name="UGC Portal" />
          </div>
        </div>
      </div>
    </section>
  );
};

const CollegeFeature: FC<CollegeFeatureProps & { index: number }> = ({
  icon,
  title,
  description,
  available,
}) => {
  return (
    <div 
      className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
        available 
          ? "border-green-200 bg-green-50 hover:border-green-300" 
          : "border-gray-200 bg-gray-100 opacity-75"
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`text-2xl ${available ? '' : 'opacity-50'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold mb-1 flex items-center space-x-2 ${
            available ? 'text-gray-900' : 'text-gray-500'
          }`}>
            <span>{title}</span>
            {!available && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                Coming Soon
              </span>
            )}
          </h4>
          <p className={`text-sm ${
            available ? 'text-gray-600' : 'text-gray-500'
          }`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Metric: FC<{ value: string; label: string; description: string }> = ({
  value,
  label,
  description,
}) => {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
      <div className="font-semibold text-gray-900 mb-1">{label}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  );
};

const IntegrationLogo: FC<{ name: string }> = ({ name }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-6 py-3 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="text-gray-700 font-medium">{name}</div>
    </div>
  );
};

export default CollegesSection;