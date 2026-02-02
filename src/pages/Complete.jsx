import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Complete = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const formData = location.state?.formData || {};
  const responseData = location.state?.responseData || {};
  
  const hasCreatedTeam = formData.hasTeam === true && formData.teamChoice === 'create';
  const hasJoinedTeam = formData.hasTeam === true && formData.teamChoice === 'join';
  const hasTeam = formData.hasTeam === true;

  return (
    <div className="min-h-screen bg-dark relative overflow-hidden flex flex-col">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.png')",
        }}
      ></div>
      
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center py-6 px-8 md:px-16">
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
            onClick={() => (window.location.href = "https://datahack-3.0.cse.club/")}
            className="hidden md:flex group relative items-center gap-2 sm:gap-3 text-white/60 hover:text-white text-base sm:text-lg md:text-xl transition-colors duration-300"
          >
            <span className={`transition-transform duration-500 ease-out ${isHovered ? "translate-x-6 sm:translate-x-8" : "translate-x-0"}`}>
             Home
            </span>
            <span className={`transition-transform duration-500 ease-out ${isHovered ? "-translate-x-28 sm:-translate-x-26" : "translate-x-0"}`}>
              <svg width="20" height="20" className="sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </button>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl w-full">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center">
              <svg width="48" height="48" fill="none" stroke="#E2BFFD" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-virgo text-[#E2BFFD] mb-6 tracking-tight">
            REGISTRATION COMPLETE
          </h1>

          {/* Message */}
          <div className="space-y-4 text-gray-300">
            <p className="text-lg">
              Congratulations, You have successfully completed your registration!
            </p>
            <p className="text-base">
              You will receive an email confirming whether your application has been accepted or declined.
            </p>
          </div>

          {/* Team Code Display - Show if user created or joined a team */}
          {hasTeam && responseData.teamCode && (
            <div className="mt-8 p-6 bg-gray-800/30 border border-gray-700/50 rounded-lg text-left max-w-xl mx-auto">
              <div className="flex items-start gap-3 mb-4">
                <div className="mt-1">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4M12 8h.01"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">
                    {hasCreatedTeam ? 'Your Team Code' : 'Team Information'}
                  </h3>
                  {hasCreatedTeam && (
                    <p className="text-sm text-gray-300 mb-3">
                      A code has been sent to your email address that will allow your team-mates to join your team.
                    </p>
                  )}
                  {hasJoinedTeam && (
                    <p className="text-sm text-gray-300 mb-3">
                      You have successfully joined the team!
                    </p>
                  )}
                  <div className="mt-4 p-4 bg-gray-900/50 rounded border border-gray-700/30">
                    <div className="mb-2">
                      <span className="text-xs text-gray-400">Team Code:</span>
                      <p className="text-xl font-mono font-bold text-[#E2BFFD] mt-1">
                        {responseData.teamCode}
                      </p>
                    </div>
                    {responseData.teamName && (
                      <div>
                        <span className="text-xs text-gray-400">Team Name:</span>
                        <p className="text-lg text-white mt-1">
                          {responseData.teamName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress bar */}
          <div className="mt-12 mb-8 max-w-xl mx-auto">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-1000 ease-out"
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complete;
