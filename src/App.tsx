import React, { useState } from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import { EmailForm } from './components/EmailForm';
import { EmailPreview } from './components/EmailPreview';
import { FormData } from './types';

function App() {
  const [isHR, setIsHR] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [emailGenerated, setEmailGenerated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: 'Dhirendra Kumar',
    position: 'Frontend Developer',
    experience: '3',
    company: '',
    jobLink: '',
    phone: '8604390422',
    recipientName: '',
    currentCompany: 'Qapita Fintech India Pvt Ltd',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailGenerated(true);
  };

  const generateEmail = () => {
    if (isEmail && !isHR) {
      return `
Hi ${formData.recipientName},

I hope you're doing well! I'm a Frontend Developer with over 3 years of experience in building scalable projects. I'm currently exploring new opportunities and am very interested in the open ${formData.position} position at ${formData.company}.

Could I ask for your help with a referral? I've attached my resume for your review.

Thank you so much for your time and assistance!

Best regards,
${formData.name}
${formData.phone}`;
    } else {
      return `
Dear ${formData.recipientName},

I hope this email finds you well. My name is ${formData.name}, and I am a Frontend Developer at ${formData.currentCompany} with over 3 years of experience in creating scalable and effective web applications. I am interested in the ${formData.position} role currently available at ${formData.company} and am eager to bring my expertise to your team.

Attached is my resume for your review. Could you please advise on the next steps in the application process?

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team.

Best regards,
${formData.name}
${formData.phone}`;
    }
  };

  const generateMessage = () => {
    if (isHR) {
      return `
Hi ${formData.recipientName},

I hope this message finds you well. 

My name is ${formData.name}, and I am a ${formData.position} with over ${formData.experience} years of experience. Currently, I am working at ${formData.currentCompany}. I noticed that you recently posted a job opening for a ${formData.position}, and I am very interested in exploring this opportunity.

Could you please consider me if the position is still available.

Thank you for your time and consideration.

Best regards,
${formData.name}
${formData.phone}`;
    }

    return `
Hi ${formData.recipientName},

Great to connect with you!

I'm a ${formData.position} with ${formData.experience}+ years of experience in building scalable projects, and I'm currently exploring a new opportunity. I noticed ${formData.company} is hiring for a ${formData.position} position. 

Would you be open to referring me? It would be a great help!

Job Post: ${formData.jobLink}`;
  };

  const handleCopy = async () => {
    const text = isEmail ? generateEmail() : generateMessage();
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
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
            <div className="flex items-center gap-10 justify-center mb-8">
              <button
                onClick={() => setIsHR(!isHR)}
                className="relative inline-flex items-center rounded-full transition-all duration-300"
                style={{ backgroundColor:'#4f46e5' }}
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
              <button
                onClick={() => setIsEmail(!isEmail)}
                className="relative inline-flex items-center rounded-full transition-all duration-300"
                style={{ backgroundColor: isEmail ? '#818cf8' : '#4f46e5' }}
              >
                <span className="px-4 py-2 rounded-full text-white">
                  {isEmail ? 'Email' : 'LinkedIn'}
                </span>
                {isEmail ? (
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
                isEmail={isEmail}
              />

              {emailGenerated && (
                <EmailPreview
                  email={isEmail ? generateEmail() : generateMessage()}
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
