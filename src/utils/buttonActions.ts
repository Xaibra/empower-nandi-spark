// Centralized button action handlers for all website buttons

// Smooth scroll utility
export const smoothScrollTo = (targetId: string, offset: number = 80) => {
  const element = document.getElementById(targetId);
  if (element) {
    const elementTop = element.offsetTop - offset;
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });
  }
};

// Navigation actions
export const navigationActions = {
  scrollToHome: () => smoothScrollTo('hero-section'),
  scrollToAbout: () => smoothScrollTo('about-section'),
  scrollToPrograms: () => smoothScrollTo('programs-section'),
  scrollToImpact: () => smoothScrollTo('impact-section'),
  scrollToGetInvolved: () => smoothScrollTo('get-involved-section'),
  scrollToContact: () => smoothScrollTo('contact-section'),
  scrollToNews: () => smoothScrollTo('news-section'),
  scrollToPartnerships: () => smoothScrollTo('partnerships-section'),
  scrollToTeam: () => smoothScrollTo('team-section'),
  scrollToTestimonials: () => smoothScrollTo('testimonials-section'),
  scrollTo: (elementId: string) => smoothScrollTo(elementId)
};

// Form modal actions
export const formActions = {
  openContactForm: () => {
    // This will open a modal with contact form
    const event = new CustomEvent('openModal', { 
      detail: { modalType: 'contact' }
    });
    window.dispatchEvent(event);
  },
  
  openProgramInquiry: (programName?: string) => {
    const event = new CustomEvent('openModal', { 
      detail: { modalType: 'program-inquiry', program: programName }
    });
    window.dispatchEvent(event);
  },
  
  openPartnershipForm: () => {
    const event = new CustomEvent('openModal', { 
      detail: { modalType: 'partnership' }
    });
    window.dispatchEvent(event);
  },
  
  openVolunteerForm: () => {
    const event = new CustomEvent('openModal', { 
      detail: { modalType: 'volunteer' }
    });
    window.dispatchEvent(event);
  },
  
  openDonationForm: (program?: string) => {
    const event = new CustomEvent('openModal', { 
      detail: { modalType: 'donation', program }
    });
    window.dispatchEvent(event);
  },
  
  openEventRegistration: (eventId?: string, eventTitle?: string) => {
    const event = new CustomEvent('openModal', { 
      detail: { modalType: 'event-registration', eventId, eventTitle }
    });
    window.dispatchEvent(event);
  },
  
  openNewsletterSubscription: () => {
    const event = new CustomEvent('openModal', { 
      detail: { modalType: 'newsletter' }
    });
    window.dispatchEvent(event);
  },
  
  openNewsletterSignup: () => {
    const event = new CustomEvent('openModal', { 
      detail: { modalType: 'newsletter' }
    });
    window.dispatchEvent(event);
  }
};

