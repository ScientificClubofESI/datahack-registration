import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Team = ({ formData, updateFormData }) => {
  const navigate = useNavigate();
  const [localData, setLocalData] = useState({
    hasTeam: formData.hasTeam,
    teamChoice: formData.teamChoice,
    teamName: formData.teamName || '',
    teamCode: formData.teamCode || '',
    additionalInfo: formData.additionalInfo || '',
  });

  const handleChange = (e) => {
    setLocalData({
      ...localData,
      [e.target.name]: e.target.value
    });
  };

  const handleTeamSelection = (value) => {
    setLocalData({
      ...localData,
      hasTeam: value,
      teamChoice: null,
      teamName: '',
      teamCode: '',
    });
  };

  const handleTeamChoice = (choice) => {
    setLocalData({
      ...localData,
      teamChoice: choice,
      teamName: '',
      teamCode: '',
    });
  };

const handleRegister = () => {
  updateFormData(localData);
  const completeFormData = { ...formData, ...localData };
  console.log('Form submitted:', completeFormData);
  navigate('/complete', { state: { formData: completeFormData } });
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
      nextText="Register"
      nextDisabled={!isValid()}
    >
      <div className="pt-8">
        <h1 className="text-5xl font-bold text-white mb-8 tracking-tight text-right font-virgo">
          TEAM
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block mb-4 text-sm" style={{ color: '#E2BFFD' }}>
              Do you have a team? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => handleTeamSelection(true)}
                className={`px-8 py-2 rounded-lg font-medium transition-all ${
                  localData.hasTeam === true
                    ? 'bg-white text-dark'
                    : 'bg-gray-800/50 border border-gray-700/50 text-white hover:bg-gray-700/50'
                }`}
              >
                YES
              </button>
              <button
                onClick={() => handleTeamSelection(false)}
                className={`px-8 py-2 rounded-lg font-medium transition-all ${
                  localData.hasTeam === false
                    ? 'bg-white text-dark'
                    : 'bg-gray-800/50 border border-gray-700/50 text-white hover:bg-gray-700/50'
                }`}
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
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      localData.teamChoice === 'join'
                        ? 'bg-white text-dark'
                        : 'bg-gray-800/50 border border-gray-700/50 text-white hover:bg-gray-700/50'
                    }`}
                  >
                    Join Your Team
                  </button>
                  <button
                    onClick={() => handleTeamChoice('create')}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      localData.teamChoice === 'create'
                        ? 'bg-white text-dark'
                        : 'bg-gray-800/50 border border-gray-700/50 text-white hover:bg-gray-700/50'
                    }`}
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
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Team;