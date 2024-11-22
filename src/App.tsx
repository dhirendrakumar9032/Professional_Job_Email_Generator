import React, { useState } from 'react';
import {  ToggleLeft, ToggleRight } from 'lucide-react';
import { EmailForm } from './components/EmailForm';
import { EmailPreview } from './components/EmailPreview';
import { FormData } from './types';

function App() {
  const [isHR, setIsHR] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: 'Dhirendra',
    position: '',
    experience: '',
    company: '',
    jobLink: '',
    phone: '',
    recipientName: '',
    currentCompany: '',
  });
  const [emailGenerated, setEmailGenerated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailGenerated(true);
  };

  const generateEmail = () => {
    if (isHR) {
      return `Hi ${formData.recipientName},

I hope this message finds you well. 

My name is ${formData.name}, and I am a ${formData.position} with over ${formData.experience} years of experience. Currently, I am working at ${formData.currentCompany}. I noticed that you recently posted a job opening for a ${formData.position}, and I am very interested in exploring this opportunity.

Could you please consider me if the position is still available.

Thank you for your time and consideration.

Best regards,
${formData.name}
${formData.phone}
`;
    }

    return `Hi ${formData.recipientName},

Great to connect with you!

I'm a ${formData.position} with ${formData.experience}+ years of experience in building scalable projects, and I'm currently exploring a new opportunity. I noticed ${formData.company} is hiring for a ${formData.position} position. 

Would you be open to referring me? It would be a great help!

Job Post: ${formData.jobLink}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateEmail());
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Email Generator
            </h1>
            <p className="text-lg text-gray-600">
              Generate perfect emails for job applications and referrals
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <button
                onClick={() => setIsHR(!isHR)}
                className="relative inline-flex items-center rounded-full transition-all duration-300"
                style={{ backgroundColor: isHR ? '#818cf8' : '#4f46e5' }}
              >
                <span className="px-4 py-2 rounded-full text-white">
                  {isHR ? 'HR' : 'Employee'}
                </span>
                {isHR ? (
                  <ToggleRight className="w-6 h-6 text-white mx-2" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-white mx-2" />
                )}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <EmailForm
                formData={formData}
                setFormData={setFormData}
                isHR={isHR}
                onSubmit={handleSubmit}
              />

              {emailGenerated && (
                <EmailPreview
                  email={generateEmail()}
                  onCopy={handleCopy}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;