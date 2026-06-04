export interface FormData {
  name: string;
  role: string;
  experience: string;
  company: string;
  jobLink: string;
  phone: string;
  recipientName: string;
  currentCompany: string;
  currentRole: string;
}

export type RecipientType = 'employee' | 'hr';
export type DeliveryType = 'email' | 'linkedinMail' | 'linkedinMessage' | 'followUp';
export type ConnectionType = 'new' | 'old';
export type FollowUpType = 'noResponse' | 'confirmation';
