/* eslint-disable react/no-unescaped-entities */
// components/sections/CTASection.tsx
import { FC } from "react";
import Link from "next/link";

const CTASection: FC = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-gray-900 to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your{" "}
              <span className="text-blue-300">Internship Program?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students and colleges already using our platform 
              for UGC-mandated internship management and certification.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-white font-semibold mb-6 text-lg">
              Trusted by Educational Institutions Across India
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80">
              <TrustItem icon="🎯" text="UGC Compliant" />
              <TrustItem icon="🔒" text="Secure & Reliable" />
              <TrustItem icon="⚡" text="Instant Processing" />
              <TrustItem icon="📞" text="Dedicated Support" />
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 mb-6">
              Have questions? We're here to help you get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn bg-transparent border border-gray-600 text-white hover:bg-white/10 px-8 py-3 transition-all duration-200"
              >
                Contact Sales
              </Link>
              <Link
                href="/contact"
                className="btn bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 transition-all duration-200 hover:scale-105"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustItem: FC<{ icon: string; text: string }> = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-white text-sm font-medium">{text}</div>
    </div>
  );
};

export default CTASection;