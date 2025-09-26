import { FormValidationError } from '@/types/forms';

// Common validation rules
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+254|0)[17]\d{8}$/; // Kenya phone number format

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePhone = (phone: string, required: boolean = false): string | null => {
  if (!phone && required) return 'Phone number is required';
  if (phone && !phoneRegex.test(phone)) return 'Please enter a valid Kenyan phone number';
  return null;
};

export const validateRequired = (value: any, fieldName: string): string | null => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): string | null => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): string | null => {
  if (value && value.length > maxLength) {
    return `${fieldName} must not exceed ${maxLength} characters`;
  }
  return null;
};

export const validateAge = (age: number): string | null => {
  if (!age) return 'Age is required';
  if (age < 16 || age > 100) return 'Age must be between 16 and 100';
  return null;
};

export const validateAmount = (amount: number): string | null => {
  if (!amount) return 'Amount is required';
  if (amount <= 0) return 'Amount must be greater than 0';
  if (amount > 10000000) return 'Amount seems unusually high, please verify';
  return null;
};

// Form-specific validation functions
export const validateContactForm = (data: any): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  const nameError = validateRequired(data.name, 'Name');
  if (nameError) errors.push({ field: 'name', message: nameError });

  const emailError = validateEmail(data.email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const phoneError = validatePhone(data.phone, false);
  if (phoneError) errors.push({ field: 'phone', message: phoneError });

  const subjectError = validateRequired(data.subject, 'Subject');
  if (subjectError) errors.push({ field: 'subject', message: subjectError });

  const messageError = validateRequired(data.message, 'Message');
  if (messageError) errors.push({ field: 'message', message: messageError });

  const messageMinError = validateMinLength(data.message, 10, 'Message');
  if (messageMinError) errors.push({ field: 'message', message: messageMinError });

  return errors;
};

export const validateProgramInquiryForm = (data: any): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  const nameError = validateRequired(data.name, 'Name');
  if (nameError) errors.push({ field: 'name', message: nameError });

  const emailError = validateEmail(data.email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const phoneError = validatePhone(data.phone, true);
  if (phoneError) errors.push({ field: 'phone', message: phoneError });

  const ageError = validateAge(data.age);
  if (ageError) errors.push({ field: 'age', message: ageError });

  const locationError = validateRequired(data.location, 'Location');
  if (locationError) errors.push({ field: 'location', message: locationError });

  const programError = validateRequired(data.program, 'Program');
  if (programError) errors.push({ field: 'program', message: programError });

  const backgroundError = validateRequired(data.background, 'Background');
  if (backgroundError) errors.push({ field: 'background', message: backgroundError });

  const backgroundMinError = validateMinLength(data.background, 50, 'Background');
  if (backgroundMinError) errors.push({ field: 'background', message: backgroundMinError });

  const motivationError = validateRequired(data.motivation, 'Motivation');
  if (motivationError) errors.push({ field: 'motivation', message: motivationError });

  const motivationMinError = validateMinLength(data.motivation, 30, 'Motivation');
  if (motivationMinError) errors.push({ field: 'motivation', message: motivationMinError });

  const availabilityError = validateRequired(data.availability, 'Availability');
  if (availabilityError) errors.push({ field: 'availability', message: availabilityError });

  const expectationsError = validateRequired(data.expectations, 'Expectations');
  if (expectationsError) errors.push({ field: 'expectations', message: expectationsError });

  return errors;
};

export const validatePartnershipForm = (data: any): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  const orgNameError = validateRequired(data.organizationName, 'Organization name');
  if (orgNameError) errors.push({ field: 'organizationName', message: orgNameError });

  const contactPersonError = validateRequired(data.contactPerson, 'Contact person');
  if (contactPersonError) errors.push({ field: 'contactPerson', message: contactPersonError });

  const emailError = validateEmail(data.email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const phoneError = validatePhone(data.phone, true);
  if (phoneError) errors.push({ field: 'phone', message: phoneError });

  const orgTypeError = validateRequired(data.organizationType, 'Organization type');
  if (orgTypeError) errors.push({ field: 'organizationType', message: orgTypeError });

  const partnershipTypeError = validateRequired(data.partnershipType, 'Partnership type');
  if (partnershipTypeError) errors.push({ field: 'partnershipType', message: partnershipTypeError });

  const descriptionError = validateRequired(data.description, 'Description');
  if (descriptionError) errors.push({ field: 'description', message: descriptionError });

  const descriptionMinError = validateMinLength(data.description, 100, 'Description');
  if (descriptionMinError) errors.push({ field: 'description', message: descriptionMinError });

  const activitiesError = validateRequired(data.proposedActivities, 'Proposed activities');
  if (activitiesError) errors.push({ field: 'proposedActivities', message: activitiesError });

  const resourcesError = validateRequired(data.resources, 'Resources');
  if (resourcesError) errors.push({ field: 'resources', message: resourcesError });

  const timelineError = validateRequired(data.timeline, 'Timeline');
  if (timelineError) errors.push({ field: 'timeline', message: timelineError });

  return errors;
};