// External link actions
export const externalActions = {
  openFacebook: () => {
    window.open('https://facebook.com/tujitume', '_blank', 'noopener,noreferrer');
  },
  
  openTwitter: () => {
    window.open('https://twitter.com/tujitume', '_blank', 'noopener,noreferrer');
  },
  
  openInstagram: () => {
    window.open('https://instagram.com/tujitume', '_blank', 'noopener,noreferrer');
  },
  
  openLinkedIn: () => {
    window.open('https://linkedin.com/company/tujitume', '_blank', 'noopener,noreferrer');
  },
  
  openWhatsApp: (message?: string) => {
    const phone = '254725165153'; // Tujitume phone number
    const text = message || 'Hello, I would like to know more about Tujitume programs.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  },
  
  callPhone: () => {
    window.location.href = 'tel:+254725165153';
  },
  
  sendEmail: (subject?: string, body?: string) => {
    const email = 'info@tujitume.org';
    const mailtoUrl = `mailto:${email}${subject ? '?subject=' + encodeURIComponent(subject) : ''}${body ? '&body=' + encodeURIComponent(body) : ''}`;
    window.location.href = mailtoUrl;
  }
};

// Social actions (aliases for external actions)
export const socialActions = {
  facebook: () => externalActions.openFacebook(),
  twitter: () => externalActions.openTwitter(),
  instagram: () => externalActions.openInstagram(),
  linkedin: () => externalActions.openLinkedIn(),
  whatsapp: (message?: string) => externalActions.openWhatsApp(message),
  email: (subject?: string, body?: string) => externalActions.sendEmail(subject, body),
  phone: () => externalActions.callPhone()
};

// Program-specific actions
export const programActions = {
  learnMoreEconomicEmpowerment: () => {
    formActions.openProgramInquiry('Economic Empowerment');
  },
  
  learnMoreEducation: () => {
    formActions.openProgramInquiry('Education & Capacity Building');
  },
  
  learnMoreGenderEquality: () => {
    formActions.openProgramInquiry('Gender Equality & Social Inclusion');
  },
  
  learnMoreClimateAction: () => {
    formActions.openProgramInquiry('Climate Change & Environmental Conservation');
  },
  
  learnMoreGovernance: () => {
    formActions.openProgramInquiry('Governance & Civic Engagement');
  },
  
  learnMoreArts: () => {
    formActions.openProgramInquiry('Arts, Culture & Sports');
  },
  
  learnMoreDigitalInclusion: () => {
    formActions.openProgramInquiry('Digital Inclusion & Innovation');
  }
};

// Call-to-action buttons
export const ctaActions = {
  getInvolved: () => {
    smoothScrollTo('get-involved-section');
  },
  
  donate: () => {
    formActions.openDonationForm();
  },
  
  volunteer: () => {
    formActions.openVolunteerForm();
  },
  
  partner: () => {
    formActions.openPartnershipForm();
  },
  
  joinProgram: () => {
    smoothScrollTo('programs-section');
  },
  
  explorePrograms: () => {
    smoothScrollTo('programs-section');
  },
  
  viewGallery: () => {
    const event = new CustomEvent('openModal', { 
      detail: { modalType: 'photo-gallery' }
    });
    window.dispatchEvent(event);
  },
  
  readMore: (articleId?: string) => {
    // Navigate to full article or open article modal
    const event = new CustomEvent('openModal', { 
      detail: { modalType: 'article', articleId }
    });
    window.dispatchEvent(event);
  },
  
  viewAllNews: () => {
    // Navigate to news page or show all news
    smoothScrollTo('news-section');
  },
  
  scheduleVisit: () => {
    formActions.openContactForm();
  }
};

// Utility functions for button feedback
export const buttonFeedback = {
  // Add loading state to button
  setLoading: (buttonElement: HTMLButtonElement, isLoading: boolean) => {
    if (isLoading) {
      buttonElement.disabled = true;
      buttonElement.style.opacity = '0.6';
      buttonElement.style.cursor = 'not-allowed';
    } else {
      buttonElement.disabled = false;
      buttonElement.style.opacity = '1';
      buttonElement.style.cursor = 'pointer';
    }
  },
  
  // Show success feedback
  showSuccess: (buttonElement: HTMLButtonElement, originalText: string, duration: number = 2000) => {
    const originalContent = buttonElement.innerHTML;
    buttonElement.innerHTML = '✓ Success!';
    buttonElement.style.backgroundColor = '#10b981';
    
    setTimeout(() => {
      buttonElement.innerHTML = originalContent;
      buttonElement.style.backgroundColor = '';
    }, duration);
  },
  
  // Show error feedback
  showError: (buttonElement: HTMLButtonElement, originalText: string, duration: number = 2000) => {
    const originalContent = buttonElement.innerHTML;
    buttonElement.innerHTML = '✗ Error';
    buttonElement.style.backgroundColor = '#ef4444';
    
    setTimeout(() => {
      buttonElement.innerHTML = originalContent;
      buttonElement.style.backgroundColor = '';
    }, duration);
  }
};

// Main button action dispatcher
export const handleButtonAction = (action: string, params?: any) => {
  switch (action) {
    // Navigation actions
    case 'scroll-to-home':
      return navigationActions.scrollToHome();
    case 'scroll-to-about':
      return navigationActions.scrollToAbout();
    case 'scroll-to-programs':
      return navigationActions.scrollToPrograms();
    case 'scroll-to-impact':
      return navigationActions.scrollToImpact();
    case 'scroll-to-get-involved':
      return navigationActions.scrollToGetInvolved();
    case 'scroll-to-contact':
      return navigationActions.scrollToContact();
      
    // Form actions
    case 'open-contact-form':
      return formActions.openContactForm();
    case 'open-program-inquiry':
      return formActions.openProgramInquiry(params?.program);
    case 'open-partnership-form':
      return formActions.openPartnershipForm();
    case 'open-volunteer-form':
      return formActions.openVolunteerForm();
    case 'open-donation-form':
      return formActions.openDonationForm(params?.program);
      
    // External actions
    case 'open-facebook':
      return externalActions.openFacebook();
    case 'open-twitter':
      return externalActions.openTwitter();
    case 'open-instagram':
      return externalActions.openInstagram();
    case 'open-linkedin':
      return externalActions.openLinkedIn();
    case 'open-whatsapp':
      return externalActions.openWhatsApp(params?.message);
    case 'call-phone':
      return externalActions.callPhone();
    case 'send-email':
      return externalActions.sendEmail(params?.subject, params?.body);
      
    // CTA actions
    case 'get-involved':
      return ctaActions.getInvolved();
    case 'donate':
      return ctaActions.donate();
    case 'volunteer':
      return ctaActions.volunteer();
    case 'partner':
      return ctaActions.partner();
    case 'join-program':
      return ctaActions.joinProgram();
    case 'view-gallery':
      return ctaActions.viewGallery();
      
    default:
      console.warn(`Unknown button action: ${action}`);
  }
};

// Default empty functions to prevent errors
const createEmptyAction = () => () => {
  console.warn('Button action called but not available');
};

const createEmptyActions = (keys: string[]) => {
  return keys.reduce((acc, key) => {
    acc[key] = createEmptyAction();
    return acc;
  }, {} as any);
};

// Hook for easy button action handling
export const useButtonAction = () => {
  try {
    return {
      handleAction: handleButtonAction || createEmptyAction(),
      navigationActions: navigationActions || createEmptyActions(['scrollTo', 'scrollToHome', 'scrollToAbout', 'scrollToPrograms', 'scrollToImpact', 'scrollToGetInvolved', 'scrollToContact']),
      formActions: formActions || createEmptyActions(['openContactForm', 'openProgramInquiry', 'openPartnershipForm', 'openVolunteerForm', 'openDonationForm', 'openEventRegistration', 'openNewsletterSubscription']),
      externalActions: externalActions || createEmptyActions(['openFacebook', 'openTwitter', 'openInstagram', 'openLinkedIn', 'openWhatsApp', 'callPhone', 'sendEmail']),
      socialActions: socialActions || createEmptyActions(['facebook', 'twitter', 'instagram', 'linkedin', 'whatsapp', 'email', 'phone']),
      programActions: programActions || createEmptyActions(['learnMoreEconomicEmpowerment', 'learnMoreEducation', 'learnMoreGenderEquality']),
      ctaActions: ctaActions || createEmptyActions(['getInvolved', 'donate', 'volunteer', 'partner', 'explorePrograms', 'joinProgram', 'viewGallery']),
      buttonFeedback: buttonFeedback || createEmptyActions(['setLoading', 'showSuccess', 'showError'])
    };
  } catch (error) {
    console.error('Error in useButtonAction hook:', error);
    // Return completely safe fallback
    return {
      handleAction: createEmptyAction(),
      navigationActions: createEmptyActions(['scrollTo', 'scrollToHome', 'scrollToAbout', 'scrollToPrograms', 'scrollToImpact', 'scrollToGetInvolved', 'scrollToContact']),
      formActions: createEmptyActions(['openContactForm', 'openProgramInquiry', 'openPartnershipForm', 'openVolunteerForm', 'openDonationForm', 'openEventRegistration', 'openNewsletterSubscription']),
      externalActions: createEmptyActions(['openFacebook', 'openTwitter', 'openInstagram', 'openLinkedIn', 'openWhatsApp', 'callPhone', 'sendEmail']),
      socialActions: createEmptyActions(['facebook', 'twitter', 'instagram', 'linkedin', 'whatsapp', 'email', 'phone']),
      programActions: createEmptyActions(['learnMoreEconomicEmpowerment', 'learnMoreEducation', 'learnMoreGenderEquality']),
      ctaActions: createEmptyActions(['getInvolved', 'donate', 'volunteer', 'partner', 'explorePrograms', 'joinProgram', 'viewGallery']),
      buttonFeedback: createEmptyActions(['setLoading', 'showSuccess', 'showError'])
    };
  }
};
