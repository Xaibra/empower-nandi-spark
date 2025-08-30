import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Heart, Sparkles, Award } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-image.jpg";
import TujitumeLogo from "@/assets/tujitume-logo.svg";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    // Animate stats counter
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Users, value: "500+", label: "Youth Empowered", color: "text-secondary" },
    { icon: Target, value: "8", label: "Core Programs", color: "text-accent" },
    { icon: Heart, value: "15+", label: "Partner Organizations", color: "text-community" }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Enhanced Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/70 to-primary/90 z-10"></div>
        <img 
          src={heroImage} 
          alt="Young people learning and engaging in community activities in Nandi County, Kenya"
          className="w-full h-full object-cover scale-110 animate-ken-burns"
        />
        {/* Animated overlay particles */}
        <div className="absolute inset-0 z-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-secondary/20 rounded-full animate-float-particles`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Enhanced Floating Logo with Better Animation */}
      <div className="absolute top-1/2 right-8 md:right-16 transform -translate-y-1/2 z-5 opacity-[0.06] hidden lg:block">
        <img 
          src={TujitumeLogo} 
          alt="" 
          className="h-80 w-auto animate-float-logo filter blur-[0.5px]"
        />
      </div>
      
      {/* Enhanced Content with Staggered Animations */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl">
          {/* Main Heading with Typewriter Effect */}
          <div className="mb-8">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight transition-all duration-1000 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <span className="block animate-slide-up-1">Empowering Youth and Women</span>
              <span className="block animate-slide-up-2">to Lead</span>
              <span className="block text-brand-gradient animate-slide-up-3 bg-gradient-to-r from-secondary via-orange-400 to-secondary bg-clip-text text-transparent animate-gradient-x">
                Lasting Change
              </span>
            </h1>
          </div>
          
          {/* Enhanced Description */}
          <p className={`text-xl md:text-2xl lg:text-3xl text-white/95 mb-12 max-w-4xl leading-relaxed transition-all duration-1000 delay-300 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            We equip young people and women in Nandi County with 
            <span className="font-semibold text-secondary">skills</span>, 
            <span className="font-semibold text-secondary">opportunities</span>, and 
            <span className="font-semibold text-secondary">support</span> to build livelihoods, champion equality, and transform communities.
          </p>
          
          {/* Enhanced Interactive Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-500 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isActive = currentStat === index;
              return (
                <div 
                  key={index}
                  className={`group flex items-center gap-4 p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 cursor-pointer hover:scale-105 ${
                    isActive ? 'bg-white/20 shadow-brand transform scale-105' : 'bg-white/10 hover:bg-white/15'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`p-4 rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${stat.color} group-hover:animate-bounce`} />
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-white animate-count-up">{stat.value}</div>
                    <div className="text-sm md:text-base text-white/90 font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Enhanced CTAs with Magnetic Effect */}
          <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-700 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Button 
              size="lg" 
              variant="secondary" 
              className="group text-lg px-10 py-5 rounded-full font-semibold shadow-brand hover:shadow-2xl hover:shadow-secondary/25 transform hover:scale-105 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="mr-3">Join a Program</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group text-lg px-10 py-5 rounded-full font-semibold border-2 border-white/30 text-white backdrop-blur-sm hover:bg-white hover:text-primary hover:border-white transform hover:scale-105 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <Sparkles className="mr-3 h-5 w-5 group-hover:animate-spin" />
              Partner with Us
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300">
              <span className="text-sm mb-2 font-medium">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-scroll-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;