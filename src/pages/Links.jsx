import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Links = ({ formData, updateFormData }) => {
  const navigate = useNavigate();
  const [localData, setLocalData] = useState({
    cv: formData.cv || null,
    github: formData.github || '',
    kaggle: formData.kaggle || '',
    linkedin: formData.linkedin || '',
  });
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    setLocalData({
      ...localData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setLocalData({
        ...localData,
        cv: file
      });
    }
  };

  const handleNext = () => {
    updateFormData(localData);
    navigate('/motivation');
  };

  const isValid = localData.cv && localData.github && localData.kaggle && localData.linkedin;

  return (
    <Layout progress={56} showBack={true} showNext={true} onNext={handleNext} nextDisabled={!isValid}>
      <div className="pt-8">
        <h1 className="text-5xl font-bold text-white mb-8 tracking-tight text-right font-virgo">
          LINKS
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              CV <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-400 text-xs mb-3">
              Upload 1 compatible file: PDF or document. 10 MB max.
            </p>
            <div className="relative">
              <input
                type="file"
                id="cv-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="cv-upload"
                className="flex items-center gap-2 text-purple-400 cursor-pointer hover:text-purple-300 transition-colors"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                  <path d="M9 15l3 -3l3 3" />
                  <path d="M12 12l0 9" />
                </svg>
                {fileName || 'Add a file'}
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              Github <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="github"
              value={localData.github}
              onChange={handleChange}
              placeholder="Link to your Github"
              className="input-field"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              Kaggle <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="kaggle"
              value={localData.kaggle}
              onChange={handleChange}
              placeholder="Link to your Kaggle"
              className="input-field"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm" style={{ color: '#E2BFFD' }}>
              LinkedIn profile <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-400 text-xs mb-3">
              Let us see your LinkedIn profile!
            </p>
            <input
              type="url"
              name="linkedin"
              value={localData.linkedin}
              onChange={handleChange}
              placeholder="Link to your LinkedIn profile"
              className="input-field"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Links;