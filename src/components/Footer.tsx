import { Button } from "@/components/ui/button";
import { useButtonAction } from "@/utils/buttonActions";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowUp,
  Heart
} from "lucide-react";
import { useState, useEffect } from "react";
import TujitumeLogo from "@/assets/tujitume-logo.svg";

const Footer = () => {
  const buttonActions = useButtonAction();
  const { socialActions, formActions, navigationActions, ctaActions } = buttonActions || {};
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Impact Stories", href: "#impact" },
    { name: "Get Involved", href: "#get-involved" },
    { name: "News & Events", href: "#news" },
    { name: "Contact", href: "#contact" }
  ];

  const programs = [
    "Economic Empowerment",
    "Education & Capacity Building",
    "Gender Equality & Social Inclusion",
    "Climate Change & Environmental Conservation",
    "Governance & Civic Engagement",
    "Arts, Culture & Sports",
    "Digital Inclusion & Innovation"
  ];

  return (
    <>
      <footer className="bg-primary text-primary-foreground relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-20 h-20 border border-white/10 rounded-full animate-float-particles"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${8 + i}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Enhanced Organization Info */}
            <div className="space-y-6 animate-slide-in-left">
              <div className="group flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <img 
                    src={TujitumeLogo} 
                    alt="Tujitume Youth & Women CBO" 
                    className="h-12 w-auto brightness-0 invert group-hover:scale-110 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                </div>
                <div>
                  <div className="font-bold text-xl group-hover:text-secondary transition-colors duration-300">Tujitume</div>
                  <div className="text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300">Youth & Women CBO</div>
                </div>
              </div>
              
              <p className="text-sm opacity-90 leading-relaxed hover:opacity-100 transition-opacity duration-300">
                Founded by Noeline Maru to address root causes of poverty and violence, 
                we create platforms for empowerment, mentorship, and opportunities that break cycles of hopelessness and transform communities.
              </p>
              
              {/* Enhanced Social Links */}
              <div className="flex space-x-2">
                {socialLinks?.map((social, index) => {
                  const Icon = social?.icon;
                  if (!Icon || !social) return null;
                  
                  const getClickHandler = () => {
                    if (!socialActions) return () => {};
                    
                    switch (social.label) {
                      case 'Facebook': return socialActions.facebook || (() => {});
                      case 'Twitter': return socialActions.twitter || (() => {});
                      case 'Instagram': return socialActions.instagram || (() => {});
                      case 'LinkedIn': return socialActions.linkedin || (() => {});
                      case 'Email': return socialActions.email || (() => {});
                      default: return () => {};
                    }
                  };
                  
                  return (
                    <Button
                      key={social.label || index}
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-primary-foreground hover:bg-secondary hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={getClickHandler()}
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Quick Links */}
            <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <h4 className="font-semibold text-xl mb-6 text-secondary">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks?.map((link, index) => {
                  if (!link) return null;
                  
                  const getClickHandler = () => {
                    if (!navigationActions || !ctaActions || !formActions) return () => {};
                    
                    switch (link.href) {
                      case '#about': return () => navigationActions.scrollTo?.('about-section');
                      case '#programs': return () => navigationActions.scrollTo?.('programs-section');
                      case '#impact': return () => navigationActions.scrollTo?.('impact-section');
                      case '#get-involved': return ctaActions.getInvolved || (() => {});
                      case '#news': return () => navigationActions.scrollTo?.('news-section');
                      default: return formActions.openContactForm || (() => {});
                    }
                  };
                  
                  return (
                    <li key={link.name || index} style={{ animationDelay: `${index * 0.1}s` }}>
                      <button
                        onClick={getClickHandler()}
                        className="group text-sm opacity-90 hover:opacity-100 hover:text-secondary transition-all duration-300 flex items-center hover:translate-x-2"
                      >
                        <span className="w-0 group-hover:w-4 h-0.5 bg-secondary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {link.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Enhanced Programs */}
            <div className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              <h4 className="font-semibold text-xl mb-6 text-secondary">Our Programs</h4>
              <ul className="space-y-3">
                {programs?.map((program, index) => {
                  if (!program) return null;
                  return (
                    <li key={program} style={{ animationDelay: `${index * 0.1}s` }}>
                      <span className="text-sm opacity-90 hover:opacity-100 hover:text-secondary transition-all duration-300 cursor-pointer flex items-center group">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                        {program}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Enhanced Contact Info */}
            <div className="animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
              <h4 className="font-semibold text-xl mb-6 text-secondary">Contact Us</h4>
              <div className="space-y-4">
                <div className="group flex items-start space-x-3 hover:bg-white/5 p-3 rounded-lg transition-all duration-300 cursor-pointer">
                  <MapPin className="h-5 w-5 mt-1 text-secondary flex-shrink-0 group-hover:animate-bounce" />
                  <span className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    Chepterit Center, Nandi County, Kenya
                  </span>
                </div>
                <div className="group flex items-center space-x-3 hover:bg-white/5 p-3 rounded-lg transition-all duration-300 cursor-pointer">
                  <Phone className="h-5 w-5 text-secondary flex-shrink-0 group-hover:animate-bounce" />
                  <span className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    +254 700 000 000
                  </span>
                </div>
                <div className="group flex items-center space-x-3 hover:bg-white/5 p-3 rounded-lg transition-all duration-300 cursor-pointer">
                  <Mail className="h-5 w-5 text-secondary flex-shrink-0 group-hover:animate-bounce" />
                  <span className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    info@tujitume.org
                  </span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                <h5 className="font-semibold mb-3 text-secondary">Office Hours</h5>
                <p className="text-sm opacity-90 leading-relaxed">
                  Monday - Friday: <span className="text-secondary font-medium">8:00 AM - 5:00 PM</span><br />
                  Saturday: <span className="text-secondary font-medium">9:00 AM - 1:00 PM</span>
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div className="border-t border-white/20 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm opacity-80 flex items-center">
                © 2023-2025 Tujitume Youth and Women CBO. Made with
                <Heart className="h-4 w-4 text-secondary mx-2 animate-pulse" /> 
                in Nandi County, Kenya
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#privacy" className="opacity-80 hover:opacity-100 hover:text-secondary transition-all duration-300 hover:underline">
                  Privacy Policy
                </a>
                <a href="#terms" className="opacity-80 hover:opacity-100 hover:text-secondary transition-all duration-300 hover:underline">
                  Terms of Use
                </a>
                <a href="#safeguarding" className="opacity-80 hover:opacity-100 hover:text-secondary transition-all duration-300 hover:underline">
                  Safeguarding
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-secondary hover:bg-secondary/90 text-white shadow-brand hover:shadow-glow transition-all duration-300 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        } hover:scale-110 hover:-translate-y-1`}
        size="icon"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </>
  );
};

export default Footer;