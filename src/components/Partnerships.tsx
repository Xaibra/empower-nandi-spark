import { Button } from "@/components/ui/button";
import { useButtonAction } from "@/utils/buttonActions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  Award,
  Globe,
  Heart,
  Sparkles,
  ArrowRight,
  Building,
  Handshake,
  Target,
  Star,
  CheckCircle,
  Calendar,
  DollarSign,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";

const Partnerships = () => {
  const { formActions } = useButtonAction();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('partnerships-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const partnerCategories = [
    { id: "all", label: "All Partners", icon: Globe },
    { id: "funding", label: "Funding Partners", icon: DollarSign },
    { id: "implementing", label: "Implementation", icon: Target },
    { id: "government", label: "Government", icon: Building },
    { id: "community", label: "Community", icon: Users }
  ];

  const partners = [
    {
      name: "UN Women Kenya",
      category: "funding",
      type: "International Development Agency",
      partnership: "2025 - Present",
      focus: "Women's Economic Empowerment & Gender Equality",
      contribution: "USD 45,000 funding for women-focused programs",
      impact: "300+ women reached with economic empowerment training",
      logo: "/partners/un-women.png",
      website: "https://kenya.unwomen.org/",
      status: "active"
    },
    {
      name: "Nandi County Government",
      category: "government", 
      type: "County Government",
      partnership: "2025 - Present",
      focus: "Youth Development & Skills Training",
      contribution: "Office space, training venues, and policy support",
      impact: "Official recognition and policy integration support",
      logo: "/partners/nandi-county.png",
      website: "https://nandicounty.go.ke/",
      status: "active"
    },
    {
      name: "Kenya Community Development Foundation",
      category: "implementing",
      type: "Local Foundation",
      partnership: "2025 - Present",
      focus: "Capacity Building & Organizational Development",
      contribution: "Technical assistance and training programs",
      impact: "Enhanced organizational systems and staff capacity",
      logo: "/partners/kcdf.png", 
      website: "https://kcdf.or.ke/",
      status: "active"
    },
    {
      name: "World Vision Kenya",
      category: "funding",
      type: "International NGO",
      partnership: "2025 - Present",
      focus: "Child Protection & Education",
      contribution: "KES 2.5M for education and child protection programs", 
      impact: "150+ children supported with education scholarships",
      logo: "/partners/world-vision.png",
      website: "https://www.worldvision.or.ke/",
      status: "active"
    },
    {
      name: "Kenya Red Cross Society",
      category: "implementing",
      type: "Humanitarian Organization", 
      partnership: "2025 - Present",
      focus: "Emergency Response & Health Programs",
      contribution: "Training in first aid and emergency preparedness",
      impact: "50+ community members trained as first responders",
      logo: "/partners/kenya-redcross.png",
      website: "https://www.redcross.or.ke/",
      status: "active"
    },
    {
      name: "Mastercard Foundation",
      category: "funding",
      type: "Private Foundation",
      partnership: "2025 - Present",
      focus: "Youth Employment & Entrepreneurship",
      contribution: "USD 25,000 for youth entrepreneurship program", 
      impact: "100+ youth trained in business and digital skills",
      logo: "/partners/mastercard-foundation.png",
      website: "https://mastercardfdnk.org/",
      status: "active"
    },
    {
      name: "Moi University",
      category: "implementing", 
      type: "Academic Institution",
      partnership: "2025 - Present",
      focus: "Research & Student Internships",
      contribution: "Research collaboration and student placements",
      impact: "Annual research on program effectiveness and community needs",
      logo: "/partners/moi-university.png",
      website: "https://www.mu.ac.ke/",
      status: "active"
    },
    {
      name: "Local Churches Network",
      category: "community",
      type: "Faith-Based Organizations", 
      partnership: "2025 - Present",
      focus: "Community Mobilization & Venues",
      contribution: "Meeting spaces and community outreach support",
      impact: "Reached 2,000+ community members through church networks",
      logo: "/partners/churches-network.png",
      website: "#",
      status: "active"
    }
  ];

  const recognitions = [
    {
      title: "Best Youth-Led CBO Award",
      organization: "Nandi County Government",
      year: "2025",
      description: "Recognized for outstanding contribution to youth development and community empowerment.",
      icon: Award,
      color: "text-secondary"
    },
    {
      title: "UN Women Community Champion",
      organization: "UN Women Kenya", 
      year: "2025",
      description: "Awarded for excellence in promoting women's economic empowerment and gender equality.",
      icon: Star,
      color: "text-primary"
    },
    {
      title: "Digital Inclusion Pioneer",
      organization: "Kenya ICT Board",
      year: "2023", 
      description: "Recognized for innovative approach to digital literacy in rural communities.",
      icon: Zap,
      color: "text-accent"
    },
    {
      title: "Community Development Excellence",
      organization: "KCDF",
      year: "2025",
      description: "Acknowledged for sustainable community development practices and impact.",
      icon: Heart,
      color: "text-community"
    }
  ];

  const partnershipStats = [
    { value: "15+", label: "Active Partnerships", icon: Handshake, color: "text-secondary" },
    { value: "KES 8M+", label: "Total Funding Secured", icon: DollarSign, color: "text-primary" },
    { value: "8+ months", label: "Partnership Growth", icon: Calendar, color: "text-accent" },
    { value: "100%", label: "Partnership Retention Rate", icon: CheckCircle, color: "text-community" }
  ];

  const filteredPartners = activeCategory === "all" 
    ? partners 
    : partners.filter(partner => partner.category === activeCategory);

  return (
    <section id="partnerships-section" className="py-20 bg-gradient-to-br from-background to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-16 w-40 h-40 bg-secondary rounded-full animate-float-particles"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-primary rounded-full animate-float-particles" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-80 right-32 w-24 h-24 bg-accent rounded-full animate-float-particles" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-secondary mr-2 animate-bounce-slow" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wide">Our Network</span>
            <Sparkles className="h-6 w-6 text-secondary ml-2 animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Partners in <span className="text-brand-gradient">Progress</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Building a network of trust and collaboration with organizations that share our vision for empowered communities
          </p>
        </div>

        {/* Partnership Statistics */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {partnershipStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 hover:border-secondary/20">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-gradient-brand rounded-full mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Partner Categories Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {partnerCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="gap-2 transition-all duration-300"
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Partners Grid */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our <span className="text-secondary">Partners</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Strategic alliances that amplify our impact and extend our reach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner, index) => (
              <Card 
                key={index}
                className="group transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 hover:border-secondary/20 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Partner Logo Placeholder */}
                    <div className="h-32 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center relative">
                      <div className="w-20 h-20 bg-gradient-community rounded-2xl flex items-center justify-center">
                        <Building className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant={partner.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {partner.status === 'active' ? 'Active' : 'Completed'}
                        </Badge>
                      </div>
                    </div>

                    {/* Partner Info */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                          {partner.name}
                        </h4>
                        <p className="text-secondary font-semibold text-sm mb-2">{partner.type}</p>
                        <div className="flex items-center text-xs text-muted-foreground mb-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{partner.partnership}</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <h5 className="text-sm font-semibold text-primary mb-1">Focus Area</h5>
                          <p className="text-xs text-muted-foreground">{partner.focus}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-semibold text-primary mb-1">Contribution</h5>
                          <p className="text-xs text-muted-foreground">{partner.contribution}</p>
                        </div>

                        <div>
                          <h5 className="text-sm font-semibold text-primary mb-1">Impact</h5>
                          <p className="text-xs text-muted-foreground">{partner.impact}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs capitalize">
                          {partner.category.replace('_', ' ')}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2 text-xs group-hover:bg-secondary group-hover:text-white transition-all duration-300"
                          onClick={formActions.openContactForm}
                        >
                          <Globe className="h-3 w-3 mr-1" />
                          Visit Site
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recognition & Awards */}
        <div className={`mb-16 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Recognition & <span className="text-secondary">Awards</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              External validation of our commitment to excellence and community impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recognitions.map((recognition, index) => {
              const Icon = recognition.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 hover:border-secondary/20 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-gradient-brand rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className={`h-8 w-8 text-white`} />
                      </div>
                      
                      <Badge variant="secondary" className="mb-3 text-xs">
                        {recognition.year}
                      </Badge>
                      
                      <h4 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                        {recognition.title}
                      </h4>
                      
                      <p className="text-sm text-secondary font-semibold mb-3">
                        {recognition.organization}
                      </p>
                      
                      <p className="text-xs text-muted-foreground text-center leading-relaxed group-hover:text-foreground transition-colors duration-300">
                        {recognition.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Partnership Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Card className="p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-2 border-secondary/20 max-w-4xl mx-auto">
            <CardContent className="p-0">
              <Handshake className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Partner With <span className="text-secondary">Us</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join our network of changemakers and help us create lasting impact in Nandi County. 
                Together, we can achieve more than we ever could alone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="group"
                  onClick={formActions.openPartnershipForm}
                >
                  <span className="mr-2">Explore Partnership</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={formActions.openContactForm}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Corporate Partnerships
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
