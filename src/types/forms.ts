// Form types and interfaces for Tujitume application

export interface BaseFormData {
  id?: string;
  submittedAt?: Date;
  status?: 'pending' | 'reviewed' | 'responded' | 'archived';
  adminNotes?: string;
}

export interface ContactFormData extends BaseFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContactMethod?: 'email' | 'phone' | 'whatsapp';
}

export interface ProgramInquiryFormData extends BaseFormData {
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  program: string;
  background: string;
  motivation: string;
  availability: string;
  previousExperience: string;
  expectations: string;
}

export interface PartnershipFormData extends BaseFormData {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website?: string;
  organizationType: 'ngo' | 'government' | 'private' | 'international' | 'academic' | 'other';
  partnershipType: 'funding' | 'implementation' | 'technical' | 'advocacy' | 'research' | 'other';
  description: string;
  proposedActivities: string;
  resources: string;
  timeline: string;
  budget?: string;
}

export interface VolunteerApplicationFormData extends BaseFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  location: string;
  education: string;
  currentOccupation: string;
  skills: string[];
  interests: string[];
  availability: {
    weekdays: boolean;
    weekends: boolean;
    evenings: boolean;
    hoursPerWeek: number;
  };
  experience: string;
  motivation: string;
  languages: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface DonationFormData extends BaseFormData {
  donorType: 'individual' | 'organization';
  name: string;
  email: string;
  phone?: string;
  amount: number;
  donationType: 'one-time' | 'monthly' | 'quarterly' | 'annual';
  program?: string;
  isAnonymous: boolean;
  dedicatedTo?: string;
  message?: string;
  address?: {
    street: string;
    city: string;
    county: string;
    country: string;
  };
}

export interface EventRegistrationFormData extends BaseFormData {
  eventId: string;
  eventTitle: string;
  participantType: 'individual' | 'organization';
  name: string;
  email: string;
  phone: string;
  organization?: string;
  position?: string;
  numberOfParticipants: number;
  dietaryRequirements?: string;
  accessibilityNeeds?: string;
  emergencyContact?: {
    name: string;
    phone: string;
  };
  howDidYouHear: string;
}

export interface NewsletterSubscriptionFormData extends BaseFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  interests: string[];
  location?: string;
  subscriptionType: 'all' | 'programs' | 'events' | 'success-stories' | 'partnerships';
}

export interface FeedbackFormData extends BaseFormData {
  name?: string;
  email?: string;
  category: 'website' | 'program' | 'event' | 'general' | 'complaint' | 'suggestion';
  rating?: number;
  subject: string;
  message: string;
  isAnonymous: boolean;
}

// Union type for all form data types
export type FormData = 
  | ContactFormData 
  | ProgramInquiryFormData 
  | PartnershipFormData 
  | VolunteerApplicationFormData 
  | DonationFormData 
  | EventRegistrationFormData 
  | NewsletterSubscriptionFormData 
  | FeedbackFormData;

// Form submission response interface
export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  errors?: Record<string, string>;
}

// Form validation error interface
export interface FormValidationError {
  field: string;
  message: string;
}

// Form context interface for managing form state
export interface FormContextType {
  isSubmitting: boolean;
  submitForm: (formType: string, data: any) => Promise<FormSubmissionResponse>;
  validateForm: (formType: string, data: any) => FormValidationError[];
}