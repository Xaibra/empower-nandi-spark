import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import ErrorBoundary from '@/components/ErrorBoundary';
// Import other forms as we create them
// import ProgramInquiryForm from '@/components/forms/ProgramInquiryForm';
// import PartnershipForm from '@/components/forms/PartnershipForm';
// import VolunteerForm from '@/components/forms/VolunteerForm';
// import DonationForm from '@/components/forms/DonationForm';

interface ModalData {
  modalType: string;
  program?: string;
  eventId?: string;
  eventTitle?: string;
  articleId?: string;
}

const ModalSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      try {
        if (event.detail && typeof event.detail === 'object') {
          setModalData(event.detail);
          setIsOpen(true);
        } else {
          console.warn('Invalid modal data received:', event.detail);
        }
      } catch (error) {
        console.error('Error handling modal open event:', error);
      }
    };

    // Listen for modal open events
    window.addEventListener('openModal' as any, handleOpenModal);

    return () => {
      window.removeEventListener('openModal' as any, handleOpenModal);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Delay clearing modal data to allow exit animation
    setTimeout(() => setModalData(null), 300);
  };

  const getModalContent = () => {
    if (!modalData || !modalData.modalType) return null;

    try {
      switch (modalData.modalType) {
      case 'contact':
        return {
          title: 'Contact Us',
          description: 'Get in touch with our team. We\'d love to hear from you!',
          component: <ContactForm onSuccess={handleClose} />
        };

      case 'program-inquiry':
        return {
          title: `Program Inquiry${modalData.program ? `: ${modalData.program}` : ''}`,
          description: 'Tell us about your interest in our programs',
          component: (
            <div className="p-6">
              <p>Program Inquiry Form coming soon!</p>
              <p>Program: {modalData.program}</p>
              {/* <ProgramInquiryForm program={modalData.program} onSuccess={handleClose} /> */}
            </div>
          )
        };

      case 'partnership':
        return {
          title: 'Partnership Proposal',
          description: 'Let\'s explore how we can work together',
          component: (
            <div className="p-6">
              <p>Partnership Form coming soon!</p>
              {/* <PartnershipForm onSuccess={handleClose} /> */}
            </div>
          )
        };

      case 'volunteer':
        return {
          title: 'Volunteer Application',
          description: 'Join our team of dedicated volunteers',
          component: (
            <div className="p-6">
              <p>Volunteer Form coming soon!</p>
              {/* <VolunteerForm onSuccess={handleClose} /> */}
            </div>
          )
        };

      case 'donation':
        return {
          title: 'Make a Donation',
          description: 'Support our mission with a generous contribution',
          component: (
            <div className="p-6">
              <p>Donation Form coming soon!</p>
              <p>Program: {modalData.program || 'General Fund'}</p>
              {/* <DonationForm program={modalData.program} onSuccess={handleClose} /> */}
            </div>
          )
        };

      case 'event-registration':
        return {
          title: `Register for ${modalData.eventTitle}`,
          description: 'Secure your spot for this exciting event',
          component: (
            <div className="p-6">
              <p>Event Registration Form coming soon!</p>
              <p>Event: {modalData.eventTitle}</p>
              <p>Event ID: {modalData.eventId}</p>
              {/* <EventRegistrationForm eventId={modalData.eventId} eventTitle={modalData.eventTitle} onSuccess={handleClose} /> */}
            </div>
          )
        };

      case 'newsletter':
        return {
          title: 'Subscribe to Our Newsletter',
          description: 'Stay updated with our latest news and programs',
          component: (
            <div className="p-6">
              <p>Newsletter Signup coming soon!</p>
              {/* <NewsletterForm onSuccess={handleClose} /> */}
            </div>
          )
        };

      case 'photo-gallery':
        return {
          title: 'Photo Gallery',
          description: 'View our activities and impact in action',
          component: (
            <div className="p-6">
              <p>Photo Gallery coming soon!</p>
              {/* <PhotoGalleryModal onClose={handleClose} /> */}
            </div>
          )
        };

      case 'article':
        return {
          title: 'Article Details',
          description: 'Read the full story',
          component: (
            <div className="p-6">
              <p>Article viewer coming soon!</p>
              <p>Article ID: {modalData.articleId}</p>
              {/* <ArticleViewer articleId={modalData.articleId} onClose={handleClose} /> */}
            </div>
          )
        };

      default:
        return {
          title: 'Coming Soon',
          description: 'This feature is under development',
          component: (
            <div className="p-6">
              <p>This feature is coming soon!</p>
              <p>Modal Type: {modalData.modalType}</p>
            </div>
          )
        };
      }
    } catch (error) {
      console.error('Error rendering modal content:', error);
      return {
        title: 'Error',
        description: 'Sorry, there was an error displaying this content',
        component: (
          <div className="p-6 text-center">
            <p className="text-red-600">An error occurred while loading this content.</p>
            <p className="text-sm text-muted-foreground mt-2">Please try again later.</p>
          </div>
        )
      };
    }
  };

  const modalContent = getModalContent();

  return (
    <ErrorBoundary>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] overflow-y-auto"
          onPointerDownOutside={(e) => {
            // Allow closing by clicking outside
            handleClose();
          }}
        >
          {/* Custom Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>

          {modalContent && (
            <>
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-2xl font-bold text-primary">
                  {modalContent.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {modalContent.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6">
                <ErrorBoundary>
                  {modalContent.component}
                </ErrorBoundary>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </ErrorBoundary>
  );
};

export default ModalSystem;