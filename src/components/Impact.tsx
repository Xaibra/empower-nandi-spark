import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const Impact = () => {
  const stats = [
    { number: "500+", label: "Youth Empowered", color: "text-secondary" },
    { number: "85%", label: "Employment Rate", color: "text-success" },
    { number: "300+", label: "Women Supported", color: "text-community" },
    { number: "50+", label: "Enterprises Created", color: "text-accent" }
  ];

  return (
    <section className="py-20 gradient-community">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-white/90 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Testimonial */}
        <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <Quote className="h-12 w-12 text-accent mb-6 mx-auto" />
            <blockquote className="text-xl md:text-2xl text-center text-foreground mb-8 leading-relaxed">
              "Tujitume believed in me when I had no experience. Today I run a small business 
              and mentor other girls in my village. The skills and confidence I gained here 
              changed not just my life, but my entire community's future."
            </blockquote>
            <div className="text-center">
              <cite className="text-lg font-semibold text-primary not-italic">
                Mercy Chepkoech
              </cite>
              <div className="text-muted-foreground mt-1">
                Youth Beneficiary, Nandi County
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Make an Impact?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of youth and women who are transforming their communities 
            through our comprehensive empowerment programs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Impact;