import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  GraduationCap, 
  Shield, 
  Heart, 
  Leaf, 
  Vote, 
  Palette, 
  Smartphone,
  ArrowRight
} from "lucide-react";

const Programs = () => {
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Programs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive programs designed to empower youth and women through 
            skills development, leadership training, and community engagement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Card key={index} className="h-full hover:shadow-impact transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg gradient-impact mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg leading-tight text-primary">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 text-sm">
                    {program.description}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {program.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2 flex-shrink-0"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" size="sm" className="w-full text-accent hover:text-accent">
                    Learn More
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="accent" className="px-8">
            Explore All Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Programs;