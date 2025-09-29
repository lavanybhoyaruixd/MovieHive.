import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <p className="text-gray-300 text-center mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-300 text-center">
              This Privacy Policy describes how MovieHub collects, uses, and protects your information.
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <div className="text-gray-300 space-y-3">
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Create an account or profile</li>
                  <li>Search for movies or browse our content</li>
                  <li>Rate or review movies</li>
                  <li>Contact us for support</li>
                </ul>
                <p>This may include your name, email address, and movie preferences.</p>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <div className="text-gray-300 space-y-3">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Provide and maintain our service</li>
                  <li>Personalize your movie recommendations</li>
                  <li>Communicate with you about updates and features</li>
                  <li>Improve our service and user experience</li>
                  <li>Respond to your inquiries and provide support</li>
                </ul>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
              <div className="text-gray-300 space-y-3">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist us in operating our platform</li>
                </ul>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <div className="text-gray-300 space-y-3">
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                <p>However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <div className="text-gray-300 space-y-3">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <div className="text-gray-300 space-y-3">
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p>Email: <a href="mailto:privacy@moviehub.com" className="text-blue-400 hover:text-blue-300">privacy@moviehub.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
