import { FormSubmissionResponse, FormData } from '@/types/forms';
import { validateFormData } from '@/utils/formValidation';

// Mock email service - replace with actual email service
const sendEmail = async (to: string, subject: string, body: string): Promise<boolean> => {
  // In production, integrate with services like:
  // - EmailJS
  // - Netlify Forms
  // - AWS SES
  // - SendGrid
  // - Custom API endpoint
  
  console.log('Sending email:', { to, subject, body });
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

// Mock data storage - replace with actual database
const saveFormSubmission = async (formType: string, data: any): Promise<string> => {
  // In production, save to:
  // - Firebase
  // - Supabase
  // - Custom API
  // - Local storage (for demo)
  
  const submission = {
    id: Date.now().toString(),
    formType,
    data,
    submittedAt: new Date(),
    status: 'pending'
  };
  
  // Save to localStorage for demo purposes
  const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
  existingSubmissions.push(submission);
  localStorage.setItem('formSubmissions', JSON.stringify(existingSubmissions));
  
  console.log('Form submission saved:', submission);
  return submission.id;
};

// Email templates for different form types
const getEmailTemplate = (formType: string, data: any) => {
  switch (formType) {
    case 'contact':
      return {
        to: 'info@tujitume.org',
        subject: `New Contact Form Submission: ${data.subject}`,
        body: `
New contact form submission received:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Subject: ${data.subject}
Preferred Contact Method: ${data.preferredContactMethod || 'Email'}

Message:
${data.message}

Submitted at: ${new Date().toLocaleString()}
        `
      };
      
    case 'program-inquiry':
      return {
        to: 'programs@tujitume.org',
        subject: `New Program Inquiry: ${data.program}`,
        body: `
New program inquiry received:

Personal Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}
- Age: ${data.age}
- Location: ${data.location}

Program Interest: ${data.program}

Background:
${data.background}

Motivation:
${data.motivation}

Availability: ${data.availability}

Previous Experience:
${data.previousExperience}

Expectations:
${data.expectations}

Submitted at: ${new Date().toLocaleString()}
        `
      };
      
    case 'partnership':
      return {
        to: 'partnerships@tujitume.org',
        subject: `Partnership Proposal: ${data.organizationName}`,
        body: `
New partnership proposal received:

Organization Details:
- Name: ${data.organizationName}
- Contact Person: ${data.contactPerson}
- Email: ${data.email}
- Phone: ${data.phone}
- Website: ${data.website || 'Not provided'}
- Organization Type: ${data.organizationType}
- Partnership Type: ${data.partnershipType}

Description:
${data.description}

Proposed Activities:
${data.proposedActivities}

Resources:
${data.resources}

Timeline: ${data.timeline}
Budget: ${data.budget || 'Not specified'}

Submitted at: ${new Date().toLocaleString()}
        `
      };
      
    case 'volunteer':
      return {
        to: 'volunteers@tujitume.org',
        subject: `Volunteer Application: ${data.firstName} ${data.lastName}`,
        body: `
New volunteer application received:

Personal Information:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Phone: ${data.phone}
- Date of Birth: ${data.dateOfBirth}
- Location: ${data.location}
- Education: ${data.education}
- Current Occupation: ${data.currentOccupation}

Skills: ${data.skills?.join(', ')}
Interests: ${data.interests?.join(', ')}
Languages: ${data.languages?.join(', ')}

Availability:
- Weekdays: ${data.availability?.weekdays ? 'Yes' : 'No'}
- Weekends: ${data.availability?.weekends ? 'Yes' : 'No'}
- Evenings: ${data.availability?.evenings ? 'Yes' : 'No'}
- Hours per week: ${data.availability?.hoursPerWeek}

Experience:
${data.experience}

Motivation:
${data.motivation}

Emergency Contact:
- Name: ${data.emergencyContact?.name}
- Phone: ${data.emergencyContact?.phone}
- Relationship: ${data.emergencyContact?.relationship}

Submitted at: ${new Date().toLocaleString()}
        `
      };
      
    case 'donation':
      return {
        to: 'donations@tujitume.org',
        subject: `Donation Intent: KES ${data.amount}`,
        body: `
New donation intent received:

Donor Information:
- Type: ${data.donorType}
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}

Donation Details:
- Amount: KES ${data.amount}
- Type: ${data.donationType}
- Program: ${data.program || 'General fund'}
- Anonymous: ${data.isAnonymous ? 'Yes' : 'No'}
- Dedicated to: ${data.dedicatedTo || 'Not specified'}

Message:
${data.message || 'None'}

Address:
${data.address ? `${data.address.street}, ${data.address.city}, ${data.address.county}, ${data.address.country}` : 'Not provided'}

Submitted at: ${new Date().toLocaleString()}
        `
      };
      
    default:
      return {
        to: 'info@tujitume.org',
        subject: `Form Submission: ${formType}`,
        body: `New form submission received:\n\n${JSON.stringify(data, null, 2)}`
      };
  }
};

// User confirmation email template
const getUserConfirmationEmail = (formType: string, data: any) => {
  const messages = {
    'contact': 'Thank you for contacting us. We will respond within 24 hours.',
    'program-inquiry': 'Thank you for your interest in our programs. Our team will review your application and contact you within 3-5 business days.',
    'partnership': 'Thank you for your partnership proposal. We will review it carefully and respond within 1-2 weeks.',
    'volunteer': 'Thank you for your volunteer application. We will review your application and contact you for the next steps.',
    'donation': 'Thank you for your generous donation intent. You will receive payment instructions shortly.',
    'event-registration': 'Thank you for registering for the event. You will receive event details and updates via email.',
    'newsletter': 'Thank you for subscribing to our newsletter. You will receive regular updates about our work.',
    'feedback': 'Thank you for your feedback. We value your input and will use it to improve our services.'
  };
  
  return {
    to: data.email,
    subject: 'Thank you for contacting Tujitume Youth & Women CBO',
    body: `
Dear ${data.name || data.firstName || 'Friend'},

${messages[formType as keyof typeof messages] || 'Thank you for your submission.'}

Your submission reference: #${Date.now().toString().slice(-6)}

We appreciate your interest in our work to empower youth and women in Nandi County. If you have any urgent questions, please contact us at info@tujitume.org or call +254725165153.

Best regards,
Tujitume Youth & Women CBO Team

Visit us: https://www.tujitume.org
Follow us on social media for updates!
    `
  };
};

export const submitForm = async (formType: string, data: any): Promise<FormSubmissionResponse> => {
  try {
    // Validate form data
    const validationErrors = validateFormData(formType, data);
    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {} as Record<string, string>);
      
      return {
        success: false,
        message: 'Please fix the validation errors and try again.',
        errors: errorMap
      };
    }
    
    // Save form submission
    const submissionId = await saveFormSubmission(formType, data);
    
    // Send notification email to admin
    const adminEmail = getEmailTemplate(formType, data);
    await sendEmail(adminEmail.to, adminEmail.subject, adminEmail.body);
    
    // Send confirmation email to user (if email provided)
    if (data.email && !data.isAnonymous) {
      const userEmail = getUserConfirmationEmail(formType, data);
      await sendEmail(userEmail.to, userEmail.subject, userEmail.body);
    }
    
    return {
      success: true,
      message: 'Thank you! Your submission has been received successfully.',
      submissionId
    };
    
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'Sorry, there was an error submitting your form. Please try again later.'
    };
  }
};

// Get all form submissions (for admin)
export const getFormSubmissions = async (): Promise<any[]> => {
  try {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    return submissions.sort((a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  } catch (error) {
    console.error('Error fetching form submissions:', error);
    return [];
  }
};

// Update form submission status (for admin)
export const updateSubmissionStatus = async (id: string, status: string, adminNotes?: string): Promise<boolean> => {
  try {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    const index = submissions.findIndex((sub: any) => sub.id === id);
    
    if (index !== -1) {
      submissions[index].status = status;
      if (adminNotes) {
        submissions[index].adminNotes = adminNotes;
      }
      submissions[index].updatedAt = new Date();
      
      localStorage.setItem('formSubmissions', JSON.stringify(submissions));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error updating submission status:', error);
    return false;
  }
};