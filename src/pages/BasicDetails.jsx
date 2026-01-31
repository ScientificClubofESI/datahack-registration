import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const BasicDetails = ({ formData, updateFormData }) => {
  const navigate = useNavigate();
  const [localData, setLocalData] = useState({
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    email: formData.email || '',
    phoneNumber: formData.phoneNumber || '',
  });

  const handleChange = (e) => {
    setLocalData({
      ...localData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    updateFormData(localData);
    navigate('/skills');
  };

  const isValid = localData.firstName && localData.lastName && localData.email && localData.phoneNumber;

  return (
    <Layout progress={14} showNext={true} onNext={handleNext} nextDisabled={!isValid}>
      <div className="pt-8">
        <h1 className="text-5xl text-white mb-8 tracking-tight text-right font-virgo">
              BASIC DETAILS
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              First name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={localData.firstName}
              onChange={handleChange}
              placeholder="Your first name"
              className="input-field"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={localData.lastName}
              onChange={handleChange}
              placeholder="Your last name"
              className="input-field"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={localData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="input-field"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={localData.phoneNumber}
              onChange={handleChange}
              placeholder="+213 xxxxxxxxx"
              className="input-field"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BasicDetails;