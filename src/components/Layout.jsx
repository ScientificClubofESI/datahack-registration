import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, progress, showBack = false, onBack, showNext = true, onNext, nextText = "Next", nextDisabled = false }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-dark relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: "url('/background.png')",
        }}
      ></div>
      
      <header className="relative z-10 flex justify-between items-center  py-6 px-8 md:px-16">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => (window.location.href = "https://datahack-registration.cse.club/")}
            className="hidden md:flex group relative items-center gap-2 sm:gap-3 text-white/60 hover:text-white text-base sm:text-lg md:text-xl transition-colors duration-300"
          >
            <span className={`transition-transform duration-500 ease-out ${isHovered ? "translate-x-6 sm:translate-x-8" : "translate-x-0"}`}>
              Register Now
            </span>
            <span className={`transition-transform duration-500 ease-out ${isHovered ? "-translate-x-28 sm:-translate-x-36" : "translate-x-0"}`}>
              <svg width="20" height="20" className="sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </button>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-6 pb-8">
        {children}
        
        <div className="mt-6 mb-4">
          <div className="w-full h-6 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#7A3CA5] to-[#1F1A6D] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center pb-4 flex-shrink-0">
          {showBack ? (
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
              </svg>
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {showNext && (
            <button 
              onClick={onNext}
              disabled={nextDisabled}
              className={`flex items-center gap-2 transition-colors ${
                nextDisabled 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {nextText}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Layout;
