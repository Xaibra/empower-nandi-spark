import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Heart, Sparkles, Award, Play, ChevronDown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import heroImage from "@/assets/hero-image.jpg";
import TujitumeLogo from "@/assets/tujitume-logo.svg";
import { useButtonAction } from "@/utils/buttonActions";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const { ctaActions, formActions } = useButtonAction();

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Users, value: "800+", label: "Lives Transformed" },
    { icon: Target, value: "8", label: "Core Programs" },
    { icon: Heart, value: "25+", label: "Community Partners" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary">
      {/* Background image overlay */}
      <div className="absolute inset-0 opacity-15">
        <img
          src={heroImage}
          alt="Young people learning and engaging in community activities in Nandi County, Kenya"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 grid gap-10 lg:grid-cols-2 items-center">
        {/* Left: text and actions */}
        <div className={`space-y-8 transition-all duration-700 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}>
          <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-medium text-white/90 ring-1 ring-white/30 mb-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-secondary mr-2" />
            Tujitume Youth & Women CBO • Nandi County, Kenya
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Empowering
            <span className="block text-secondary">Youth & Women</span>
            <span className="block text-white/90 text-3xl sm:text-4xl font-semibold mt-2">
              to transform their communities
            </span>
          </h1>

          <p className="text-base md:text-lg text-white/90 max-w-xl">
            We tackle the root causes of poverty, inequality and violence through
            practical programs in economic empowerment, mental health, gender
            justice, climate action and digital skills.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="px-8 py-6 text-base font-semibold shadow-lg shadow-secondary/40"
              onClick={ctaActions.joinProgram}
            >
              Join a Program
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base font-semibold border-white/60 text-white hover:bg-white/10"
              onClick={formActions.openPartnershipForm}
            >
              Partner with Us
            </Button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15 max-w-md">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const active = currentStat === index;
              return (
                <div
                  key={stat.label}
                  className={`flex flex-col gap-1 text-white/90 ${active ? "scale-105" : "scale-100"}`}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Icon className="h-4 w-4 text-secondary" />
                    <span className="font-semibold">{stat.value}</span>
                  </div>
                  <span className="text-xs text-white/80">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: simple card */}
        <div className={`relative transition-all duration-700 delay-100 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}>
          <div className="rounded-3xl bg-white/95 shadow-2xl p-6 md:p-8 max-w-md ml-auto">
            <div className="flex items-center gap-3 mb-4">
              <img src={TujitumeLogo} alt="Tujitume" className="h-10 w-auto" />
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Community-rooted
                </p>
                <p className="text-sm text-muted-foreground">
                  Founded by Noeline Maru in Chepterit Center
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                We work with youth and women facing poverty, addiction, gender-based
                violence and unemployment — turning pain into purpose and leadership.
              </p>
              <p>
                Through 8 integrated programs we provide skills, safe spaces,
                counseling and opportunities that restore dignity and possibility.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-primary font-medium">
                <Sparkles className="h-3 w-3 mr-1" />
                Economic Empowerment
              </span>
              <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-secondary font-medium">
                Mental Health & Healing
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 font-medium">
                Climate & Digital Futures
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/80 text-xs flex flex-col items-center gap-2">
        <span>Scroll to explore our story</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;