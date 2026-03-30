// app/register/CollegeRegistration.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CollegeFormData {
  collegeName: string;
  university: string;
  collegeType: string;
  email: string;
  phone: string;
  contactPerson: string;
  designation: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  numberOfStudents: string;
  message: string;
}

export default function CollegeRegistration() {
  const [formData, setFormData] = useState<CollegeFormData>({
    collegeName: '',
    university: '',
    collegeType: '',
    email: '',
    phone: '',
    contactPerson: '',
    designation: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    numberOfStudents: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Redirect after success
      toast.success('Partnership request sent successfully!');
      setTimeout(() => {
        router.push('/partnership-success');
      }, 2000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Partnership Request Sent!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your interest in partnering with us. Our team will contact you within 24 hours.
        </p>
        <div className="animate-pulse text-blue-600 font-semibold">
          Redirecting to confirmation page...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">College Partnership</h3>
        <p className="text-gray-600">
          Partner with us to streamline UGC-mandated internships for your students
        </p>
        <div className="mt-4 bg-green-50 rounded-lg p-4 inline-flex items-center space-x-2">
          <span className="text-green-600 font-semibold">Zero Setup Cost</span>
          <span className="text-green-500 text-sm">Free for partner colleges</span>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <BenefitItem text="Bulk student onboarding" />
        <BenefitItem text="Dedicated college dashboard" />
        <BenefitItem text="Automated certificate generation" />
        <BenefitItem text="Real-time progress tracking" />
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* College Name */}
          <div>
            <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-2">
              College Name *
            </label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              required
              value={formData.collegeName}
              onChange={handleChange}
              className="input"
              placeholder="Enter college name"
            />
          </div>

          {/* University */}
          <div>
            <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
              Affiliated University *
            </label>
            <input
              type="text"
              id="university"
              name="university"
              required
              value={formData.university}
              onChange={handleChange}
              className="input"
              placeholder="Enter university name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* College Type */}
          <div>
            <label htmlFor="collegeType" className="block text-sm font-medium text-gray-700 mb-2">
              College Type *
            </label>
            <select
              id="collegeType"
              name="collegeType"
              required
              value={formData.collegeType}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Type</option>
              <option value="government">Government College</option>
              <option value="private">Private College</option>
              <option value="deemed">Deemed University</option>
              <option value="iit">IIT</option>
              <option value="nit">NIT</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Number of Students */}
          <div>
            <label htmlFor="numberOfStudents" className="block text-sm font-medium text-gray-700 mb-2">
              Approx. Students/Year *
            </label>
            <select
              id="numberOfStudents"
              name="numberOfStudents"
              required
              value={formData.numberOfStudents}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Range</option>
              <option value="1-100">1-100</option>
              <option value="101-500">101-500</option>
              <option value="501-1000">501-1000</option>
              <option value="1001-2000">1001-2000</option>
              <option value="2000+">2000+</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Person */}
          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person *
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              required
              value={formData.contactPerson}
              onChange={handleChange}
              className="input"
              placeholder="Full name of contact person"
            />
          </div>

          {/* Designation */}
          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
              Designation *
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              required
              value={formData.designation}
              onChange={handleChange}
              className="input"
              placeholder="e.g., HOD, Placement Officer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Official Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="official@college.edu"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="input"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            College Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="input"
            placeholder="Enter full address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="input"
              placeholder="Enter city"
            />
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="input"
              placeholder="Enter state"
            />
          </div>

          {/* Pincode */}
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
              Pincode *
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              required
              value={formData.pincode}
              onChange={handleChange}
              className="input"
              placeholder="Enter pincode"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="input resize-none"
            placeholder="Any specific requirements or questions..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn bg-green-600 hover:bg-green-700 text-white w-full py-4 text-lg font-semibold relative overflow-hidden group"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting Request...</span>
            </div>
          ) : (
            <>
              <span className="relative z-10">Request Partnership</span>
              <div className="absolute inset-0 bg-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
            </>
          )}
        </button>

        {/* Contact Info */}
        <div className="text-center text-sm text-gray-600">
          Our partnership team will contact you within 24 hours. <br/> For immediate assistance, call{" "}
          <span className="font-semibold text-blue-600">+91-9341041274</span>
        </div>
      </form>
    </div>
  );
}

const BenefitItem: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex items-center space-x-3 text-gray-700">
      <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
        ✓
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
};