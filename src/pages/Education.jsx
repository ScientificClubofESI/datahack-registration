import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Education = ({ formData, updateFormData }) => {
  const navigate = useNavigate();
  const [localData, setLocalData] = useState({
    university: formData.university || '',
    major: formData.major || '',
    degree: formData.degree || '',
    graduationYear: formData.graduationYear || '',
  });
  const [showOtherUniversity, setShowOtherUniversity] = useState(
    formData.university && 
    !['ESI', 'USTHB', 'ENP', 'UMMTO','ENSIA'].includes(formData.university)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'university') {
      if (value === 'Other') {
        setShowOtherUniversity(true);
        setLocalData({
          ...localData,
          university: ''
        });
      } else {
        setShowOtherUniversity(false);
        setLocalData({
          ...localData,
          university: value
        });
      }
    } else {
      setLocalData({
        ...localData,
        [name]: value
      });
    }
  };

  const handleNext = () => {
    updateFormData(localData);
    navigate('/links');
  };

  const isValid = localData.university && localData.major && localData.degree && localData.graduationYear;

  return (
    <Layout progress={42} showBack={true} showNext={true} onNext={handleNext} nextDisabled={!isValid}>
      <div className="pt-8">
        <h1 className="text-5xl font-bold text-white mb-8 tracking-tight text-right font-virgo">
          EDUCATION
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              University <span className="text-red-500">*</span>
            </label>
            {!showOtherUniversity ? (
              <select
                name="university"
                value={localData.university}
                onChange={handleChange}
                className="input-field bg-gray-800"
              >
                <option value="">Select an option</option>
                <option value="ESI">ESI - École nationale Supérieure d'Informatique</option>
                <option value="USTHB">USTHB - Université des Sciences et de la Technologie Houari Boumediene</option>
                <option value="ENP">ENP - École Nationale Polytechnique</option>
                <option value="UMMTO">UMMTO - Université Mouloud Mammeri de Tizi-Ouzou</option>
                <option value="ENSIA">ENSIA - École Nationale Supérieure d’Intelligence Artificielle</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  name="university"
                  value={localData.university}
                  onChange={handleChange}
                  placeholder="Enter your university name"
                  className="input-field bg-gray-800/30"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowOtherUniversity(false);
                    setLocalData({ ...localData, university: '' });
                  }}
                  className="text-sm underline"
                  style={{ color: '#E2BFFD' }}
                >
                  Select from list instead
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              University Major <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="major"
              value={localData.major}
              onChange={handleChange}
              placeholder="Enter your major"
              className="input-field"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              Degree <span className="text-red-500">*</span>
            </label>
            <select
              name="degree"
              value={localData.degree}
              onChange={handleChange}
              className="input-field bg-gray-800"
            >
              <option value="">Select an option</option>
              <option value="Bachelor">Bachelor's Degree</option>
              <option value="Master">Master's Degree</option>
              <option value="PhD">PhD</option>
              <option value="Engineering">Engineering Degree</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              Expected graduation year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="graduationYear"
              value={localData.graduationYear}
              onChange={handleChange}
              placeholder="Enter your graduation year"
              className="input-field bg-gray-800/30"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Education;