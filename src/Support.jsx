import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShinyText from './component/ShinyText';
import './Support.css';

const Support = () => {
  const [activeSection, setActiveSection] = useState('help-center');
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "How do I search for movies?",
      answer: "You can search for movies using the search bar on the homepage. Simply type the movie title, actor name, or any keyword related to the movie you're looking for."
    },
    {
      id: 2,
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button in the header, fill in your email and password, then verify your email address through the verification link sent to your inbox."
    },
    {
      id: 3,
      question: "Can I watch movies on this platform?",
      answer: "MovieHub is a movie discovery platform that helps you find information about movies, including ratings, cast, trailers, and recommendations. We don't stream movies directly."
    },
    {
      id: 4,
      question: "How do I view movie details?",
      answer: "Click on any movie card to view detailed information including plot summary, cast, ratings, release date, and more."
    },
    {
      id: 5,
      question: "How do I browse movies by genre?",
      answer: "On the homepage, you can see different movie categories. Click on any genre to browse movies in that specific category."
    },
    {
      id: 6,
      question: "Is MovieHub free to use?",
      answer: "Yes, MovieHub is completely free to use. You can browse movies, view details, and get recommendations without any cost."
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const renderHelpCenter = () => (
    <div className="support-section">
      <h2>Help Center</h2>
      <div className="help-cards">
        <div className="help-card">
          <div className="help-icon">🔍</div>
          <h3>Getting Started</h3>
          <p>Learn how to navigate MovieHub and discover your favorite movies</p>
          <ul>
            <li>How to search for movies</li>
            <li>Creating your account</li>
            <li>Browsing by categories</li>
            <li>Viewing movie details</li>
          </ul>
        </div>
        
        <div className="help-card">
          <div className="help-icon">👤</div>
          <h3>Account & Profile</h3>
          <p>Manage your account settings and profile information</p>
          <ul>
            <li>Creating and managing accounts</li>
            <li>Profile customization</li>
            <li>Password reset</li>
            <li>Account security</li>
          </ul>
        </div>
        
        <div className="help-card">
          <div className="help-icon">🎬</div>
          <h3>Movie Features</h3>
          <p>Explore all the features available for movie discovery</p>
          <ul>
            <li>Movie recommendations</li>
            <li>Trailer viewing</li>
            <li>Cast information</li>
            <li>Rating and reviews</li>
          </ul>
        </div>
        
        <div className="help-card">
          <div className="help-icon">📱</div>
          <h3>Technical Support</h3>
          <p>Get help with technical issues and troubleshooting</p>
          <ul>
            <li>Browser compatibility</li>
            <li>Loading issues</li>
            <li>Performance problems</li>
            <li>Contact support</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="support-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqData.map((faq) => (
          <div key={faq.id} className="faq-item">
            <button 
              className="faq-question"
              onClick={() => toggleFaq(faq.id)}
            >
              <span>{faq.question}</span>
              <span className={`faq-icon ${openFaq === faq.id ? 'open' : ''}`}>+</span>
            </button>
            {openFaq === faq.id && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacyPolicy = () => (
    <div className="support-section">
      <h2>Privacy Policy</h2>
      <div className="policy-content">
        <div className="policy-section">
          <h3>Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
          <ul>
            <li>Account information (email address, password)</li>
            <li>Usage data (movies viewed, search queries)</li>
            <li>Device information (browser type, IP address)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </div>

        <div className="policy-section">
          <h3>How We Use Your Information</h3>
          <p>We use the information we collect to provide, maintain, and improve our services:</p>
          <ul>
            <li>Provide movie recommendations and personalized content</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
          </ul>
        </div>

        <div className="policy-section">
          <h3>Information Sharing</h3>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
        </div>

        <div className="policy-section">
          <h3>Data Security</h3>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        </div>

        <div className="policy-section">
          <h3>Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@moviehub.com</p>
        </div>
      </div>
    </div>
  );

  const renderTermsOfService = () => (
    <div className="support-section">
      <h2>Terms of Service</h2>
      <div className="policy-content">
        <div className="policy-section">
          <h3>Acceptance of Terms</h3>
          <p>By accessing and using MovieHub, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </div>

        <div className="policy-section">
          <h3>Use License</h3>
          <p>Permission is granted to temporarily download one copy of MovieHub for personal, non-commercial transitory viewing only.</p>
        </div>

        <div className="policy-section">
          <h3>User Accounts</h3>
          <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
        </div>

        <div className="policy-section">
          <h3>Prohibited Uses</h3>
          <p>You may not use our service:</p>
          <ul>
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
          </ul>
        </div>

        <div className="policy-section">
          <h3>Content</h3>
          <p>Our service allows you to view movie information, trailers, and related content. This content is provided by third-party sources and is subject to their respective terms and conditions.</p>
        </div>

        <div className="policy-section">
          <h3>Disclaimer</h3>
          <p>The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms.</p>
        </div>

        <div className="policy-section">
          <h3>Contact Information</h3>
          <p>If you have any questions about these Terms of Service, please contact us at legal@moviehub.com</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'help-center':
        return renderHelpCenter();
      case 'faq':
        return renderFAQ();
      case 'privacy':
        return renderPrivacyPolicy();
      case 'terms':
        return renderTermsOfService();
      default:
        return renderHelpCenter();
    }
  };

  return (
    <div className="support">
      <div className="support-header">
        <div className="container">
          <Link to="/" className="back-btn">
            ← Back to Home
          </Link>
          <h1 className="support-title">
            <ShinyText text="Support Center" speed={4} />
          </h1>
          <p className="support-description">
            Get help, find answers, and learn more about MovieHub
          </p>
        </div>
      </div>

      <div className="container">
        <div className="support-layout">
          <div className="support-sidebar">
            <nav className="support-nav">
              <button 
                className={`support-nav-item ${activeSection === 'help-center' ? 'active' : ''}`}
                onClick={() => setActiveSection('help-center')}
              >
                <span className="nav-icon">🏠</span>
                Help Center
              </button>
              <button 
                className={`support-nav-item ${activeSection === 'faq' ? 'active' : ''}`}
                onClick={() => setActiveSection('faq')}
              >
                <span className="nav-icon">❓</span>
                FAQ
              </button>
              <button 
                className={`support-nav-item ${activeSection === 'privacy' ? 'active' : ''}`}
                onClick={() => setActiveSection('privacy')}
              >
                <span className="nav-icon">🔒</span>
                Privacy Policy
              </button>
              <button 
                className={`support-nav-item ${activeSection === 'terms' ? 'active' : ''}`}
                onClick={() => setActiveSection('terms')}
              >
                <span className="nav-icon">📋</span>
                Terms of Service
              </button>
            </nav>
          </div>

          <div className="support-main">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