export const validateVolunteerForm = (data: any): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  const firstNameError = validateRequired(data.firstName, 'First name');
  if (firstNameError) errors.push({ field: 'firstName', message: firstNameError });

  const lastNameError = validateRequired(data.lastName, 'Last name');
  if (lastNameError) errors.push({ field: 'lastName', message: lastNameError });

  const emailError = validateEmail(data.email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const phoneError = validatePhone(data.phone, true);
  if (phoneError) errors.push({ field: 'phone', message: phoneError });

  const dobError = validateRequired(data.dateOfBirth, 'Date of birth');
  if (dobError) errors.push({ field: 'dateOfBirth', message: dobError });

  const locationError = validateRequired(data.location, 'Location');
  if (locationError) errors.push({ field: 'location', message: locationError });

  const educationError = validateRequired(data.education, 'Education');
  if (educationError) errors.push({ field: 'education', message: educationError });

  const occupationError = validateRequired(data.currentOccupation, 'Current occupation');
  if (occupationError) errors.push({ field: 'currentOccupation', message: occupationError });

  if (!data.skills || data.skills.length === 0) {
    errors.push({ field: 'skills', message: 'Please select at least one skill' });
  }

  if (!data.interests || data.interests.length === 0) {
    errors.push({ field: 'interests', message: 'Please select at least one area of interest' });
  }

  const motivationError = validateRequired(data.motivation, 'Motivation');
  if (motivationError) errors.push({ field: 'motivation', message: motivationError });

  const motivationMinError = validateMinLength(data.motivation, 50, 'Motivation');
  if (motivationMinError) errors.push({ field: 'motivation', message: motivationMinError });

  // Emergency contact validation
  if (!data.emergencyContact?.name) {
    errors.push({ field: 'emergencyContact.name', message: 'Emergency contact name is required' });
  }

  if (!data.emergencyContact?.phone) {
    errors.push({ field: 'emergencyContact.phone', message: 'Emergency contact phone is required' });
  } else {
    const emergencyPhoneError = validatePhone(data.emergencyContact.phone, true);
    if (emergencyPhoneError) {
      errors.push({ field: 'emergencyContact.phone', message: emergencyPhoneError });
    }
  }

  if (!data.emergencyContact?.relationship) {
    errors.push({ field: 'emergencyContact.relationship', message: 'Emergency contact relationship is required' });
  }

  return errors;
};

export const validateDonationForm = (data: any): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  const nameError = validateRequired(data.name, 'Name');
  if (nameError) errors.push({ field: 'name', message: nameError });

  const emailError = validateEmail(data.email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const phoneError = validatePhone(data.phone, false);
  if (phoneError) errors.push({ field: 'phone', message: phoneError });

  const amountError = validateAmount(data.amount);
  if (amountError) errors.push({ field: 'amount', message: amountError });

  const donorTypeError = validateRequired(data.donorType, 'Donor type');
  if (donorTypeError) errors.push({ field: 'donorType', message: donorTypeError });

  const donationTypeError = validateRequired(data.donationType, 'Donation type');
  if (donationTypeError) errors.push({ field: 'donationType', message: donationTypeError });

  return errors;
};

export const validateEventRegistrationForm = (data: any): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  const nameError = validateRequired(data.name, 'Name');
  if (nameError) errors.push({ field: 'name', message: nameError });

  const emailError = validateEmail(data.email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const phoneError = validatePhone(data.phone, true);
  if (phoneError) errors.push({ field: 'phone', message: phoneError });

  const participantTypeError = validateRequired(data.participantType, 'Participant type');
  if (participantTypeError) errors.push({ field: 'participantType', message: participantTypeError });

  if (!data.numberOfParticipants || data.numberOfParticipants < 1 || data.numberOfParticipants > 50) {
    errors.push({ field: 'numberOfParticipants', message: 'Number of participants must be between 1 and 50' });
  }

  const howDidYouHearError = validateRequired(data.howDidYouHear, 'How did you hear about this event');
  if (howDidYouHearError) errors.push({ field: 'howDidYouHear', message: howDidYouHearError });

  return errors;
};

export const validateNewsletterForm = (data: any): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  const emailError = validateEmail(data.email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  if (!data.interests || data.interests.length === 0) {
    errors.push({ field: 'interests', message: 'Please select at least one area of interest' });
  }

  const subscriptionTypeError = validateRequired(data.subscriptionType, 'Subscription type');
  if (subscriptionTypeError) errors.push({ field: 'subscriptionType', message: subscriptionTypeError });

  return errors;
};

export const validateFeedbackForm = (data: any): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  if (!data.isAnonymous) {
    const emailError = validateEmail(data.email);
    if (emailError) errors.push({ field: 'email', message: emailError });
  }

  const categoryError = validateRequired(data.category, 'Category');
  if (categoryError) errors.push({ field: 'category', message: categoryError });

  const subjectError = validateRequired(data.subject, 'Subject');
  if (subjectError) errors.push({ field: 'subject', message: subjectError });

  const messageError = validateRequired(data.message, 'Message');
  if (messageError) errors.push({ field: 'message', message: messageError });

  const messageMinError = validateMinLength(data.message, 10, 'Message');
  if (messageMinError) errors.push({ field: 'message', message: messageMinError });

  if (data.rating && (data.rating < 1 || data.rating > 5)) {
    errors.push({ field: 'rating', message: 'Rating must be between 1 and 5' });
  }

  return errors;
};

// Main validation function that routes to specific validators
export const validateFormData = (formType: string, data: any): FormValidationError[] => {
  switch (formType) {
    case 'contact':
      return validateContactForm(data);
    case 'program-inquiry':
      return validateProgramInquiryForm(data);
    case 'partnership':
      return validatePartnershipForm(data);
    case 'volunteer':
      return validateVolunteerForm(data);
    case 'donation':
      return validateDonationForm(data);
    case 'event-registration':
      return validateEventRegistrationForm(data);
    case 'newsletter':
      return validateNewsletterForm(data);
    case 'feedback':
      return validateFeedbackForm(data);
    default:
      return [{ field: 'general', message: 'Unknown form type' }];
  }
};