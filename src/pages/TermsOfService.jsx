import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
          
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <p className="text-gray-300 text-center mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-300 text-center">
              These Terms of Service govern your use of MovieHub and our services.
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <div className="text-gray-300 space-y-3">
                <p>By accessing and using MovieHub, you accept and agree to be bound by the terms and provision of this agreement.</p>
                <p>If you do not agree to abide by the above, please do not use this service.</p>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Use License</h2>
              <div className="text-gray-300 space-y-3">
                <p>Permission is granted to temporarily use MovieHub for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
              <div className="text-gray-300 space-y-3">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
                <p>You are responsible for safeguarding the password and for all activities that occur under your account.</p>
                <p>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
              <div className="text-gray-300 space-y-3">
                <p>You may not use our service:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Content</h2>
              <div className="text-gray-300 space-y-3">
                <p>Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material.</p>
                <p>You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness.</p>
                <p>We reserve the right to remove content that violates these terms or is otherwise objectionable.</p>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
              <div className="text-gray-300 space-y-3">
                <p>The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Excludes all representations and warranties relating to this website and its contents</li>
                  <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
                </ul>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <div className="text-gray-300 space-y-3">
                <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <div className="text-gray-300 space-y-3">
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p>
                <p>If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
              </div>
            </section>

            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="text-gray-300 space-y-3">
                <p>If you have any questions about these Terms of Service, please contact us at:</p>
                <p>Email: <a href="mailto:legal@moviehub.com" className="text-blue-400 hover:text-blue-300">legal@moviehub.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
