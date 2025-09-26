import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import TujitumeLogo from "@/assets/tujitume-logo.svg";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Impact", href: "#impact" },
    { name: "Get Involved", href: "#get-involved" },
    { name: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1));
      let currentSection = sections[0];
      
      for (const section of sections) {
        const element = document.getElementById(section === 'home' ? 'hero-section' : `${section}-section`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  const smoothScrollTo = (href: string) => {
    const targetId = href === '#home' ? 'hero-section' : `${href.slice(1)}-section`;
    const element = document.getElementById(targetId);
    
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-md shadow-lg border-b border-border/50' 
        : 'bg-white/95 backdrop-blur-sm border-b border-border/30'
    }`}>
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo with Animation */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <img 
                src={TujitumeLogo} 
                alt="Tujitume Youth & Women CBO" 
                className={`transition-all duration-500 group-hover:scale-110 ${
                  isScrolled ? 'h-10 w-auto' : 'h-12 w-auto'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-transparent opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
            </div>
            <div className={`hidden sm:block transition-all duration-500 ${
              isScrolled ? 'scale-95' : 'scale-100'
            }`}>
              <div className="font-bold text-primary text-lg group-hover:text-secondary transition-colors duration-300">Tujitume</div>
              <div className="text-xs text-muted-foreground group-hover:text-accent transition-colors duration-300">Youth & Women CBO</div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.name}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(item.href);
                  }}
                  className={`group relative px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 transform active:scale-95 ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-secondary to-orange-500 shadow-lg' 
                      : 'text-foreground hover:text-secondary hover:bg-secondary/5'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10 transition-all duration-300">{item.name}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-orange-500 rounded-full animate-scale-in shadow-glow"></div>
                  )}
                  {!isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-secondary to-orange-500 transition-all duration-300 group-hover:w-full"></div>
                  )}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 bg-gradient-to-r from-secondary to-orange-500 transition-all duration-300"></div>
                </button>
              );
            })}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="group hover:scale-105 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
            >
              <span>Join Program</span>
              <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              className="group hover:scale-105 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 shadow-warm"
            >
              <span>Donate</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
          </div>

          {/* Enhanced Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:scale-110 transition-all duration-300 hover:bg-secondary/10 hover:text-secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-5 h-5">
              <Menu className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'}`} />
              <X className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`} />
            </div>
          </Button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pt-4 border-t border-border/30 mt-4">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo(item.href);
                      setIsMenuOpen(false);
                    }}
                    className={`group flex items-center justify-between p-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-secondary to-orange-500 shadow-lg'
                        : 'text-foreground hover:text-secondary hover:bg-secondary/5'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="transition-all duration-300">{item.name}</span>
                    <ChevronRight className={`h-4 w-4 transition-all duration-300 ${
                      isActive ? 'opacity-100 translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                    }`} />
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col space-y-2 pt-4 mt-4 border-t border-border/20">
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start hover:bg-primary/10 hover:text-primary transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Program
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="justify-start shadow-warm hover:shadow-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Donate
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;