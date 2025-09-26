import { BookOpen, Shield, Users, Leaf, ArrowRight, Sparkles, Target, Heart, Zap, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useButtonAction } from "@/utils/buttonActions";

const ValueProposition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeApproach, setActiveApproach] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { ctaActions, formActions } = useButtonAction();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('approach-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Auto-rotate active approach every 6 seconds (slower and more subtle)
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveApproach((prev) => (prev + 1) % 4);
    }, 6000); // Increased from 4s to 6s for more subtle rotation

    return () => clearInterval(interval);
  }, [isVisible]);

  const approaches = [
    {
      icon: BookOpen,
      title: "Practical Skills, Real Opportunities",
      description: "From vocational training to digital literacy and incubation support, we turn potential into livelihoods.",
      detail: "Our comprehensive skills development programs have equipped over 500+ youth with market-relevant skills.",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      stats: "500+ trained",
      category: "Skills Development"
    },
    {
      icon: Shield,
      title: "Safe, Inclusive Spaces",
      description: "We champion gender equality, mental health, and safeguarding so everyone can participate and thrive.",
      detail: "Creating protective environments where vulnerable populations can access services without fear or discrimination.",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      stats: "100% safe spaces",
      category: "Inclusion & Safety"
    },
    {
      icon: Users,
      title: "Youth-Led Solutions",
      description: "We elevate youth and women as decision-makers, innovators, and community leaders.",
      detail: "Young people lead 80% of our programs, ensuring solutions are relevant and sustainable.",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      stats: "80% youth-led",
      category: "Leadership Development"
    },
    {
      icon: Leaf,
      title: "Climate-Smart Futures",
      description: "We grow green skills—climate-smart agriculture, tree planting, and waste recycling—to sustain people and planet.",
      detail: "Environmental programs that address climate change while creating sustainable livelihoods for communities.",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      stats: "10,000+ trees planted",
      category: "Environmental Action"
    }
  ];

  const transformationSteps = [
    {
      step: "01",
      title: "Assess",
      description: "Community needs assessment and stakeholder mapping",
      icon: Target
    },
    {
      step: "02",
      title: "Engage",
      description: "Youth and women involvement in program design",
      icon: Heart
    },
    {
      step: "03",
      title: "Implement",
      description: "Deliver integrated, multi-sectoral interventions",
      icon: Zap
    },
    {
      step: "04",
      title: "Scale",
      description: "Expand successful models across communities",
      icon: TrendingUp
    }
  ];

  return (
    <section id="approach-section" className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-32 w-24 h-24 bg-secondary rounded-full animate-float-particles" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-60 right-20 w-20 h-20 bg-primary rounded-full animate-float-particles" style={{ animationDelay: '4s', animationDuration: '14s' }}></div>
        <div className="absolute bottom-32 left-16 w-16 h-16 bg-accent rounded-full animate-float-particles" style={{ animationDelay: '8s', animationDuration: '16s' }}></div>
        <div className="absolute bottom-60 right-40 w-12 h-12 bg-secondary rounded-full animate-float-particles" style={{ animationDelay: '12s', animationDuration: '18s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-20 transition-all duration-1200 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="inline-flex items-center justify-center mb-6">
            <Sparkles className="h-5 w-5 text-secondary mr-3 opacity-70 animate-pulse" />
            <span className="text-sm font-medium text-secondary uppercase tracking-widest">Our Methodology</span>
            <Sparkles className="h-5 w-5 text-secondary ml-3 opacity-70 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-primary mb-8 leading-tight">
            Our Approach to
            <br />
            <span className="text-brand-gradient animate-slide-in-up">Community Transformation</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We believe in empowering communities through 
            <span className="text-secondary font-semibold">comprehensive, inclusive programs</span> 
            that create lasting change and sustainable impact across 
            <span className="text-secondary font-semibold">8 key sectors</span>.
          </p>
        </div>

        {/* Interactive Approach Cards */}
        <div className="mb-20">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1200 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {approaches.map((approach, index) => {
              const Icon = approach.icon;
              const isActive = activeApproach === index;
              const isHovered = hoveredCard === index;
              
              return (
                <Card 
                  key={index}
                  className={`group cursor-pointer transition-all duration-700 hover:scale-[1.02] border-2 overflow-hidden ${
                    isActive 
                      ? 'border-secondary shadow-xl shadow-secondary/10 scale-[1.01] bg-gradient-to-br from-white to-secondary/3' 
                      : 'border-muted hover:border-secondary/40 hover:shadow-lg'
                  }`}
                  onMouseEnter={() => {
                    setHoveredCard(index);
                    setActiveApproach(index);
                  }}
                  onMouseLeave={() => setHoveredCard(null)}
                    style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardContent className="p-0">
                    {/* Card Header with Icon */}
                    <div className={`p-6 relative overflow-hidden transition-all duration-700 ${
                      isActive ? approach.bgColor : 'bg-muted/10'
                    }`}>
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r ${approach.color} transition-opacity duration-700`}></div>
                      <div className="relative z-10">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-700 ease-out ${
                          isActive || isHovered 
                            ? `bg-gradient-to-r ${approach.color} scale-105 shadow-md` 
                            : 'bg-white border-2 border-muted'
                        }`}>
                          <Icon className={`h-8 w-8 transition-all duration-300 ${
                            isActive || isHovered ? 'text-white' : 'text-secondary'
                          }`} />
                        </div>
                        
                        <Badge 
                          variant={isActive ? "secondary" : "outline"} 
                          className={`mb-3 transition-all duration-500 ${
                            isActive ? 'opacity-90' : 'opacity-70'
                          }`}
                        >
                          {approach.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-3 transition-colors duration-500 ease-out ${
                        isActive ? 'text-secondary' : 'text-primary group-hover:text-secondary'
                      }`}>
                        {approach.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 group-hover:text-foreground transition-colors duration-500 ease-out">
                        {approach.description}
                      </p>

                      {/* Stats Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-500 ease-out ${
                          isActive 
                            ? 'bg-secondary text-white' 
                            : 'bg-muted text-muted-foreground group-hover:bg-secondary/80 group-hover:text-white'
                        }`}>
                          {approach.stats}
                        </span>
                        
                        <ArrowRight className={`h-4 w-4 transition-all duration-500 ease-out ${
                          isActive || isHovered 
                            ? 'text-secondary translate-x-0.5' 
                            : 'text-muted-foreground group-hover:text-secondary group-hover:translate-x-0.5'
                        }`} />
                      </div>

                      {/* Expanded Detail */}
                      <div className={`transition-all duration-700 ease-out overflow-hidden ${
                        isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-xs text-muted-foreground italic border-t pt-3">
                          {approach.detail}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {approaches.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveApproach(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ease-out ${
                  activeApproach === index 
                    ? 'bg-secondary scale-110 shadow-sm' 
                    : 'bg-muted hover:bg-secondary/60 hover:scale-105'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Transformation Process */}
        <div className={`mb-20 transition-all duration-1200 delay-600 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our <span className="text-secondary">Transformation Process</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A systematic approach to creating sustainable community change
            </p>
          </div>

          <div className="relative">
            {/* Process Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary via-primary to-secondary transform -translate-y-px hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {transformationSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div 
                    key={index} 
                    className="text-center group relative"
                    style={{ animationDelay: `${index * 0.25}s` }}
                  >
                    {/* Step Number Circle */}
                    <div className="relative inline-block mb-4">
                      <div className="w-20 h-20 bg-white border-4 border-secondary rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out shadow-md relative z-10">
                        <StepIcon className="h-8 w-8 text-secondary transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        {step.step}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full animate-pulse opacity-30"></div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-500 ease-out">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1200 delay-800 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Card className="p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-2 border-secondary/20 max-w-4xl mx-auto">
            <CardContent className="p-0">
              <Sparkles className="h-10 w-10 text-secondary mx-auto mb-4 animate-pulse opacity-80" />
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Ready to Transform Your <span className="text-secondary">Community</span>?
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join us in creating lasting change. Whether you're a young person, community leader, 
                or organization, there's a place for you in our transformation journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className={`group px-8 py-4 bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]`}
                  onClick={ctaActions.getInvolved}
                >
                  <span className="mr-2">Get Involved Today</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full transition-all duration-500 hover:scale-[1.02]"
                  onClick={formActions.openContactForm}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;