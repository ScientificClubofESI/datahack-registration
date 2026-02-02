import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

/**
 * Convert file to base64 string
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Map frontend form data to backend API format
 */
const mapFormDataToAPI = async (formData) => {
  const apiData = {
    // Basic Details
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
    
    // Skills
    skills: formData.skills,
    hackathonsAttended: Number(formData.hackathonsAttended),
    hackathonsExperience: formData.experience || '',
    
    // Education
    university: formData.university,
    major: formData.major,
    degree: formData.degree,
    graduationYear: Number(formData.graduationYear),
    
    // Links
    github: formData.github || '',
    kaggle: formData.kaggle || '',
    linkedin: formData.linkedin || '',
    
    // Motivation
    howHeard: formData.howHeard || '',
    motivation: formData.motivation || '',
    comment: formData.additionalInfo || '',
    
    // Team
    hasTeam: formData.hasTeam === true,
  };

  // Handle CV file upload - convert to base64
  // CV is required - validate it exists
  if (!formData.cv) {
    throw new Error('CV is required. Please upload your CV.');
  }

  // Check if cv is already a base64 string (from going back/forward in the form)
  if (typeof formData.cv === 'string' && formData.cv.startsWith('data:')) {
    // CV is already converted to base64
    apiData.cv = formData.cv;
    apiData.cvOriginalName = formData.cvOriginalName || 'cv.pdf';
  } else if (formData.cv instanceof File) {
    // CV is a File object - convert to base64
    try {
      // Check file size (10MB limit as per frontend validation)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (formData.cv.size > maxSize) {
        throw new Error('CV file is too large. Maximum size is 10MB.');
      }
      
      const base64String = await fileToBase64(formData.cv);
      // Keep the full base64 string WITH the data URL prefix for Cloudinary
      apiData.cv = base64String;
      apiData.cvOriginalName = formData.cv.name;
    } catch (error) {
      console.error('Error converting CV to base64:', error);
      // If it's a size error, throw it so user sees the message
      if (error.message.includes('too large')) {
        throw error;
      }
      // Re-throw the error if CV conversion fails
      throw new Error('Failed to process CV file. Please try uploading again.');
    }
  } else {
    throw new Error('CV is required. Please upload your CV.');
  }

  // Handle team logic
  if (formData.hasTeam === true) {
    apiData.createTeam = formData.teamChoice === 'create';
    
    if (formData.teamChoice === 'create') {
      apiData.teamName = formData.teamName;
      // Don't send teamCode when creating
    } else if (formData.teamChoice === 'join') {
      apiData.teamCode = formData.teamCode;
      // Don't send teamName when joining
    }
  }
  // When hasTeam is false, don't send createTeam, teamCode, or teamName

  return apiData;
};

/**
 * Submit registration to backend
 */
export const submitRegistration = async (formData) => {
  try {
    // Validate CV before proceeding
    if (!formData.cv) {
      throw new Error('CV is required. Please upload your CV before submitting.');
    }

    // Map form data to API format
    const apiData = await mapFormDataToAPI(formData);
    
    // Double-check CV is in the API data
    if (!apiData.cv) {
      throw new Error('CV is required. Please upload your CV before submitting.');
    }
    
    // Make API call using axios
    // Configure axios to handle larger payloads (up to 50MB)
    const response = await axios.post(`${API_BASE_URL}/api/users`, apiData, {
      headers: {
        'Content-Type': 'application/json',
      },
      maxContentLength: 50 * 1024 * 1024, // 50MB
      maxBodyLength: 50 * 1024 * 1024, // 50MB
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // Axios error handling
    let errorMessage = error.response?.data?.message || error.message || 'An error occurred during registration';
    
    // Handle payload too large error specifically
    if (errorMessage.includes('PayloadTooLargeError') || errorMessage.includes('request entity too large')) {
      errorMessage = 'The CV file is too large. Please use a smaller file (under 5MB) or contact support.';
    }
    
    // Re-throw file size validation errors from mapFormDataToAPI
    if (error.message && error.message.includes('too large')) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};