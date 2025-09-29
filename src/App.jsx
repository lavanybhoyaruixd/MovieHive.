import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Header from './component/Header';
import Footer from './component/Footer';
import ErrorBoundary from './component/ErrorBoundary';
import Home from './Home';
import MovieDetail from './MovieDetail';
import Profile from './Profile';
import Category from './Category';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Verify from './pages/Verify';
import HelpCenter from './pages/HelpCenter';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import './App.css';
import { FavoritesProvider } from './contexts/FavoritesContext';
import './utils/debugFavorites'; // Import debug utilities
import './utils/verifySetup'; // Import setup verification utilities

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <FavoritesProvider>
        <Router>
          <div className="App">
            <Header />
                      <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/category/:genreId/:genreName" element={<Category />} />
              <Route path="/category/:genreId" element={<Category />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
            <Footer />
          </div>
        </Router>
        </FavoritesProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
