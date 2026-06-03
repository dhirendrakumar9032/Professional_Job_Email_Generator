import React, { useState } from 'react';
import { EmailForm } from './components/EmailForm';
import { EmailPreview } from './components/EmailPreview';
import {
  ConnectionType,
  DeliveryType,
  FormData,
  RecipientType,
} from './types';

const clean = (value: string, fallback: string) => value.trim() || fallback;

function App() {
  const [recipientType, setRecipientType] = useState<RecipientType>('employee');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('linkedinMessage');
  const [connectionType, setConnectionType] = useState<ConnectionType>('old');
  const [emailGenerated, setEmailGenerated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: 'Dhirendra Kumar',
    role: 'Senior Frontend Engineer',
    experience: '4',
    company: '',
    jobLink: '',
    phone: '+91 8604390422',
    recipientName: '',
    currentCompany: 'JLL Technologies',
    currentRole: 'Senior Frontend Engineer',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailGenerated(true);
  };

  const templateValues = () => ({
    company: clean(formData.company, 'the company'),
    currentCompany: clean(formData.currentCompany, 'my current company'),
    currentRole: clean(formData.currentRole, 'Senior Frontend Engineer'),
    experience: clean(formData.experience, '4'),
    jobLink: formData.jobLink.trim(),
    name: clean(formData.name, 'Dhirendra Kumar'),
    phone: formData.phone.trim(),
    recipientName: clean(formData.recipientName, 'there'),
    role: clean(formData.role, 'Senior Frontend Engineer'),
  });

  const generateReferralEmail = () => {
    const values = templateValues();

    if (recipientType === 'hr') {
      return `Dear ${values.recipientName},

I hope this email finds you well. My name is ${values.name}, and I am a ${values.currentRole} at ${values.currentCompany} with ${values.experience}+ years of experience building scalable web applications.

I came across the ${values.role} role at ${values.company} and believe my frontend background aligns well with the position. I would be grateful if you could guide me on the next steps or consider my profile for the opening.

I have shared my resume for your reference.

Best regards,
${values.name}
${values.phone}`;
    }

    return `Hello ${values.recipientName},

Hope you're doing well. I've been following your work and really admire your journey at ${values.company}. I'd love to learn more about your experience working there.

I'm currently a ${values.currentRole} exploring new opportunities and came across an opening for ${values.role} at ${values.company}. I believe my profile aligns well with the role.

If you're open to it, I'd really appreciate a quick conversation. I'd also be grateful if you could consider referring me for this position.

I've shared my resume${values.jobLink ? ' and the job link' : ''} for your reference.${values.jobLink ? `\n${values.jobLink}` : ''}

Looking forward to hearing from you.

Best regards,
${values.name}
${values.phone}`;
  };

  const generateLinkedInMail = () => {
    const values = templateValues();

    if (recipientType === 'hr') {
      return `Hi ${values.recipientName},

I hope you're doing well. I'm ${values.name}, currently working as a ${values.currentRole} at ${values.currentCompany}.

I'm exploring new opportunities and came across the ${values.role} role at ${values.company}. I believe my frontend engineering experience aligns well with the role.

Could you please let me know if this position is still open or guide me on the next steps?

I've shared my resume${values.jobLink ? ' and the job link' : ''} for your reference.${values.jobLink ? `\n${values.jobLink}` : ''}

Best regards,
${values.name}`;
    }

    if (connectionType === 'new') {
      return `Hi ${values.recipientName},

I hope you're doing well. I'm ${values.name}, currently working as a ${values.currentRole}. I've been following your work and admire your journey at ${values.company}.

I'm exploring new opportunities and came across the ${values.role} role at ${values.company}. I believe my experience in frontend engineering aligns well with the role.

If you're open to it, I'd appreciate a quick conversation. I'd also be grateful if you could consider referring me for this position.

I've shared my resume${values.jobLink ? ' and the job link' : ''} for your reference.${values.jobLink ? `\n${values.jobLink}` : ''}

Best regards,
${values.name}`;
    }

    return `Hi ${values.recipientName},

Hope you're doing well. Since we're already connected, I wanted to reach out directly.

I'm currently a ${values.currentRole} and I'm exploring new opportunities. I came across the ${values.role} opening at ${values.company}, and it looks closely aligned with my frontend experience.

Would you be open to a quick conversation about the role? If it feels appropriate, I'd be grateful if you could consider referring me.

I've shared my resume${values.jobLink ? ' and the job link' : ''} for your reference.${values.jobLink ? `\n${values.jobLink}` : ''}

Best regards,
${values.name}`;
  };

  const generateLinkedInMessage = () => {
    const values = templateValues();

    if (recipientType === 'hr') {
      return `Hi ${values.recipientName},

I'm ${values.name}, currently a ${values.currentRole}.

I came across the ${values.role} role at ${values.company} and believe my profile aligns well.

Could you please let me know if this position is still open or guide me on the next steps?`;
    }

    if (connectionType === 'new') {
      return `Hi ${values.recipientName},

Great connecting with you.

I'm ${values.name}, currently working as a ${values.currentRole}.

I came across the ${values.role} role at ${values.company} and felt my profile aligns well.

I'd love to learn more about your experience working there. If you're comfortable, I'd also be grateful if you could refer me for this role.`;
    }

    return `Hi ${values.recipientName},

Hope you're doing well.

I'm currently a ${values.currentRole} exploring new opportunities and came across the ${values.role} role at ${values.company}.

If you're open to it, I'd really appreciate a quick conversation and would be grateful if you could refer me for this role.`;
  };

  const generateOutput = () => {
    if (deliveryType === 'email') {
      return generateReferralEmail();
    }

    if (deliveryType === 'linkedinMail') {
      return generateLinkedInMail();
    }

    return generateLinkedInMessage();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateOutput());
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-bold leading-tight text-slate-950 sm:text-xl">
              Job Mail Generator
            </h1>
            <p className="hidden text-sm text-slate-600 sm:block">
              Referral emails, LinkedIn mails, and connection messages.
            </p>
          </div>
          <span className="rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 sm:text-sm">
            LinkedIn Ready
          </span>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <EmailForm
            connectionType={connectionType}
            deliveryType={deliveryType}
            formData={formData}
            recipientType={recipientType}
            setConnectionType={setConnectionType}
            setDeliveryType={setDeliveryType}
            setFormData={setFormData}
            setRecipientType={setRecipientType}
            onSubmit={handleSubmit}
          />

          {emailGenerated && (
            <div className="mt-6">
              <EmailPreview
                title={
                  deliveryType === 'email'
                    ? 'Generated Email'
                    : deliveryType === 'linkedinMail'
                      ? 'Generated LinkedIn Mail'
                      : 'Generated LinkedIn Message'
                }
                email={generateOutput()}
                onCopy={handleCopy}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
