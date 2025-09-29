import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About MovieHub</h1>
          
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              At MovieHub, we believe that great movies deserve to be discovered, shared, and celebrated. 
              Our mission is to create the ultimate platform where movie enthusiasts can explore, rate, 
              and connect over their favorite films from around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">What We Do</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Comprehensive movie database with detailed information</li>
                <li>• Personalized recommendations based on your preferences</li>
                <li>• User reviews and ratings system</li>
                <li>• Advanced search and filtering capabilities</li>
                <li>• Watchlist and favorites management</li>
                <li>• Community features for movie discussions</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Our Values</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Passion:</strong> We love movies as much as you do</li>
                <li>• <strong>Quality:</strong> We strive for excellence in everything we do</li>
                <li>• <strong>Community:</strong> We believe in bringing movie lovers together</li>
                <li>• <strong>Innovation:</strong> We continuously improve our platform</li>
                <li>• <strong>Accessibility:</strong> Movies should be discoverable by everyone</li>
                <li>• <strong>Transparency:</strong> We're honest and open with our users</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-300 mb-4">
              MovieHub was born from a simple idea: what if there was a place where movie lovers could 
              easily discover new films, share their thoughts, and connect with others who share their passion?
            </p>
            <p className="text-gray-300 mb-4">
              Founded in 2024 by a team of movie enthusiasts and technology experts, we've built a platform 
              that combines the power of modern web technology with an intuitive user experience. Our goal 
              is to make movie discovery as enjoyable as watching the movies themselves.
            </p>
            <p className="text-gray-300">
              Today, MovieHub serves thousands of users worldwide, helping them discover their next favorite 
              movie and connect with a global community of film lovers.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p className="text-gray-300 mb-6">
              Whether you're a casual movie watcher or a film aficionado, MovieHub has something for everyone. 
              Join our growing community and start discovering amazing movies today!
            </p>
            <div className="text-center">
              <a 
                href="/signup" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
