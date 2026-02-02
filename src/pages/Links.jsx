import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Links = ({ formData, updateFormData }) => {
  const navigate = useNavigate();
  const [localData, setLocalData] = useState({
    cv: formData.cv || null,
    cvOriginalName: formData.cvOriginalName || '',
    github: formData.github || '',
    kaggle: formData.kaggle || '',
    linkedin: formData.linkedin || '',
  });
  const [fileName, setFileName] = useState(formData.cvOriginalName || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setLocalData({
      ...localData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        alert('File size must be less than 10MB');
        e.target.value = ''; // Reset file input
        return;
      }

      // Validate file type - PDF only
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file only');
        e.target.value = ''; // Reset file input
        return;
      }

      setFileName(file.name);
      setIsUploading(true);

      // Convert file to base64
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setLocalData({
          ...localData,
          cv: reader.result, // Store base64 string with data:application/pdf;base64, prefix
          cvOriginalName: file.name
        });
        setIsUploading(false);
      };

      reader.onerror = () => {
        alert('Failed to read file. Please try again.');
        setIsUploading(false);
        e.target.value = ''; // Reset file input
      };

      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (!localData.cv) {
      alert('Please upload your CV');
      return;
    }
    updateFormData(localData);
    navigate('/motivation');
  };

  const isValid = localData.cv && localData.github && localData.kaggle && localData.linkedin;

  return (
    <Layout progress={56} showBack={true} showNext={true} onNext={handleNext} nextDisabled={!isValid || isUploading}>
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
              Upload 1 PDF file. 10 MB max.
            </p>
            <div className="relative">
              <input
                type="file"
                id="cv-upload"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading}
              />
              <label
                htmlFor="cv-upload"
                className={`flex items-center gap-2 cursor-pointer transition-colors ${
                  isUploading 
                    ? 'text-gray-500 cursor-not-allowed' 
                    : 'text-purple-400 hover:text-purple-300'
                }`}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                  <path d="M9 15l3 -3l3 3" />
                  <path d="M12 12l0 9" />
                </svg>
                {isUploading ? 'Processing file...' : (fileName || 'Add a file')}
              </label>
              {localData.cv && !isUploading && (
                <p className="text-green-400 text-xs mt-2">✓ File uploaded successfully</p>
              )}
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