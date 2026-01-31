import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Motivation = ({ formData, updateFormData }) => {
  const navigate = useNavigate();
  const [localData, setLocalData] = useState({
    howHeard: formData.howHeard || '',
    motivation: formData.motivation || '',
  });

  const handleChange = (e) => {
    setLocalData({
      ...localData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    updateFormData(localData);
    navigate('/team');
  };

  const isValid = localData.howHeard && localData.motivation;

  return (
    <Layout progress={70} showBack={true} showNext={true} onNext={handleNext} nextDisabled={!isValid}>
      <div className="pt-8">
        <h1 className="text-5xl font-bold text-white mb-8 tracking-tight text-right font-virgo">
          MOTIVATION
        </h1>
        <div className="space-y-6">
          <div>
            <label className="block mb-4 text-sm" style={{ color: '#E2BFFD' }}>
              How did you hear about DATAHACK? <span className="text-red-500">*</span>
            </label>
            <textarea
              name="howHeard"
              value={localData.howHeard}
              onChange={handleChange}
              placeholder="Your answer here . . ."
              rows="4"
              className="input-field resize-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              What motivates you the most to participate in DATAHACK? <span className="text-red-500">*</span>
            </label>
            <textarea
              name="motivation"
              value={localData.motivation}
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

export default Motivation;