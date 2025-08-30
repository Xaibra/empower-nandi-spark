import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Quote,
  Star,
  Users,
  TrendingUp,
  Heart,
  Award,
  Sparkles,
  ArrowRight,
  Play,
  MapPin,
  Calendar,
  Target,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Mary Chebet",
      age: 24,
      location: "Kapsabet, Nandi County",
      program: "Economic Empowerment",
      role: "Small Business Owner",
      quote: "Tujitume didn't just teach me business skills - they believed in my potential when no one else did. Today, my tailoring business employs 3 other women, and we're supporting 12 families in our community.",
      story: "When I joined Tujitume's business training program in 2022, I was a single mother struggling to make ends meet. The comprehensive 3-month training covered business planning, financial management, and marketing. With their support, I secured a KES 50,000 loan and started my tailoring business. Within 18 months, my monthly income grew from KES 5,000 to KES 35,000.",
      impact: "Increased monthly income by 600%",
      image: "/testimonials/mary-chebet.jpg",
      video: "/testimonials/mary-story.mp4"
    },
    {
      name: "David Kiprotich",
      age: 22,
      location: "Mosoriot, Nandi County", 
      program: "Digital Inclusion",
      role: "Tech Entrepreneur",
      quote: "The coding bootcamp at Tujitume opened doors I never imagined. From a village boy with no computer experience to running my own web development company - it's been an incredible journey.",
      story: "Growing up in a rural area, I had never used a computer until I was 20. Tujitume's digital literacy program gave me my first exposure to technology. The 6-month coding bootcamp was intensive but transformative. I learned HTML, CSS, JavaScript, and mobile app development. Today, I run 'Nandi Digital Solutions' with 2 employees, serving businesses across the county.",
      impact: "Built 15+ websites for local businesses",
      image: "/testimonials/david-kiprotich.jpg",
      video: "/testimonials/david-story.mp4"
    },
    {
      name: "Grace Jepkemei",
      age: 28,
      location: "Kilibwoni, Nandi County",
      program: "Gender Equality & Health",
      role: "Community Health Advocate", 
      quote: "Tujitume gave me the voice and platform to address gender-based violence in our community. As a survivor myself, I now help other women break the cycle and seek support.",
      story: "After experiencing domestic violence, I felt isolated and hopeless. Tujitume's women's support group provided counseling and legal support that saved my life. Through their leadership training, I became a certified GBV counselor. I now coordinate a network of 12 women's groups across 4 sub-counties, reaching 300+ women monthly with support services and education.",
      impact: "Supported 300+ women monthly",
      image: "/testimonials/grace-jepkemei.jpg", 
      video: "/testimonials/grace-story.mp4"
    },
    {
      name: "Peter Langat",
      age: 26,
      location: "Kabiyet, Nandi County",
      program: "Climate Action",
      role: "Sustainable Farmer",
      quote: "Climate-smart agriculture training from Tujitume transformed my struggling farm into a model for the community. My yields doubled, and I'm now training other farmers in sustainable practices.",
      story: "Prolonged droughts and changing weather patterns had devastated my family's farm. Traditional farming methods were no longer working. Tujitume's climate-smart agriculture program introduced me to drought-resistant crops, water harvesting, and organic farming techniques. Within two seasons, my maize yield increased from 6 to 15 bags per acre. I now supply organic vegetables to 8 local schools.",
      impact: "Increased crop yields by 150%",
      image: "/testimonials/peter-langat.jpg",
      video: "/testimonials/peter-story.mp4"
    }
  ];

  const successStories = [
    {
      title: "From Dropout to University Graduate",
      beneficiary: "Jane Kiplagat, 21",
      program: "Education & Scholarships", 
      timeline: "2020 - 2024",
      challenge: "Jane dropped out of secondary school due to financial constraints when her father lost his job. She was working as a house help in Nairobi, earning barely enough to survive.",
      intervention: "Tujitume's scholarship program identified Jane through community outreach. They provided full secondary school sponsorship, mentorship, and career guidance support.",
      outcome: "Jane completed her KCSE with a B+ mean grade and received a full scholarship to study Community Development at Moi University. She now volunteers with Tujitume during holidays.",
      metrics: ["100% scholarship coverage", "B+ KCSE performance", "Full university scholarship secured", "Now mentoring 15 other youth"],
      image: "/success-stories/jane-kiplagat.jpg"
    },
    {
      title: "Breaking the Cycle of Early Marriage",
      beneficiary: "Sarah Chepkurui, 19", 
      program: "Gender Equality & SRHR",
      timeline: "2021 - Present",
      challenge: "At 16, Sarah was being prepared for early marriage as per cultural tradition. She had dreams of becoming a nurse but faced family pressure to marry.",
      intervention: "Tujitume's gender equality program engaged Sarah's family through community dialogue sessions. They provided counseling support and advocated for her continued education.",
      outcome: "Sarah completed secondary school and is now in her second year studying nursing at a local college. She has become a peer educator, reaching 200+ girls with SRHR information.",
      metrics: ["Education continuity secured", "200+ girls reached with SRHR education", "Zero early marriages in her village since 2022", "Leadership role in youth council"],
      image: "/success-stories/sarah-chepkurui.jpg"
    },
    {
      title: "Digital Innovation for Rural Development",
      beneficiary: "Community Tech Hub, Kaptumo",
      program: "Digital Inclusion",
      timeline: "2022 - Present", 
      challenge: "Kaptumo village had no internet connectivity or digital services. Youth were migrating to urban areas seeking opportunities, leaving behind aging populations.",
      intervention: "Tujitume established a community tech hub with solar-powered internet. They trained 30 youth in digital skills and supported the development of local digital solutions.",
      outcome: "The hub now serves 500+ community members monthly. Local youth have developed apps for agricultural market information and mobile money services.",
      metrics: ["500+ monthly users", "30 youth trained", "3 local apps developed", "50% reduction in youth migration"],
      image: "/success-stories/tech-hub.jpg"
    }
  ];

  const impactNumbers = [
    { value: "500+", label: "Lives Transformed", icon: Users, color: "text-secondary" },
    { value: "95%", label: "Program Completion Rate", icon: Target, color: "text-primary" },
    { value: "80%", label: "Income Increase Average", icon: TrendingUp, color: "text-accent" },
    { value: "4.9/5", label: "Beneficiary Satisfaction", icon: Star, color: "text-community" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials-section" className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary rounded-full animate-float-particles"></div>
        <div className="absolute top-80 right-16 w-28 h-28 bg-primary rounded-full animate-float-particles" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-32 left-32 w-24 h-24 bg-accent rounded-full animate-float-particles" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-secondary mr-2 animate-bounce-slow" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wide">Impact Stories</span>
            <Sparkles className="h-6 w-6 text-secondary ml-2 animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Voices of <span className="text-brand-gradient">Transformation</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Real stories from community members whose lives have been transformed through our programs
          </p>
        </div>

        {/* Impact Numbers */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {impactNumbers.map((stat, index) => {
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

        {/* Featured Testimonial Carousel */}
        <div className={`mb-20 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Featured <span className="text-secondary">Testimonials</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear directly from beneficiaries about their transformation journey
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <Card className="overflow-hidden border-2 border-secondary/20 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Testimonial Content */}
                  <div className="p-8 lg:p-12 relative">
                    <div className="absolute top-8 left-8 opacity-20">
                      <Quote className="h-16 w-16 text-secondary" />
                    </div>
                    
                    <div className="relative z-10">
                      <Badge variant="secondary" className="mb-4">
                        {testimonials[currentTestimonial].program}
                      </Badge>
                      
                      <blockquote className="text-xl md:text-2xl text-primary font-medium leading-relaxed mb-8">
                        "{testimonials[currentTestimonial].quote}"
                      </blockquote>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-2 text-secondary" />
                          <span className="font-semibold">{testimonials[currentTestimonial].name}</span>
                          <span className="mx-2">•</span>
                          <span>{testimonials[currentTestimonial].age} years old</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2 text-secondary" />
                          <span>{testimonials[currentTestimonial].location}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Award className="h-4 w-4 mr-2 text-secondary" />
                          <span>{testimonials[currentTestimonial].role}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg border border-secondary/20">
                        <div className="flex items-center">
                          <TrendingUp className="h-5 w-5 text-secondary mr-2" />
                          <span className="font-semibold text-primary">Impact: </span>
                          <span className="text-muted-foreground ml-2">{testimonials[currentTestimonial].impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Image/Video Placeholder */}
                  <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="h-16 w-16 text-white" />
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Play className="h-4 w-4" />
                          Watch Story
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <Button 
                variant="outline" 
                size="sm"
                onClick={prevTestimonial}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-secondary scale-125' : 'bg-muted hover:bg-secondary/50'
                    }`}
                  />
                ))}
              </div>

              <Button 
                variant="outline" 
                size="sm"
                onClick={nextTestimonial}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Success Stories */}
        <div className={`mb-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Success <span className="text-secondary">Stories</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Detailed case studies showcasing the depth and breadth of our impact
            </p>
          </div>

          <div className="grid gap-8">
            {successStories.map((story, index) => (
              <Card 
                key={index}
                className="transition-all duration-500 hover:shadow-lg border-2 hover:border-secondary/20 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* Story Image Placeholder */}
                    <div className="h-64 lg:h-auto bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
                          <Heart className="h-12 w-12 text-white" />
                        </div>
                        <Badge variant="secondary">{story.program}</Badge>
                      </div>
                    </div>

                    {/* Story Content */}
                    <div className="lg:col-span-2 p-8">
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <h4 className="text-2xl font-bold text-primary">{story.title}</h4>
                        <Badge variant="outline" className="gap-2">
                          <Calendar className="h-3 w-3" />
                          {story.timeline}
                        </Badge>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h5 className="font-semibold text-primary mb-2 flex items-center">
                            <Users className="h-4 w-4 mr-2 text-secondary" />
                            Beneficiary: {story.beneficiary}
                          </h5>
                        </div>

                        <div>
                          <h5 className="font-semibold text-primary mb-2">The Challenge</h5>
                          <p className="text-muted-foreground text-sm leading-relaxed">{story.challenge}</p>
                        </div>

                        <div>
                          <h5 className="font-semibold text-primary mb-2">Our Intervention</h5>
                          <p className="text-muted-foreground text-sm leading-relaxed">{story.intervention}</p>
                        </div>

                        <div>
                          <h5 className="font-semibold text-primary mb-2">The Outcome</h5>
                          <p className="text-muted-foreground text-sm leading-relaxed">{story.outcome}</p>
                        </div>

                        {/* Metrics */}
                        <div>
                          <h5 className="font-semibold text-primary mb-3">Key Metrics</h5>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {story.metrics.map((metric, idx) => (
                              <div key={idx} className="flex items-center text-sm">
                                <CheckCircle className="h-4 w-4 mr-2 text-secondary flex-shrink-0" />
                                <span className="text-muted-foreground">{metric}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4 group"
                          onClick={() => setSelectedStory(selectedStory === index ? null : index)}
                        >
                          <span>{selectedStory === index ? 'Show Less' : 'Read Full Story'}</span>
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Card className="p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-2 border-secondary/20 max-w-4xl mx-auto">
            <CardContent className="p-0">
              <Quote className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Your Story Could Be <span className="text-secondary">Next</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join hundreds of community members who have transformed their lives through our programs. 
                Every journey starts with a single step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  <span className="mr-2">Apply for Programs</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Watch More Stories
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
