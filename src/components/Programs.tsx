import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useButtonAction } from "@/utils/buttonActions";
import { 
  DollarSign, 
  GraduationCap, 
  Shield, 
  Heart, 
  Leaf, 
  Vote, 
  Palette, 
  Smartphone,
  ArrowRight,
  Sparkles
} from "lucide-react";

const Programs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { formActions, ctaActions } = useButtonAction();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('programs-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  const programs = [
    {
      icon: DollarSign,
      title: "Economic Empowerment & Livelihoods",
      description: "Training, incubation, and access to finance for resilient incomes.",
      highlights: ["Vocational training", "Business incubation", "Microfinance access", "Market linkages"]
    },
    {
      icon: GraduationCap,
      title: "Education & Capacity Building",
      description: "Improving learning outcomes and transitions to meaningful work.",
      highlights: ["Scholarships", "Leadership training", "Career guidance", "TVET partnerships"]
    },
    {
      icon: Shield,
      title: "Gender Equality & Social Inclusion",
      description: "Advancing rights, safety, and participation for all.",
      highlights: ["GBV prevention", "Rights advocacy", "SRHR education", "Community dialogue"]
    },
    {
      icon: Heart,
      title: "Health & Wellbeing",
      description: "Promoting physical, mental, and reproductive health.",
      highlights: ["Mental health support", "SRH awareness", "Substance abuse prevention", "Nutrition programs"]
    },
    {
      icon: Leaf,
      title: "Climate Change & Conservation",
      description: "Building climate resilience and environmental stewardship.",
      highlights: ["Climate-smart agriculture", "Tree planting", "Waste management", "Green enterprise"]
    },
    {
      icon: Vote,
      title: "Governance & Civic Engagement",
      description: "Enabling meaningful participation in decision-making.",
      highlights: ["Civic education", "Social accountability", "Leadership training", "Community forums"]
    },
    {
      icon: Palette,
      title: "Arts, Culture & Sports",
      description: "Harnessing creativity and sports for community cohesion.",
      highlights: ["Talent development", "Sports tournaments", "Cultural preservation", "Creative advocacy"]
    },
    {
      icon: Smartphone,
      title: "Digital Inclusion & Innovation",
      description: "Closing the digital divide and catalyzing opportunities.",
      highlights: ["Digital literacy", "Coding programs", "Online safety", "Tech entrepreneurship"]
    }
  ];

  return (
    <section id="programs-section" className="py-20 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary rounded-full animate-float-particles"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary rounded-full animate-float-particles" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-accent rounded-full animate-float-particles" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Enhanced Header with Animations */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-secondary mr-2 animate-bounce-slow" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wide">Our Impact Areas</span>
            <Sparkles className="h-6 w-6 text-secondary ml-2 animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6 animate-slide-in-up">
            Our <span className="text-brand-gradient">Programs</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comprehensive programs designed to empower youth and women through 
            <span className="text-secondary font-semibold">skills development</span>, 
            <span className="text-secondary font-semibold">leadership training</span>, and 
            <span className="text-secondary font-semibold">community engagement</span>.
          </p>
        </div>
        
        {/* Enhanced Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {programs.map((program, index) => {
            const Icon = program.icon;
            const isHovered = hoveredCard === index;
            const colors = [
              'gradient-impact', 'gradient-hero', 'gradient-community', 'gradient-brand',
              'gradient-impact', 'gradient-hero', 'gradient-community', 'gradient-brand'
            ];
            
            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card 
                  className={`group h-full cursor-pointer transition-all duration-500 hover:shadow-brand hover:-translate-y-2 hover:rotate-1 border-2 hover:border-secondary/20 ${
                    isHovered ? 'shadow-glow scale-105' : 'hover:shadow-2xl'
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardHeader className="pb-4 relative overflow-hidden">
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colors[index]} mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <Icon className={`h-8 w-8 text-white transition-all duration-300 ${
                        isHovered ? 'animate-bounce' : ''
                      }`} />
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
                    </div>
                    
                    <CardTitle className="text-xl leading-tight text-primary group-hover:text-secondary transition-colors duration-300 relative z-10">
                      {program.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0 relative">
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {program.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {program.highlights.map((highlight, idx) => (
                        <li 
                          key={idx} 
                          className="text-sm text-muted-foreground flex items-center group-hover:text-foreground transition-all duration-300"
                          style={{ transitionDelay: `${idx * 0.1}s` }}
                        >
                          <div className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 transition-all duration-300 ${
                            isHovered ? 'bg-secondary animate-pulse' : 'bg-accent'
                          }`}></div>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full group-hover:bg-secondary group-hover:text-white text-accent hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                      onClick={formActions.openProgramInquiry}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
        
        {/* Enhanced CTA Button */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Button 
            size="lg" 
            className="group px-12 py-4 bg-gradient-to-r from-secondary to-orange-500 hover:from-orange-500 hover:to-secondary text-white font-semibold rounded-full shadow-brand hover:shadow-glow hover:scale-105 transition-all duration-300 hover:-translate-y-1"
            onClick={ctaActions.explorePrograms}
          >
            <Sparkles className="h-5 w-5 mr-3 group-hover:animate-spin" />
            <span>Explore All Programs</span>
            <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Programs;