import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Heart, Sparkles, Award, Play, ChevronDown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import heroImage from "@/assets/hero-image.jpg";
import TujitumeLogo from "@/assets/tujitume-logo.svg";
import { useButtonAction } from "@/utils/buttonActions";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const { ctaActions, formActions } = useButtonAction();

  // Mouse tracking for subtle parallax effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX - window.innerWidth / 2) / 50,
      y: (e.clientY - window.innerHeight / 2) / 50,
    });
  }, []);

  // Scroll tracking for parallax
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Animate stats counter with natural timing variation
    const scheduleNextStat = () => {
      // Generate natural timing between 3.5-6.5 seconds
      const naturalDelay = 3500 + Math.random() * 3000 + Math.sin(Date.now() / 1000) * 500;
      
      setTimeout(() => {
        setCurrentStat((prev) => (prev + 1) % 3);
        scheduleNextStat(); // Schedule the next change
      }, naturalDelay);
    };
    
    // Start the natural timing cycle
    scheduleNextStat();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  const stats = [
    { icon: Users, value: "800+", label: "Lives Transformed", color: "text-secondary", gradient: "from-secondary to-orange-400" },
    { icon: Target, value: "8", label: "Core Programs", color: "text-accent", gradient: "from-primary to-blue-500" },
    { icon: Heart, value: "25+", label: "Community Partners", color: "text-community", gradient: "from-green-500 to-emerald-400" }
  ];

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Enhanced Background with Advanced Parallax */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/80 to-secondary/70 z-20"
          style={{
            transform: `translate3d(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px, 0)`,
          }}
        ></div>
        <div 
          className="absolute inset-0 z-10"
          style={{
            transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
          }}
        >
          <img 
            src={heroImage} 
            alt="Young people learning and engaging in community activities in Nandi County, Kenya"
            className="w-full h-full object-cover scale-105 animate-ken-burns"
            style={{ 
              animationDuration: '24s',
              animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          />
        </div>
        
        {/* Modern Floating Particles */}
        <div className="absolute inset-0 z-15">
          {[...Array(8)].map((_, i) => {
            const animationClasses = [
              'animate-organic-float',
              'animate-subtle-drift',
              'animate-float-gentle',
              'animate-breathe'
            ];
            const randomAnimation = animationClasses[i % animationClasses.length];
            const randomDelay = (i * 1.3 + Math.sin(i) * 2).toFixed(1);
            const randomDuration = (8 + (i % 4) * 2).toFixed(1);
            
            return (
              <div
                key={i}
                className={`absolute ${randomAnimation} opacity-20`}
                style={{
                  left: `${8 + i * 11 + (i % 3) * 3}%`,
                  top: `${18 + (i % 4) * 20 + (i % 2) * 8}%`,
                  animationDelay: `${randomDelay}s`,
                  animationDuration: `${randomDuration}s`,
                  transform: `translate3d(${mousePosition.x * (0.015 + i * 0.003)}px, ${mousePosition.y * (0.012 + i * 0.004)}px, 0)`,
                }}
              >
                <div className={`w-${2 + (i % 2)} h-${2 + (i % 2)} bg-gradient-to-r ${
                  i % 3 === 0 ? 'from-secondary to-orange-300' : 
                  i % 3 === 1 ? 'from-white to-blue-200' : 
                  'from-primary to-purple-300'
                } rounded-full animate-glow-pulse`} 
                style={{
                  animationDelay: `${(i * 0.8).toFixed(1)}s`,
                  animationDuration: `${(4 + i % 3).toFixed(1)}s`
                }}></div>
              </div>
            );
          })}
        </div>
        
        {/* Morphing Background Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full animate-morph opacity-30 blur-sm" 
             style={{ 
               animationDelay: '1.7s',
               animationDuration: '14s'
             }}></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-r from-white/10 to-secondary/10 rounded-full animate-morph opacity-40 blur-sm" 
             style={{ 
               animationDelay: '4.3s',
               animationDuration: '11s'
             }}></div>
        <div className="absolute top-1/3 left-20 w-20 h-20 bg-gradient-to-r from-primary/15 to-white/15 rounded-full animate-breathe opacity-25 blur-sm" 
             style={{ 
               animationDelay: '7.1s',
               animationDuration: '9s'
             }}></div>
      </div>
      
      {/* Enhanced Floating Logo with Parallax */}
      <div 
        className="absolute top-1/2 right-8 md:right-16 transform -translate-y-1/2 z-15 opacity-[0.08] hidden lg:block"
        style={{
          transform: `translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2 - scrollY * 0.1}px, 0)`,
        }}
      >
        <img 
          src={TujitumeLogo} 
          alt="" 
          className="h-96 w-auto animate-organic-float filter blur-[0.3px]"
          style={{ 
            animationDelay: '3.7s',
            animationDuration: '12.5s'
          }}
        />
      </div>
      
      {/* Modern Glassmorphism Content */}
      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="max-w-6xl">
          {/* Enhanced Main Heading */}
          <div className="mb-8">
            <div className={`transition-all duration-1200 ease-out transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight">
                <span className="block animate-text-focus" style={{ animationDelay: '0.3s', animationDuration: '1.2s' }}>Empowering</span>
                <span className="block animate-text-focus" style={{ animationDelay: '0.7s', animationDuration: '1.4s' }}>Youth & Women</span>
                <span className="block relative animate-text-focus" style={{ animationDelay: '1.1s', animationDuration: '1.6s' }}>
                  <span className="bg-gradient-to-r from-secondary via-orange-300 to-yellow-400 bg-clip-text text-transparent animate-shimmer" 
                        style={{ animationDelay: '1.8s', animationDuration: '4.2s' }}>
                    to Lead Change
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-transparent animate-reveal" 
                       style={{ animationDelay: '2.1s', animationDuration: '1.8s' }}></div>
                </span>
              </h1>
            </div>
          </div>
          
          {/* Glassmorphism Description Card */}
          <div className={`mb-10 transition-all duration-1200 delay-300 ease-out transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="morphism-card p-6 md:p-8 rounded-3xl max-w-4xl">
              <p className="text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed">
                Born from personal pain and community vision, we address the 
                <span className="font-semibold text-secondary animate-shimmer bg-gradient-to-r from-secondary to-orange-300 bg-clip-text text-transparent" 
                      style={{ animationDelay: '2.8s', animationDuration: '5.3s' }}> root causes </span>
                of poverty and inequality through 
                <span className="font-semibold text-secondary animate-shimmer-slow bg-gradient-to-r from-secondary to-orange-300 bg-clip-text text-transparent" 
                      style={{ animationDelay: '4.1s', animationDuration: '6.7s' }}> comprehensive empowerment </span>
                that transforms lives and builds inclusive futures.
              </p>
            </div>
          </div>
          
          {/* Modern Interactive Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 transition-all duration-1200 delay-600 ease-out transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isActive = currentStat === index;
              return (
                <div 
                  key={index}
                  className={`group relative magnetic-hover cursor-pointer transition-all duration-700 ${
                    isActive ? 'scale-105' : ''
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    transform: `translate3d(${mousePosition.x * (0.01 + index * 0.005)}px, ${mousePosition.y * (0.01 + index * 0.005)}px, 0)`,
                  }}
                >
                  <div className={`morphism-card p-6 rounded-2xl transition-all duration-700 ${
                    isActive ? 'animate-glow-pulse' : ''
                  }`}
                  style={{
                    animationDelay: isActive ? `${(index * 0.3).toFixed(1)}s` : '0s',
                    animationDuration: isActive ? `${(4.5 + index * 0.5).toFixed(1)}s` : '0s'
                  }}>
                    <div className="flex items-center gap-5">
                      <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className="h-8 w-8 text-white" />
                        <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                             style={{
                               animationDelay: `${(index * 0.4).toFixed(1)}s`,
                               animationDuration: `${(2.5 + index * 0.3).toFixed(1)}s`
                             }}></div>
                      </div>
                      <div>
                        <div className="text-4xl md:text-5xl font-bold text-white mb-1 animate-stagger-in">
                          {stat.value}
                        </div>
                        <div className="text-sm md:text-base text-white/90 font-medium leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl animate-breathe" 
                           style={{
                             animationDelay: `${(index * 0.5).toFixed(1)}s`,
                             animationDuration: `${(6.5 + index * 0.8).toFixed(1)}s`
                           }}></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Enhanced Modern CTAs */}
          <div className={`flex flex-col sm:flex-row gap-6 mb-8 transition-all duration-1200 delay-900 ease-out transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Button 
              size="lg" 
              className="group relative overflow-hidden text-lg px-12 py-6 rounded-full font-semibold bg-gradient-to-r from-secondary to-orange-500 hover:from-orange-500 hover:to-secondary text-white border-0 shadow-2xl hover:shadow-secondary/40 magnetic-hover transform-gpu"
              onClick={ctaActions.joinProgram}
            >
              <span className="relative z-10 flex items-center">
                <Play className="mr-3 h-5 w-5" />
                <span>Join a Program</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
            
            <Button 
              size="lg" 
              className="group glass-card text-lg px-12 py-6 rounded-full font-semibold text-white border-2 border-white/40 hover:border-white/60 magnetic-hover backdrop-blur-md transform-gpu hover:bg-white/10"
              onClick={formActions.openPartnershipForm}
            >
              <span className="flex items-center">
                <Sparkles className="mr-3 h-5 w-5 group-hover:animate-spin" />
                <span>Partner with Us</span>
              </span>
            </Button>
          </div>
          
          {/* Partnership Badges */}
          <div className={`flex flex-wrap gap-4 items-center transition-all duration-1200 delay-1200 ease-out transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <span className="text-white/70 text-sm font-medium">Trusted by:</span>
            <div className="flex gap-3">
              {['UN Women', 'USAID', 'Ministry of Youth'].map((partner, index) => (
                <div key={index} className="glass-card px-4 py-2 rounded-full text-xs text-white/80 font-medium">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Modern Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-white/60 hover:text-white transition-all duration-300 cursor-pointer group">
            <span className="text-sm mb-3 font-medium opacity-80 group-hover:opacity-100">Discover our impact</span>
            <div className="glass-card p-3 rounded-full group-hover:scale-105 transition-transform duration-300">
              <ChevronDown className="w-5 h-5 animate-bounce-slow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;