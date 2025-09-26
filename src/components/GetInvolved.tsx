import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Handshake, Briefcase } from "lucide-react";
import { useButtonAction } from "@/utils/buttonActions";

const GetInvolved = () => {
  const { formActions, socialActions } = useButtonAction();
  
  const opportunities = [
    {
      icon: Heart,
      title: "Donate",
      description: "Support skills training, counseling services, and tree planting initiatives.",
      highlights: [
        "KES 2,000 equips a trainee with learning materials",
        "KES 5,000 supports counseling services",
        "KES 1,000 plants and cares for 10 trees"
      ],
      cta: "Donate Now",
      variant: "success" as const
    },
    {
      icon: Users,
      title: "Volunteer & Mentor",
      description: "Share your skills and experience to empower the next generation.",
      highlights: [
        "Skills training facilitation",
        "Career mentorship programs",
        "Events and communications support"
      ],
      cta: "Become a Mentor",
      variant: "secondary" as const
    },
    {
      icon: Handshake,
      title: "Partner With Us",
      description: "Collaborate on programs and initiatives that create lasting impact.",
      highlights: [
        "Co-implement training programs",
        "Offer internship opportunities",
        "Sponsor program cohorts"
      ],
      cta: "Partner Today",
      variant: "accent" as const
    },
    {
      icon: Briefcase,
      title: "Join Our Team",
      description: "Build your career while making a difference in your community.",
      highlights: [
        "Full-time and part-time positions",
        "Internship opportunities",
        "Professional development support"
      ],
      cta: "View Opportunities",
      variant: "community" as const
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Get Involved
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            There are many ways to support our mission of empowering youth and women. 
            Join us in creating lasting change in Nandi County and beyond.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {opportunities.map((opportunity, index) => {
            const Icon = opportunity.icon;
            return (
              <Card key={index} className="h-full hover:shadow-warm transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-impact mb-4 mx-auto">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-primary">
                    {opportunity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col">
                  <p className="text-muted-foreground mb-6 text-center">
                    {opportunity.description}
                  </p>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {opportunity.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2 mt-2 flex-shrink-0"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={opportunity.variant} 
                    className="w-full"
                    onClick={
                      opportunity.title === 'Donate' ? formActions.openDonationForm :
                      opportunity.title === 'Volunteer & Mentor' ? formActions.openVolunteerForm :
                      opportunity.title === 'Partner With Us' ? formActions.openPartnershipForm :
                      formActions.openContactForm
                    }
                  >
                    {opportunity.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Contact Information */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Have Questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            We'd love to hear from you. Reach out to learn more about our programs 
            and how you can get involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={formActions.openContactForm}
            >
              Contact Us
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              onClick={socialActions.whatsapp}
            >
              WhatsApp: +254 700 000 000
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;