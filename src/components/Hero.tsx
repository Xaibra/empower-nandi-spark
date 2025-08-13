import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Heart } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Young people learning and engaging in community activities in Nandi County, Kenya"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Empowering Youth and Women to Lead 
            <span className="gradient-hero bg-clip-text text-transparent"> Lasting Change</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
            We equip young people and women in Nandi County with skills, opportunities, 
            and support to build livelihoods, champion equality, and transform communities.
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex items-center gap-3 text-white">
              <Users className="h-8 w-8 text-secondary" />
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-white/80">Youth Empowered</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Target className="h-8 w-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-white/80">Core Programs</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Heart className="h-8 w-8 text-community" />
              <div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-white/80">Partner Organizations</div>
              </div>
            </div>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Join a Program
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
              Partner with Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;