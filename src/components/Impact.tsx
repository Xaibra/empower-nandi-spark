import { Card, CardContent } from "@/components/ui/card";
import { Quote, TrendingUp, Users, Heart, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { useButtonAction } from "@/utils/buttonActions";

const Impact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState([0, 0, 0, 0]);
  const { ctaActions, formActions } = useButtonAction();
  
  const stats = [
    { number: "500+", targetNumber: 500, label: "Youth Empowered", color: "text-white", icon: Users },
    { number: "85%", targetNumber: 85, label: "Employment Rate", color: "text-white", icon: TrendingUp },
    { number: "300+", targetNumber: 300, label: "Women Supported", color: "text-white", icon: Heart },
    { number: "50+", targetNumber: 50, label: "Enterprises Created", color: "text-white", icon: Briefcase }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('impact-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Animate numbers when visible
  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const target = stat.targetNumber;
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          
          setAnimatedNumbers(prev => {
            const newNumbers = [...prev];
            newNumbers[index] = Math.floor(current);
            return newNumbers;
          });
        }, duration / steps);
      });
    }
  }, [isVisible]);

  return (
    <section id="impact-section" className="py-20 bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-float-particles"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-white rounded-full animate-float-particles" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-white rounded-full animate-float-particles" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Section */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-4">
                  <Icon className="h-8 w-8 text-white/80 mx-auto mb-2 group-hover:animate-bounce" />
                </div>
                <div className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-2 ${stat.color} group-hover:text-yellow-200 transition-colors duration-300`}>
                  {index === 1 ? `${animatedNumbers[index]}%` : 
                   index === 0 || index === 2 ? `${animatedNumbers[index]}+` : 
                   `${animatedNumbers[index]}+`}
                </div>
                <div className="text-white/90 text-sm md:text-base lg:text-lg font-medium group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Testimonial */}
        <div className={`transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-8 md:p-12 relative">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-full opacity-20"></div>
              
              <Quote className="h-12 w-12 text-orange-500 mb-6 mx-auto animate-pulse" />
              <blockquote className="text-xl md:text-2xl text-center text-foreground mb-8 leading-relaxed font-medium">
                "Tujitume believed in me when I had no experience. Today I run a small business 
                and mentor other girls in my village. The skills and confidence I gained here 
                changed not just my life, but my entire community's future."
              </blockquote>
              <div className="text-center relative">
                <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-4"></div>
                <cite className="text-xl font-bold text-primary not-italic block mb-2">
                  Mercy Chepkoech
                </cite>
                <div className="text-muted-foreground text-sm">
                  Youth Beneficiary, Nandi County
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Call to Action */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-pulse">
              Ready to Make an Impact?
            </h3>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of youth and women who are transforming their communities 
              through our comprehensive empowerment programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="group px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={ctaActions.getInvolved}
              >
                <span className="mr-2">Get Involved</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
              <button 
                className="group px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 hover:scale-105"
                onClick={formActions.openContactForm}
              >
                <span className="mr-2">Learn More</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;