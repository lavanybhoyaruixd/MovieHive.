import React from 'react';

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Help Center</h1>
          
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome to MovieHub Help Center</h2>
            <p className="text-gray-300 mb-6">
              We're here to help you get the most out of your MovieHub experience. 
              Find answers to common questions and get support when you need it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
              <p className="text-gray-300">
                Learn how to create an account, browse movies, and start watching your favorite films.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Account & Profile</h3>
              <p className="text-gray-300">
                Manage your account settings, update your profile, and customize your preferences.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Technical Support</h3>
              <p className="text-gray-300">
                Troubleshoot technical issues, browser compatibility, and streaming problems.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
              <p className="text-gray-300">
                Can't find what you're looking for? Reach out to our support team for personalized help.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Need immediate assistance? Contact our support team at{' '}
              <a href="mailto:support@moviehub.com" className="text-blue-400 hover:text-blue-300">
                support@moviehub.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
