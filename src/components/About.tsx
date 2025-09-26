import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Heart, 
  Award, 
  MapPin, 
  Calendar,
  Sparkles,
  Quote,
  ArrowRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { useButtonAction } from "@/utils/buttonActions";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
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

    const element = document.getElementById('about-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const milestones = [
    {
      year: "2018-2020",
      title: "The Awakening",
      description: "Noeline Maru witnesses the devastating impact of drugs, alcoholism, and poverty in Chepterit Center. The loss of her closest family member to illicit brews becomes a catalyst for change.",
      icon: Quote,
      color: "text-secondary"
    },
    {
      year: "COVID-19 Period",
      title: "Crisis Deepens Vision",
      description: "School closures and economic hardship push more youth to substance abuse and women to illicit alcohol brewing. Noeline realizes the urgent need for comprehensive intervention.",
      icon: Heart,
      color: "text-primary"
    },
    {
      year: "2021-2022",
      title: "Community Conversations Begin",
      description: "Noeline shares her vision with like-minded individuals. Together, they begin community dialogues about breaking cycles of poverty, violence, and hopelessness.",
      icon: Users,
      color: "text-accent"
    },
    {
      year: "2023-Present",
      title: "Tujitume is Born",
      description: "Official founding of Tujitume Youth and Women CBO. Launch of comprehensive programs addressing economic empowerment, gender equality, education, climate action, and community transformation.",
      icon: Award,
      color: "text-secondary"
    }
  ];

  const values = [
    {
      title: "Empowerment",
      description: "We believe every young person and woman has the potential to lead transformation in their community.",
      icon: "💪"
    },
    {
      title: "Inclusion",
      description: "We ensure our programs reach the most marginalized, leaving no one behind in our journey to progress.",
      icon: "🤝"
    },
    {
      title: "Innovation",
      description: "We embrace creative solutions and technology to address complex social challenges effectively.",
      icon: "🚀"
    },
    {
      title: "Sustainability",
      description: "We build programs that create lasting change and can be sustained by communities themselves.",
      icon: "🌱"
    },
    {
      title: "Partnership",
      description: "We collaborate with stakeholders across sectors to amplify our impact and reach.",
      icon: "🔗"
    },
    {
      title: "Integrity",
      description: "We operate with transparency, accountability, and ethical practices in all our endeavors.",
      icon: "⭐"
    }
  ];

  return (
    <section id="about-section" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary rounded-full animate-float-particles"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-primary rounded-full animate-float-particles" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-accent rounded-full animate-float-particles" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-secondary mr-2 animate-bounce-slow" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wide">About Tujitume</span>
            <Sparkles className="h-6 w-6 text-secondary ml-2 animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Our <span className="text-brand-gradient">Story</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From personal pain to community transformation - the story of Tujitume begins with one woman's vision to break cycles of poverty and violence in Nandi County
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <Card className="p-8 h-full border-2 border-secondary/20 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-secondary/10 rounded-2xl">
                    <Quote className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Our Founding Vision</h3>
                    <Badge variant="secondary" className="mb-4">Founded 2023</Badge>
                  </div>
                </div>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-lg">
                    <span className="font-semibold text-primary">"My name is Noeline Maru, the founder of Tujitume Youth and Women CBO."</span> 
                    The story begins in Chepterit Center, where I witnessed incredible potential weighed down by social challenges. 
                    Many who seemed destined for greatness later sank into drugs, alcoholism, and hopelessness.
                  </p>
                  
                  <p>
                    The pain became personal when I lost my closest family member to illicit brews. During COVID-19, 
                    with schools closed and opportunities scarce, I watched young people turn to substance abuse while women, 
                    lacking economic opportunities, <span className="font-semibold text-secondary">resorted to brewing and selling illicit alcohol for survival</span>.
                  </p>
                  
                  <p>
                    I realized these challenges were deeply interconnected—poverty, unemployment, lack of education, drug abuse, 
                    gender inequality, and gender-based violence were reinforcing each other. 
                    <span className="font-semibold text-accent">Unless we created spaces for empowerment, mentorship, and opportunities, 
                    the future of our youth and women would remain stifled.</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <Card className="p-8 h-full border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Our Mission Today</h3>
                    <Badge variant="outline" className="border-primary">Active in 8 Sub-counties</Badge>
                  </div>
                </div>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-lg font-medium text-primary">
                    "To promote personal growth, leadership, and community transformation by addressing the root causes of poverty and inequality holistically."
                  </p>
                  
                  <p>
                    <span className="font-semibold text-secondary">Tujitume, which means 'let us push ourselves',</span> reflects our belief that solutions lie within us. 
                    We exist to inspire and equip youth and women with the knowledge, skills, and opportunities they need to thrive. 
                    Our vision is an inclusive society where youth and women unlock their full potential and lead lasting change.
                  </p>
                  
                  <div className="pt-4 border-t border-muted">
                    <p className="text-sm font-medium text-primary mb-2">Our Comprehensive Focus Areas:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {["Economic Empowerment", "Education & Capacity Building", "Gender Equality & Social Inclusion", "Climate Change & Environmental Conservation", 
                        "Governance & Civic Engagement", "Arts, Culture & Sports", "Digital Inclusion & Innovation"].map((area, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Timeline Section */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our <span className="text-secondary">Journey</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From humble beginnings to community-wide impact - every milestone represents lives transformed
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary to-accent transform md:-translate-x-px"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Timeline node */}
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-white border-4 border-secondary rounded-full transform md:-translate-x-2 z-10"></div>
                    
                    {/* Content */}
                    <div className={`ml-20 md:ml-0 md:w-5/12 ${
                      isEven ? 'md:mr-8' : 'md:ml-8'
                    }`}>
                      <Card className={`p-6 transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 ${
                        index % 2 === 0 ? 'border-secondary/20 hover:border-secondary/40' : 'border-primary/20 hover:border-primary/40'
                      }`}>
                        <CardContent className="p-0">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-2xl ${
                              index % 2 === 0 ? 'bg-secondary/10' : 'bg-primary/10'
                            }`}>
                              <Icon className={`h-6 w-6 ${milestone.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant={index % 2 === 0 ? "secondary" : "default"} className="font-bold">
                                  {milestone.year}
                                </Badge>
                                <h4 className="text-xl font-bold text-primary">{milestone.title}</h4>
                              </div>
                              <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className={`transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our <span className="text-secondary">Values</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision, program, and partnership we make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="group p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 hover:border-secondary/20 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Card className="p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-2 border-secondary/20">
            <CardContent className="p-0">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Join Our <span className="text-secondary">Movement</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you're a young person seeking opportunities, a woman looking to expand your horizons, 
                or a partner wanting to make a difference - there's a place for you in our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="group"
                  onClick={ctaActions.getInvolved}
                >
                  <span className="mr-2">Get Involved</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={formActions.openContactForm}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule a Visit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
