import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BasicDetails from './pages/BasicDetails';
import SkillsAndInterests from './pages/SkillsAndInterests';
import Education from './pages/Education';
import Links from './pages/Links';
import Motivation from './pages/Motivation';
import Team from './pages/Team';
import Complete from './pages/Complete';
import './index.css';

function App() {
  const [formData, setFormData] = useState({
    // Basic Details
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    
    // Skills and Interests
    skills: '',
    hackathonsAttended: '',
    experience: '',
    
    // Education
    university: '',
    major: '',
    degree: '',
    graduationYear: '',
    
    // Links
    cv: null,
    github: '',
    kaggle: '',
    linkedin: '',
    
    // Motivation
    howHeard: '',
    motivation: '',
    
    // Team
    hasTeam: null,
    teamChoice: null, // 'join' or 'create'
    teamName: '',
    teamCode: '',
    additionalInfo: '',
  });

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/basic-details" replace />} />
        <Route 
          path="/basic-details" 
          element={<BasicDetails formData={formData} updateFormData={updateFormData} />} 
        />
        <Route 
          path="/skills" 
          element={<SkillsAndInterests formData={formData} updateFormData={updateFormData} />} 
        />
        <Route 
          path="/education" 
          element={<Education formData={formData} updateFormData={updateFormData} />} 
        />
        <Route 
          path="/links" 
          element={<Links formData={formData} updateFormData={updateFormData} />} 
        />
        <Route 
          path="/motivation" 
          element={<Motivation formData={formData} updateFormData={updateFormData} />} 
        />
        <Route 
          path="/team" 
          element={<Team formData={formData} updateFormData={updateFormData} />} 
        />
        <Route 
          path="/complete" 
          element={<Complete />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
