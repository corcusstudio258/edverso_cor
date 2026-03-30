// components/sections/HeroSection.tsx
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                🎓 UGC Mandated Internship Program As Per NEP 2020
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Digital Key to{" "}
                <span className="gradient-text">Your Internship Journey</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Streamlined platform for UGC-mandated internships. Register,
                learn, and get certified seamlessly. Join thousands of students
                and colleges across India.
              </p>
            </div>

            {/* 🔔 Notification Box */}
            <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-lg p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="text-2xl animate-bounce">📢</div>
                <div>
                  <h3 className="text-base font-semibold text-yellow-800">
                    Internship Classes Notification
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1 leading-relaxed">
                    इंटर्नशिप के तृतीय बैच के लिए पंजीकरण की तिथि आगामी सेमेस्टर-V परीक्षा के कारण बढ़ाकर 10.12.2025 कर दी गई है।
कृपया निर्धारित तिथि तक पंजीकरण की प्रक्रिया पूरी कर लें, ताकि फिजिकल क्लासेस जल्द से जल्द प्रारम्भ की जा सकें
                    <br/>
                    कृपया ध्यान दें कि पंजीकरण की तिथि के दस दिन बाद ही प्रमाणपत्र जारी किया जाएगा।
इसलिए जितना जल्द पंजीकरण होगा, उतनी ही जल्दी प्रमाणपत्र जारी किया जा सकेगा
                    <br />
                  </p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <Metric value="10K+" label="Students Certified" />
              <Metric value="100+" label="Partner Colleges" />
              <Metric value="99%" label="Success Rate" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="btn btn-primary text-lg px-8 py-4"
              >
                Start Your Internship Journey
              </Link>
              <Link
                href="#features"
                className="btn btn-secondary text-lg px-8 py-4"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">
                      Internship Certificate
                    </h3>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      🎓
                    </div>
                  </div>
                  <p className="text-blue-100">
                    Complete your 30-day internship and receive UGC-compliant
                    certification
                  </p>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-sm">Status: Ready</span>
                    <span className="text-sm">Duration: 30 Days/120 Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Metric: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export default HeroSection;
