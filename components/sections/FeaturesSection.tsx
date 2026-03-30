import { FC } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  phase?: string;
  status: "live" | "coming" | "soon";
}

const FeaturesSection: FC = () => {
  const features: FeatureCardProps[] = [
    {
      icon: "📝",
      title: "Student Registration",
      description: "Simple and secure registration process with document upload and verification.",
      status: "live",
    },
    {
      icon: "💳",
      title: "Payment Integration",
      description: "Secure Razorpay payment gateway for course modules fee collection.",
      status: "live",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Real-time progress bar showing 30-day internship completion status.",
      status: "live",
    },
    {
      icon: "📱",
      title: "Assessment System",
      description: "Quizzes and assignments to evaluate student learning and progress.",
      status: "coming",
      phase: "Phase 2",
    },
    {
      icon: "🎓",
      title: "Learning Management",
      description: "7 comprehensive subjects with PPTs, videos, and study materials.",
      status: "coming",
      phase: "Phase 2",
    },
    
    {
      icon: "🏆",
      title: "Certificate Generation",
      description: "Automated PDF certificate generation after successful internship completion.",
      status: "live",
    },
    {
      icon: "🏛️",
      title: "College Dashboard",
      description: "Bulk student upload, progress monitoring, and certificate management.",
      status: "soon",
      phase: "Phase 3",
    },
    {
      icon: "📈",
      title: "Analytics & Reports",
      description: "Comprehensive analytics on student performance and completion rates.",
      status: "soon",
      phase: "Phase 3",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-green-100 text-green-800 border-green-200";
      case "coming": return "bg-blue-100 text-blue-800 border-blue-200";
      case "soon": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "live": return "Live Now";
      case "coming": return "Coming Soon";
      case "soon": return "Phase 3";
      default: return status;
    }
  };

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for{" "}
            <span className="gradient-text">Seamless Internship Management</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to manage UGC-mandated internships efficiently, 
            from registration to certification.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              index={index}
              statusColor={getStatusColor(feature.status)}
              statusText={getStatusText(feature.status)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard: FC<FeatureCardProps & { index: number; statusColor: string; statusText: string }> = ({
  icon,
  title,
  description,
  statusColor,
  statusText,
  index,
}) => {
  return (
    <div 
      className="card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="card-body">
        {/* Icon and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl">{icon}</div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${statusColor}`}>
            {statusText}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};


export default FeaturesSection;