import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const SkillsAndInterests = ({ formData, updateFormData }) => {
  const navigate = useNavigate();
  const [localData, setLocalData] = useState({
    skills: formData.skills || '',
    hackathonsAttended: formData.hackathonsAttended || '',
    experience: formData.experience || '',
  });

  const handleChange = (e) => {
    setLocalData({
      ...localData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    updateFormData(localData);
    navigate('/education');
  };

  const isValid = localData.skills && localData.hackathonsAttended;

  return (
    <Layout progress={28} showBack={true} showNext={true} onNext={handleNext} nextDisabled={!isValid}>
      <div className="pt-8">
        <h1 className="text-4xl font-bold text-white mb-8 tracking-tight text-right font-virgo">
          SKILLS AND INTERESTS
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              Skills <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-400 text-xs mb-3">
              List up to 8 skills you consider yourself proficient at.
            </p>
            <input
              type="text"
              name="skills"
              value={localData.skills}
              onChange={handleChange}
              placeholder="Enter your skills"
              className="input-field"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              Number of hackathons attended <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-400 text-xs mb-3">
              Don't worry if this is your first hackathon; your motivation is what truly matters.
            </p>
            <input
              type="number"
              name="hackathonsAttended"
              value={localData.hackathonsAttended}
              onChange={handleChange}
              placeholder="Enter a number"
              className="input-field"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              Tell us about your experience!
            </label>
            <p className="text-gray-400 text-xs mb-3">
              How was your Hackathon experience? Did you find it meaningful?
            </p>
            <textarea
              name="experience"
              value={localData.experience}
              onChange={handleChange}
              placeholder="Let us know about your journey"
              rows="6"
              className="input-field resize-none"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SkillsAndInterests;