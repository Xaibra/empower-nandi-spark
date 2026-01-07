import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define interfaces for all data types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  achievements: string[];
  expertise: string[];
  contact: string;
  phone: string;
  image: string;
  color: string;
  isActive: boolean;
  joinDate: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  type: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  views: number;
  shares: number;
  image: string;
  status: 'draft' | 'published' | 'scheduled';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  registrationOpen: boolean;
}

export interface Partnership {
  id: string;
  name: string;
  category: string;
  type: string;
  partnership: string;
  focus: string;
  contribution: string;
  impact: string;
  logo: string;
  website: string;
  status: string;
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  location: string;
  program: string;
  role: string;
  quote: string;
  story: string;
  impact: string;
  image: string;
  video: string;
  featured: boolean;
}

export interface SiteSettings {
  organizationName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  logo: string;
}

interface DataContextType {
  // Data
  teamMembers: TeamMember[];
  newsArticles: NewsArticle[];
  events: Event[];
  partnerships: Partnership[];
  testimonials: Testimonial[];
  siteSettings: SiteSettings;
  
  // Team Management
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  getTeamMember: (id: string) => TeamMember | undefined;
  
  // News Management
  addNewsArticle: (article: Omit<NewsArticle, 'id'>) => void;
  updateNewsArticle: (id: string, article: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;
  getPublishedArticles: () => NewsArticle[];
  
  // Event Management
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getUpcomingEvents: () => Event[];
  
  // Partnership Management
  addPartnership: (partnership: Omit<Partnership, 'id'>) => void;
  updatePartnership: (id: string, partnership: Partial<Partnership>) => void;
  deletePartnership: (id: string) => void;
  
  // Testimonial Management
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  getFeaturedTestimonials: () => Testimonial[];
  
  // Settings Management
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  
  // Utility
  saveData: () => void;
  loadData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Initial data - in production, this would come from a database
const initialData = {
  teamMembers: [
    {
      id: '1',
      name: 'Noeline Maru',
      role: 'Founder & Executive Director',
      department: 'Leadership',
      bio: 'Born and raised in Chepterit Center, Noeline founded Tujitume after witnessing the devastating impact of poverty, drugs, and gender-based violence in her community. Her personal experience losing a family member to illicit brews became the catalyst for creating comprehensive community transformation programs.',
      achievements: [
        'Founded Tujitume Youth & Women CBO in 2023 with vision for holistic community transformation',
        'Developed comprehensive 7-program framework addressing root causes of poverty and inequality',
        'Mobilized community support across 8 sub-counties in Nandi County'
      ],
      expertise: ['Community Development', 'Women\'s Empowerment', 'Gender-Based Violence Prevention', 'Youth Mentorship'],
      contact: 'n.maru@tujitume.org',
      phone: '+254 712 345 678',
      image: '/team/noeline-maru.jpg',
      color: 'secondary',
      isActive: true,
      joinDate: '2023-01-01'
    },
    {
      id: '2',
      name: 'James Kosgei',
      role: 'Programs Manager',
      department: 'Operations',
      bio: 'With a background in project management and community organizing, James oversees the implementation of all Tujitume programs.',
      achievements: [
        'Successfully managed 8 concurrent programs across multiple locations',
        'Developed comprehensive M&E framework adopted by partner organizations',
        'Masters in Development Studies from University of Nairobi'
      ],
      expertise: ['Project Management', 'Monitoring & Evaluation', 'Community Mobilization'],
      contact: 'j.kosgei@tujitume.org',
      phone: '+254 720 987 654',
      image: '/team/james-kosgei.jpg',
      color: 'primary',
      isActive: true,
      joinDate: '2023-06-01'
    }
  ] as TeamMember[],
  
  newsArticles: [
    {
      id: '1',
      title: '500 Youth Graduated from Digital Skills Program',
      excerpt: 'Our largest cohort yet completes comprehensive digital literacy training, with 90% securing employment or starting digital businesses within 6 months.',
      content: 'Full article content would go here...',
      category: 'achievements',
      type: 'article',
      author: 'Sarah Kimutai',
      date: '2025-11-15',
      readTime: '4 min',
      tags: ['Digital Skills', 'Youth Employment', 'Success Story'],
      featured: true,
      views: 1250,
      shares: 45,
      image: '/news/digital-skills-graduation.jpg',
      status: 'published' as const
    }
  ] as NewsArticle[],
  
  events: [
    {
      id: '1',
      title: 'Women\'s Economic Empowerment Workshop',
      description: 'Join us for a comprehensive workshop on economic empowerment strategies for women in Nandi County.',
      date: '2025-12-15',
      time: '9:00 AM',
      location: 'Kapsabet Community Center',
      type: 'Workshop',
      participants: 50,
      status: 'upcoming' as const,
      registrationOpen: true
    }
  ] as Event[],
  
  partnerships: [
    {
      id: '1',
      name: 'UN Women Kenya',
      category: 'funding',
      type: 'International Development Agency',
      partnership: '2025 - Present',
      focus: 'Women\'s Economic Empowerment & Gender Equality',
      contribution: 'USD 45,000 funding for women-focused programs',
      impact: '300+ women reached with economic empowerment training',
      logo: '/partners/un-women.png',
      website: 'https://kenya.unwomen.org/',
      status: 'active'
    }
  ] as Partnership[],
  
  testimonials: [
    {
      id: '1',
      name: 'Mary Chebet',
      age: 24,
      location: 'Kapsabet, Nandi County',
      program: 'Economic Empowerment',
      role: 'Small Business Owner',
      quote: 'Tujitume didn\'t just teach me business skills - they believed in my potential when no one else did.',
      story: 'Full story would go here...',
      impact: 'Increased monthly income by 600%',
      image: '/testimonials/mary-chebet.jpg',
      video: '/testimonials/mary-story.mp4',
      featured: true
    }
  ] as Testimonial[],
  
  siteSettings: {
    organizationName: 'Tujitume Youth & Women CBO',
    tagline: 'Let Us Push Ourselves to Transform Communities',
    description: 'Founded by Noeline Maru, Tujitume addresses the root causes of poverty, inequality, and violence through comprehensive programs spanning economic empowerment, education, gender equality, climate action, governance, arts & culture, and digital inclusion across Nandi County.',
    email: 'info@tujitume.org',
    phone: '+254725165153',
    address: 'Chepterit Center, Nandi County, Kenya',
    socialMedia: {
      facebook: 'https://facebook.com/tujitume',
      twitter: 'https://twitter.com/tujitume',
      instagram: 'https://instagram.com/tujitume',
      linkedin: 'https://linkedin.com/company/tujitume'
    },
    logo: '/tujitume-logo.svg'
  } as SiteSettings
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialData.teamMembers);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(initialData.newsArticles);
  const [events, setEvents] = useState<Event[]>(initialData.events);
  const [partnerships, setPartnerships] = useState<Partnership[]>(initialData.partnerships);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialData.testimonials);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialData.siteSettings);

  // Load data from localStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Team Management
  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...member,
      id: Date.now().toString()
    };
    setTeamMembers(prev => [...prev, newMember]);
    saveData();
  };

  const updateTeamMember = (id: string, memberUpdate: Partial<TeamMember>) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id ? { ...member, ...memberUpdate } : member
    ));
    saveData();
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
    saveData();
  };

  const getTeamMember = (id: string) => {
    return teamMembers.find(member => member.id === id);
  };

  // News Management
  const addNewsArticle = (article: Omit<NewsArticle, 'id'>) => {
    const newArticle: NewsArticle = {
      ...article,
      id: Date.now().toString()
    };
    setNewsArticles(prev => [...prev, newArticle]);
    saveData();
  };

  const updateNewsArticle = (id: string, articleUpdate: Partial<NewsArticle>) => {
    setNewsArticles(prev => prev.map(article => 
      article.id === id ? { ...article, ...articleUpdate } : article
    ));
    saveData();
  };

  const deleteNewsArticle = (id: string) => {
    setNewsArticles(prev => prev.filter(article => article.id !== id));
    saveData();
  };

  const getPublishedArticles = () => {
    return newsArticles.filter(article => article.status === 'published');
  };

  // Event Management
  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString()
    };
    setEvents(prev => [...prev, newEvent]);
    saveData();
  };

  const updateEvent = (id: string, eventUpdate: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...eventUpdate } : event
    ));
    saveData();
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    saveData();
  };

  const getUpcomingEvents = () => {
    return events.filter(event => event.status === 'upcoming');
  };

  // Partnership Management
  const addPartnership = (partnership: Omit<Partnership, 'id'>) => {
    const newPartnership: Partnership = {
      ...partnership,
      id: Date.now().toString()
    };
    setPartnerships(prev => [...prev, newPartnership]);
    saveData();
  };

  const updatePartnership = (id: string, partnershipUpdate: Partial<Partnership>) => {
    setPartnerships(prev => prev.map(partnership => 
      partnership.id === id ? { ...partnership, ...partnershipUpdate } : partnership
    ));
    saveData();
  };

  const deletePartnership = (id: string) => {
    setPartnerships(prev => prev.filter(partnership => partnership.id !== id));
    saveData();
  };

  // Testimonial Management
  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: Date.now().toString()
    };
    setTestimonials(prev => [...prev, newTestimonial]);
    saveData();
  };

  const updateTestimonial = (id: string, testimonialUpdate: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === id ? { ...testimonial, ...testimonialUpdate } : testimonial
    ));
    saveData();
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
    saveData();
  };

  const getFeaturedTestimonials = () => {
    return testimonials.filter(testimonial => testimonial.featured);
  };

  // Settings Management
  const updateSiteSettings = (settingsUpdate: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...settingsUpdate }));
    saveData();
  };

  // Data Persistence
  const saveData = () => {
    try {
      const data = {
        teamMembers,
        newsArticles,
        events,
        partnerships,
        testimonials,
        siteSettings
      };
      localStorage.setItem('tujitume_admin_data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadData = () => {
    try {
      const savedData = localStorage.getItem('tujitume_admin_data');
      if (savedData) {
        const data = JSON.parse(savedData);
        if (data.teamMembers) setTeamMembers(data.teamMembers);
        if (data.newsArticles) setNewsArticles(data.newsArticles);
        if (data.events) setEvents(data.events);
        if (data.partnerships) setPartnerships(data.partnerships);
        if (data.testimonials) setTestimonials(data.testimonials);
        if (data.siteSettings) setSiteSettings(data.siteSettings);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const contextValue: DataContextType = {
    // Data
    teamMembers,
    newsArticles,
    events,
    partnerships,
    testimonials,
    siteSettings,
    
    // Team Management
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    getTeamMember,
    
    // News Management
    addNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    getPublishedArticles,
    
    // Event Management
    addEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents,
    
    // Partnership Management
    addPartnership,
    updatePartnership,
    deletePartnership,
    
    // Testimonial Management
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    getFeaturedTestimonials,
    
    // Settings Management
    updateSiteSettings,
    
    // Utility
    saveData,
    loadData
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
