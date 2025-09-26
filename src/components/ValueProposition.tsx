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

  // Auto-rotate active approach every 4 seconds
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveApproach((prev) => (prev + 1) % 4);
    }, 4000);

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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-32 h-32 bg-secondary rounded-full animate-float-particles"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-primary rounded-full animate-float-particles" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-10 w-20 h-20 bg-accent rounded-full animate-float-particles" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-40 right-32 w-16 h-16 bg-secondary rounded-full animate-float-particles" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center mb-6">
            <Sparkles className="h-6 w-6 text-secondary mr-3 animate-bounce-slow" />
            <span className="text-sm font-medium text-secondary uppercase tracking-widest">Our Methodology</span>
            <Sparkles className="h-6 w-6 text-secondary ml-3 animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
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
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {approaches.map((approach, index) => {
              const Icon = approach.icon;
              const isActive = activeApproach === index;
              const isHovered = hoveredCard === index;
              
              return (
                <Card 
                  key={index}
                  className={`group cursor-pointer transition-all duration-500 hover:scale-105 border-2 overflow-hidden ${
                    isActive 
                      ? 'border-secondary shadow-2xl shadow-secondary/20 scale-105 bg-gradient-to-br from-white to-secondary/5' 
                      : 'border-muted hover:border-secondary/50 hover:shadow-xl'
                  }`}
                  onMouseEnter={() => {
                    setHoveredCard(index);
                    setActiveApproach(index);
                  }}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    {/* Card Header with Icon */}
                    <div className={`p-6 relative overflow-hidden transition-all duration-500 ${
                      isActive ? approach.bgColor : 'bg-muted/20'
                    }`}>
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r ${approach.color} transition-opacity duration-500`}></div>
                      <div className="relative z-10">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-500 ${
                          isActive || isHovered 
                            ? `bg-gradient-to-r ${approach.color} scale-110 shadow-lg` 
                            : 'bg-white border-2 border-muted'
                        }`}>
                          <Icon className={`h-8 w-8 transition-all duration-300 ${
                            isActive || isHovered ? 'text-white' : 'text-secondary'
                          }`} />
                        </div>
                        
                        <Badge 
                          variant={isActive ? "secondary" : "outline"} 
                          className={`mb-3 transition-all duration-300 ${
                            isActive ? 'animate-pulse' : ''
                          }`}
                        >
                          {approach.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                        isActive ? 'text-secondary' : 'text-primary group-hover:text-secondary'
                      }`}>
                        {approach.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 group-hover:text-foreground transition-colors duration-300">
                        {approach.description}
                      </p>

                      {/* Stats Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 ${
                          isActive 
                            ? 'bg-secondary text-white' 
                            : 'bg-muted text-muted-foreground group-hover:bg-secondary group-hover:text-white'
                        }`}>
                          {approach.stats}
                        </span>
                        
                        <ArrowRight className={`h-4 w-4 transition-all duration-300 ${
                          isActive || isHovered 
                            ? 'text-secondary translate-x-1' 
                            : 'text-muted-foreground group-hover:text-secondary group-hover:translate-x-1'
                        }`} />
                      </div>

                      {/* Expanded Detail */}
                      <div className={`transition-all duration-500 overflow-hidden ${
                        isActive ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeApproach === index 
                    ? 'bg-secondary scale-125' 
                    : 'bg-muted hover:bg-secondary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Transformation Process */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Step Number Circle */}
                    <div className="relative inline-block mb-4">
                      <div className="w-20 h-20 bg-white border-4 border-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10">
                        <StepIcon className="h-8 w-8 text-secondary" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {step.step}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full animate-ping opacity-75"></div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Card className="p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-2 border-secondary/20 max-w-4xl mx-auto">
            <CardContent className="p-0">
              <Sparkles className="h-12 w-12 text-secondary mx-auto mb-4 animate-bounce" />
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
                  className="group px-8 py-4 bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={ctaActions.getInvolved}
                >
                  <span className="mr-2">Get Involved Today</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full transition-all duration-300 hover:scale-105"
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