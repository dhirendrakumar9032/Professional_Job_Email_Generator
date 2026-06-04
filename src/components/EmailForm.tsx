import React from 'react';
import { Send } from 'lucide-react';
import {
  ConnectionType,
  DeliveryType,
  FollowUpType,
  FormData,
  RecipientType,
} from '../types';

interface EmailFormProps {
  connectionType: ConnectionType;
  deliveryType: DeliveryType;
  followUpType: FollowUpType;
  formData: FormData;
  recipientType: RecipientType;
  setConnectionType: React.Dispatch<React.SetStateAction<ConnectionType>>;
  setDeliveryType: React.Dispatch<React.SetStateAction<DeliveryType>>;
  setFollowUpType: React.Dispatch<React.SetStateAction<FollowUpType>>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setRecipientType: React.Dispatch<React.SetStateAction<RecipientType>>;
  onSubmit: (e: React.FormEvent) => void;
}

const inputClass =
  'mt-2 block h-10 w-full rounded-md border-0 px-3 text-sm text-slate-950 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600';

const selectClass =
  'mt-2 block h-10 w-full rounded-md border-0 bg-white px-3 text-sm text-slate-950 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500';

const labelClass = 'block text-sm font-medium text-slate-700';

export function EmailForm({
  connectionType,
  deliveryType,
  followUpType,
  formData,
  recipientType,
  setConnectionType,
  setDeliveryType,
  setFollowUpType,
  setFormData,
  setRecipientType,
  onSubmit,
}: EmailFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFollowUp = deliveryType === 'followUp';
  const isLinkedIn = deliveryType !== 'email' && !isFollowUp;
  const isShortLinkedInMessage = deliveryType === 'linkedinMessage';

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label className={labelClass}>Send To</label>
          <select
            value={recipientType}
            onChange={event => setRecipientType(event.target.value as RecipientType)}
            className={selectClass}
          >
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Format</label>
          <select
            value={deliveryType}
            onChange={event => setDeliveryType(event.target.value as DeliveryType)}
            className={selectClass}
          >
            <option value="email">Email</option>
            <option value="linkedinMail">LinkedIn Mail</option>
            <option value="linkedinMessage">LinkedIn Message</option>
            <option value="followUp">Follow-up Message</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Connection</label>
          <select
            value={connectionType}
            onChange={event => setConnectionType(event.target.value as ConnectionType)}
            className={selectClass}
            disabled={!isLinkedIn}
          >
            <option value="old">Old Connection</option>
            <option value="new">New Connection</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Follow-up Type</label>
          <select
            value={followUpType}
            onChange={event => setFollowUpType(event.target.value as FollowUpType)}
            className={selectClass}
            disabled={!isFollowUp}
          >
            <option value="noResponse">No response yet</option>
            <option value="confirmation">Check referral confirmation</option>
          </select>
        </div>
      </div>

      <div className="grid gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <label className={labelClass}>Recipient's Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g., John"
            required
          />
        </div>

        {!isFollowUp && (
          <>
            <div>
              <label className={labelClass}>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g., Dhirendra Kumar"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Target Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g., Senior Frontend Engineer"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Target Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g., Acme Corp"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Current Role</label>
              <input
                type="text"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                className={inputClass}
                placeholder="Senior Frontend Engineer"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Current Company</label>
              <input
                type="text"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g., JLL Technologies"
                required={!isShortLinkedInMessage}
              />
            </div>

            <div>
              <label className={labelClass}>Years of Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g., 4"
                required={!isShortLinkedInMessage}
              />
            </div>

            <div>
              <label className={labelClass}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g., +91 9999999999"
                required={deliveryType === 'email'}
              />
            </div>

            <div className="md:col-span-2 xl:col-span-3">
              <label className={labelClass}>Job Post Link</label>
              <input
                type="url"
                name="jobLink"
                value={formData.jobLink}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
          </>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Generate
        <Send className="ml-2 h-4 w-4" />
      </button>
    </form>
  );
}
