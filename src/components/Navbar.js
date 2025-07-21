import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ scrollToSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setMenuOpen(false);
  };

  // Include 'diseases' and 'contact' for routing
  const sections = ['home', 'why-adopt', 'share-story', 'stories', 'diseases', 'contact','DailyUpdates'];

  const renderLabel = (text) =>
    text
      .replace("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🐾</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
              Paw Stories
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {sections.map((section) =>
              section === "contact" ? (
                <Link
                  to="/pet-centers"
                  key={section}
                  className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  {renderLabel(section)}
                </Link>
              ) : section === "diseases" ? (
                <Link
                  to="/search-diseases"
                  key={section}
                  className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  {renderLabel(section)}
                </Link>
              ) : section === "DailyUpdates" ? (
                <Link
                  to="/animal-news"
                  key={section}
                  className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  {renderLabel(section)}
                </Link>
              ) : (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  {renderLabel(section)}
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-pink-500 transition-all"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white rounded-xl shadow-md px-4 py-4 space-y-4">
            {sections.map((section) =>
              section === "contact" ? (
                <Link
                  to="/pet-centers"
                  key={section}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-left text-gray-700 hover:text-pink-500 font-medium"
                >
                  {renderLabel(section)}
                </Link>
              ) : section === "diseases" ? (
                <Link
                  to="/search-diseases"
                  key={section}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-left text-gray-700 hover:text-pink-500 font-medium"
                >
                  {renderLabel(section)}
                </Link>
              ) : section==="DailyUpdates"? (
                <Link
                to=""
                key={section}
                onClick={() => setMenuOpen(false)}
                 className="block w-full text-left text-gray-700 hover:text-pink-500 font-medium"
                 >
                   {renderLabel(section)}
                 </Link>
              ):
                (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className="block w-full text-left text-gray-700 hover:text-pink-500 font-medium"
                >
                  {renderLabel(section)}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
