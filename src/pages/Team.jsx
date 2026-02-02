import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { submitRegistration } from '../services/api';

const Team = ({ formData, updateFormData }) => {
  const navigate = useNavigate();
  const [localData, setLocalData] = useState({
    hasTeam: formData.hasTeam,
    teamChoice: formData.teamChoice,
    teamName: formData.teamName || '',
    teamCode: formData.teamCode || '',
    additionalInfo: formData.additionalInfo || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setLocalData({
      ...localData,
      [e.target.name]: e.target.value
    });
    // Clear error when user makes changes
    if (error) setError(null);
  };

  const handleTeamSelection = (value) => {
    setLocalData({
      ...localData,
      hasTeam: value,
      teamChoice: null,
      teamName: '',
      teamCode: '',
    });
    if (error) setError(null);
  };

  const handleTeamChoice = (choice) => {
    setLocalData({
      ...localData,
      teamChoice: choice,
      teamName: '',
      teamCode: '',
    });
    if (error) setError(null);
  };

  const handleRegister = async () => {
    // Update form data with local team data
    updateFormData(localData);
    const completeFormData = { ...formData, ...localData };
    
    // Validate team-specific fields
    if (!isValid()) {
      setError('Please fill in all required team fields');
      return;
    }

    // Comprehensive validation - check all required fields
    const validationErrors = [];
    
    // Basic Details
    if (!completeFormData.firstName) validationErrors.push('First name');
    if (!completeFormData.lastName) validationErrors.push('Last name');
    if (!completeFormData.email) validationErrors.push('Email');
    if (!completeFormData.phoneNumber) validationErrors.push('Phone number');
    
    // Skills
    if (!completeFormData.skills) validationErrors.push('Skills');
    if (!completeFormData.hackathonsAttended) validationErrors.push('Number of hackathons attended');
    
    // Education
    if (!completeFormData.university) validationErrors.push('University');
    if (!completeFormData.major) validationErrors.push('Major');
    if (!completeFormData.degree) validationErrors.push('Degree');
    if (!completeFormData.graduationYear) validationErrors.push('Graduation year');
    
    // Links
    if (!completeFormData.cv || (typeof completeFormData.cv === 'string' && !completeFormData.cv.startsWith('data:'))) {
     validationErrors.push('CV');
    }    
    if (!completeFormData.github) validationErrors.push('Github');
    if (!completeFormData.kaggle) validationErrors.push('Kaggle');
    if (!completeFormData.linkedin) validationErrors.push('LinkedIn');
    
    // Motivation
    if (!completeFormData.howHeard) validationErrors.push('How you heard about DATAHACK');
    if (!completeFormData.motivation) validationErrors.push('Motivation');
    
    if (validationErrors.length > 0) {
      setError(`Please fill in all required fields: ${validationErrors.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Submit to backend
      const result = await submitRegistration(completeFormData);

      if (result.success) {
        // Navigate to complete page with response data
        navigate('/complete', { 
          state: { 
            formData: completeFormData,
            responseData: result.data 
          } 
        });
      } else {
        // Show error message
        setError(result.error);
        setIsSubmitting(false);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const isValid = () => {
    if (localData.hasTeam === null) return false;
    if (localData.hasTeam === false) return true;
    if (localData.teamChoice === null) return false;
    if (localData.teamChoice === 'create' && !localData.teamName) return false;
    if (localData.teamChoice === 'join' && !localData.teamCode) return false;
    return true;
  };

  return (
    <Layout 
      progress={85} 
      showBack={true} 
      showNext={true} 
      onNext={handleRegister} 
      nextText={isSubmitting ? "Registering..." : "Register"}
      nextDisabled={!isValid() || isSubmitting}
    >
      <div className="pt-8">
        <h1 className="text-5xl font-bold text-white mb-8 tracking-tight text-right font-virgo">
          TEAM
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block mb-4 text-sm" style={{ color: '#E2BFFD' }}>
              Do you have a team? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => handleTeamSelection(true)}
                disabled={isSubmitting}
                className={`px-8 py-2 rounded-lg font-medium transition-all ${
                  localData.hasTeam === true
                    ? 'bg-white text-dark'
                    : 'bg-gray-800/50 border border-gray-700/50 text-white hover:bg-gray-700/50'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                YES
              </button>
              <button
                onClick={() => handleTeamSelection(false)}
                disabled={isSubmitting}
                className={`px-8 py-2 rounded-lg font-medium transition-all ${
                  localData.hasTeam === false
                    ? 'bg-white text-dark'
                    : 'bg-gray-800/50 border border-gray-700/50 text-white hover:bg-gray-700/50'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                NO
              </button>
            </div>
          </div>

          {localData.hasTeam === true && (
            <>
              <div>
                <label className="block mb-4 text-sm" style={{ color: '#E2BFFD' }}>
                  Do you want to join your team or create a spot for your team? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleTeamChoice('join')}
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      localData.teamChoice === 'join'
                        ? 'bg-white text-dark'
                        : 'bg-gray-800/50 border border-gray-700/50 text-white hover:bg-gray-700/50'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Join Your Team
                  </button>
                  <button
                    onClick={() => handleTeamChoice('create')}
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      localData.teamChoice === 'create'
                        ? 'bg-white text-dark'
                        : 'bg-gray-800/50 border border-gray-700/50 text-white hover:bg-gray-700/50'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Create a Team
                  </button>
                </div>
              </div>

              {localData.teamChoice === 'create' && (
                <div>
                  <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
                    Team Name <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-400 text-xs mb-3">
                    Your team's name must be unique and cannot contain any spaces.
                  </p>
                  <input
                    type="text"
                    name="teamName"
                    value={localData.teamName}
                    onChange={handleChange}
                    placeholder="Enter your team's name"
                    className="input-field"
                    disabled={isSubmitting}
                  />
                </div>
              )}

              {localData.teamChoice === 'join' && (
                <div>
                  <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
                    Team Code <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-400 text-xs mb-3">
                    Please enter the team code that was sent to the person who created the team.
                  </p>
                  <input
                    type="text"
                    name="teamCode"
                    value={localData.teamCode}
                    onChange={handleChange}
                    placeholder="Enter your team's code"
                    className="input-field"
                    disabled={isSubmitting}
                  />
                </div>
              )}
            </>
          )}

          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              Anything to add
            </label>
            <textarea
              name="additionalInfo"
              value={localData.additionalInfo}
              onChange={handleChange}
              placeholder="Your answer here . . ."
              rows="6"
              className="input-field resize-none"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Team;