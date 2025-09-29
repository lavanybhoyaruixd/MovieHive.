import React, { useState } from 'react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button in the top right corner, fill in your details, and verify your email address to get started."
    },
    {
      question: "Is MovieHub free to use?",
      answer: "Yes, MovieHub is completely free to use. You can browse movies, read reviews, and create your own watchlists without any cost."
    },
    {
      question: "How do I search for movies?",
      answer: "Use the search bar at the top of the page to find movies by title, genre, or keywords. You can also browse by categories."
    },
    {
      question: "Can I save movies to watch later?",
      answer: "Yes! You can add movies to your watchlist by clicking the heart icon on any movie card. Access your watchlist from your profile page."
    },
    {
      question: "How do I update my profile?",
      answer: "Go to your profile page and click the 'Edit Profile' button to update your information, preferences, and profile picture."
    },
    {
      question: "What if I forget my password?",
      answer: "Click on 'Forgot Password' on the login page and enter your email address. We'll send you a link to reset your password."
    },
    {
      question: "Can I rate and review movies?",
      answer: "Currently, you can rate movies using our star rating system. Full review functionality is coming soon!"
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team at support@moviehub.com or visit our Help Center for more assistance options."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
          
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <p className="text-gray-300 text-center">
              Find answers to the most common questions about MovieHub. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700 transition-colors"
                  onClick={() => toggleItem(index)}
                >
                  <span className="font-semibold text-lg">{item.question}</span>
                  <span className="text-2xl font-light">
                    {openItems[index] ? '−' : '+'}
                  </span>
                </button>
                {openItems[index] && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Still have questions? Contact us at{' '}
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

export default FAQ;
