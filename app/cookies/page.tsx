/* eslint-disable react/no-unescaped-entities */
// app/cookies/page.tsx
"use client"



export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cookies Policy
          </h1>
          <p className="text-lg text-gray-600">
            Understanding how we use cookies to improve your learning experience
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your device (computer, tablet, or mobile) 
                when you visit our website. They help us provide you with a better experience by:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Remembering your preferences and login status</li>
                <li>Understanding how you use our platform</li>
                <li>Improving platform performance and security</li>
                <li>Personalizing your learning experience</li>
              </ul>
            </section>

            {/* Types of Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Essential Cookies</h3>
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <p className="text-green-800 font-medium mb-2">Required for platform operation</p>
                <ul className="list-disc list-inside text-green-700 text-sm space-y-1">
                  <li>Authentication and login sessions</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing and performance</li>
                  <li>Cannot be disabled</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Functional Cookies</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-blue-800 font-medium mb-2">Enhance user experience</p>
                <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
                  <li>Remembering language preferences</li>
                  <li>Course progress tracking</li>
                  <li>UI customization settings</li>
                  <li>Can be disabled in browser settings</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Analytics Cookies</h3>
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <p className="text-purple-800 font-medium mb-2">Help us improve our platform</p>
                <ul className="list-disc list-inside text-purple-700 text-sm space-y-1">
                  <li>Understanding user behavior</li>
                  <li>Platform performance monitoring</li>
                  <li>Feature usage statistics</li>
                  <li>All data is anonymized</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.4 Third-Party Cookies</h3>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-orange-800 font-medium mb-2">From trusted service providers</p>
                <ul className="list-disc list-inside text-orange-700 text-sm space-y-1">
                  <li>Payment processing (Razorpay, Stripe)</li>
                  <li>Video hosting and streaming</li>
                  <li>Customer support services</li>
                  <li>Email communication tools</li>
                </ul>
              </div>
            </section>

            {/* Specific Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Specific Cookies We Use</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 rounded-lg">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold text-gray-700">Cookie Name</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Purpose</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Duration</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 text-gray-700 font-mono text-sm">auth_token</td>
                      <td className="p-4 text-gray-700">Maintains your login session</td>
                      <td className="p-4 text-gray-700">Session</td>
                      <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Essential</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 text-gray-700 font-mono text-sm">course_progress</td>
                      <td className="p-4 text-gray-700">Tracks your learning progress</td>
                      <td className="p-4 text-gray-700">1 year</td>
                      <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Functional</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 text-gray-700 font-mono text-sm">user_preferences</td>
                      <td className="p-4 text-gray-700">Stores your UI settings</td>
                      <td className="p-4 text-gray-700">6 months</td>
                      <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Functional</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 text-gray-700 font-mono text-sm">_ga</td>
                      <td className="p-4 text-gray-700">Google Analytics - usage statistics</td>
                      <td className="p-4 text-gray-700">2 years</td>
                      <td className="p-4"><span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Analytics</span></td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700 font-mono text-sm">_gid</td>
                      <td className="p-4 text-gray-700">Google Analytics - session tracking</td>
                      <td className="p-4 text-gray-700">24 hours</td>
                      <td className="p-4"><span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Analytics</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Cookie Management */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Managing Cookies</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Browser Settings</h3>
              <p className="text-gray-700 mb-4">
                You can control cookies through your browser settings. However, disabling essential 
                cookies may affect platform functionality:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and data stored</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Platform Cookie Controls</h3>
              <p className="text-gray-700 mb-4">
                We provide granular control over non-essential cookies through our cookie preference center:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Cookie Preferences:</strong> You can manage your cookie preferences at any time 
                  by clicking the "Cookie Settings" link in our website footer.
                </p>
              </div>
            </section>

            {/* Data Protection */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Protection</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>All cookie data is encrypted and secured</li>
                <li>Analytics data is anonymized and aggregated</li>
                <li>We don't use cookies to track you across other websites</li>
                <li>Cookie data is not shared with unauthorized third parties</li>
                <li>We comply with data protection regulations including Indian IT Act</li>
              </ul>
            </section>

            {/* Updates */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Updates to This Policy</h2>
              <p className="text-gray-700">
                We may update this Cookies Policy to reflect changes in technology, 
                legislation, or our services. We will notify users of significant changes 
                through platform notifications or email.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">
                  For questions about our use of cookies or to update your preferences:
                </p>
                <p className="text-gray-700"><strong>Email:</strong> privacy@edverso.in</p>
                <p className="text-gray-700"><strong>Subject:</strong> Cookie Policy Inquiry</p>
                <p className="text-gray-700 text-sm mt-2">
                  We respond to all cookie-related inquiries within 7 working days.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Cookie Actions */}
        <div className="mt-8 mx-auto gap-4">
          
          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Contact our privacy team for cookie-related questions
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}