import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Mail, 
  Phone,
  MapPin,
  Award,
  Sparkles,
  ChevronRight,
  Heart,
  Target,
  Shield,
  Briefcase,
  UserCheck,
  Globe
} from "lucide-react";
import { useState, useEffect } from "react";

const Team = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('team-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const leadership = [
    {
      name: "Sarah Kimutai",
      role: "Executive Director & Co-Founder",
      department: "Leadership",
      bio: "A passionate community development professional with extensive experience in youth and women empowerment. Sarah co-founded Tujitume in April 2025 after witnessing firsthand the challenges facing young people in Nandi County. She holds a degree in Social Work and brings proven expertise in entrepreneurship training.",
      achievements: [
        "Co-founded organization in April 2025 with clear vision and strategic planning",
        "Rapidly secured partnerships with 8+ local and international organizations", 
        "Recognized as 'Young Leader of the Year' by Nandi County Government (2022)",
        "Certified trainer in business development and financial literacy"
      ],
      expertise: ["Community Development", "Strategic Planning", "Partnership Development", "Youth Mentoring"],
      contact: "s.kimutai@tujitume.org",
      phone: "+254 712 345 678",
      image: "/team/sarah-kimutai.jpg", // Placeholder for actual photo
      color: "secondary"
    },
    {
      name: "James Kosgei", 
      role: "Programs Manager",
      department: "Operations",
      bio: "With a background in project management and community organizing, James oversees the implementation of all Tujitume programs across 8 sub-counties. His expertise in monitoring and evaluation ensures maximum impact from every intervention. He has managed projects worth over KES 10 million.",
      achievements: [
        "Successfully managed 8 concurrent programs across multiple locations",
        "Developed comprehensive M&E framework adopted by partner organizations",
        "Led COVID-19 response program reaching 1,000+ vulnerable households",
        "Masters in Development Studies from University of Nairobi"
      ],
      expertise: ["Project Management", "Monitoring & Evaluation", "Community Mobilization", "Program Design"],
      contact: "j.kosgei@tujitume.org", 
      phone: "+254 720 987 654",
      image: "/team/james-kosgei.jpg",
      color: "primary"
    },
    {
      name: "Grace Chepkemoi",
      role: "Women Empowerment Coordinator", 
      department: "Programs",
      bio: "Grace leads our women-focused initiatives, bringing lived experience and academic expertise to advance gender equality. She has facilitated over 100 women's groups and is a certified trainer in Gender-Based Violence prevention and Sexual Reproductive Health Rights.",
      achievements: [
        "Established 25+ women's self-help groups across Nandi County",
        "Trained 300+ women in financial literacy and business skills", 
        "Developed innovative SRHR education curriculum adopted regionally",
        "Recipient of UN Women's Community Champion Award (2023)"
      ],
      expertise: ["Gender Equality", "SRHR Education", "Group Formation", "GBV Prevention"],
      contact: "g.chepkemoi@tujitume.org",
      phone: "+254 733 456 789", 
      image: "/team/grace-chepkemoi.jpg",
      color: "accent"
    },
    {
      name: "David Kiprop",
      role: "Finance & Administration Manager",
      department: "Operations", 
      bio: "David ensures financial transparency and operational efficiency across all Tujitume activities. With his background in accounting and nonprofit management, he has established robust systems that have earned recognition from donors and auditors alike.",
      achievements: [
        "Implemented zero-tolerance financial management systems",
        "Achieved 100% clean audit reports for 5 consecutive years",
        "Reduced administrative costs by 30% through process optimization",
        "CPA Kenya and certified in NGO financial management"
      ],
      expertise: ["Financial Management", "Compliance", "Systems Development", "Audit Coordination"],
      contact: "d.kiprop@tujitume.org",
      phone: "+254 745 123 456",
      image: "/team/david-kiprop.jpg", 
      color: "community"
    }
  ];

  const boardMembers = [
    {
      name: "Hon. Mary Keitany",
      role: "Board Chairperson",
      background: "Former County Executive Committee Member, advocate for youth and women rights",
      expertise: "Governance, Policy Development, Strategic Oversight"
    },
    {
      name: "Dr. Peter Langat", 
      role: "Board Member - Programs",
      background: "Development practitioner with 20+ years in community health and education",
      expertise: "Program Quality Assurance, Health Systems, Research"
    },
    {
      name: "Esther Sang",
      role: "Board Treasurer", 
      background: "Senior banker with expertise in microfinance and women's economic empowerment",
      expertise: "Financial Oversight, Risk Management, Microfinance"
    }
  ];

  const stats = [
    { icon: Users, value: "15+", label: "Team Members", color: "text-secondary" },
    { icon: Award, value: "25+", label: "Years Combined Experience", color: "text-primary" },
    { icon: Target, value: "8", label: "Sub-counties Covered", color: "text-accent" },
    { icon: Heart, value: "500+", label: "Lives Directly Impacted", color: "text-community" }
  ];

  return (
    <section id="team-section" className="py-20 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 right-16 w-40 h-40 bg-secondary rounded-full animate-float-particles"></div>
        <div className="absolute bottom-32 left-16 w-32 h-32 bg-primary rounded-full animate-float-particles" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-secondary mr-2 animate-bounce-slow" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wide">Meet Our Team</span>
            <Sparkles className="h-6 w-6 text-secondary ml-2 animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            The <span className="text-brand-gradient">People</span> Behind Our Mission
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Passionate professionals dedicated to empowering communities and creating lasting change
          </p>
        </div>

        {/* Team Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 hover:border-secondary/20">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-gradient-brand rounded-full mb-4">
                      <Icon className={`h-8 w-8 text-white`} />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Leadership Team */}
        <div className={`mb-20 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Leadership <span className="text-secondary">Team</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced leaders driving innovation and impact in community development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {leadership.map((member, index) => (
              <Card 
                key={index}
                className={`group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 hover:border-${member.color}/30 overflow-hidden`}
                onClick={() => setSelectedMember(selectedMember === index ? null : index)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Member Photo Placeholder */}
                    <div className="h-64 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                      <div className="w-32 h-32 bg-gradient-brand rounded-full flex items-center justify-center">
                        <Users className="h-16 w-16 text-white" />
                      </div>
                      {/* Floating badge */}
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="font-medium">
                          {member.department}
                        </Badge>
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h4 className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                          {member.name}
                        </h4>
                        <p className="text-lg text-secondary font-semibold mb-3">{member.role}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {member.expertise.slice(0, 2).map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {member.expertise.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.expertise.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-foreground transition-colors duration-300">
                        {member.bio}
                      </p>

                      {/* Contact Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-4 w-4 mr-2 text-secondary" />
                          <span>{member.contact}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 mr-2 text-secondary" />
                          <span>{member.phone}</span>
                        </div>
                      </div>

                      {/* Expand/Collapse Button */}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full group-hover:bg-secondary group-hover:text-white transition-all duration-300"
                      >
                        <span>{selectedMember === index ? 'Show Less' : 'View Full Profile'}</span>
                        <ChevronRight className={`h-4 w-4 ml-2 transition-transform duration-300 ${
                          selectedMember === index ? 'rotate-90' : ''
                        }`} />
                      </Button>

                      {/* Expanded Content */}
                      {selectedMember === index && (
                        <div className="mt-6 pt-6 border-t border-muted animate-slide-in-up">
                          <div className="space-y-6">
                            {/* Full Expertise */}
                            <div>
                              <h5 className="text-lg font-semibold text-primary mb-3">Areas of Expertise</h5>
                              <div className="flex flex-wrap gap-2">
                                {member.expertise.map((skill, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Key Achievements */}
                            <div>
                              <h5 className="text-lg font-semibold text-primary mb-3">Key Achievements</h5>
                              <ul className="space-y-2">
                                {member.achievements.map((achievement, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-start">
                                    <Award className="h-4 w-4 mr-2 mt-0.5 text-secondary flex-shrink-0" />
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Board of Directors */}
        <div className={`mb-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Board of <span className="text-secondary">Directors</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Distinguished leaders providing strategic guidance and governance oversight
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {boardMembers.map((member, index) => (
              <Card 
                key={index}
                className="p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 hover:border-primary/20"
                style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
              >
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-gradient-community rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-2">{member.name}</h4>
                  <p className="text-secondary font-semibold mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{member.background}</p>
                  <Badge variant="outline" className="text-xs">
                    {member.expertise}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Join Our Team CTA */}
        <div className={`text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Card className="p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-2 border-secondary/20 max-w-4xl mx-auto">
            <CardContent className="p-0">
              <div className="text-center">
                <Briefcase className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Join Our <span className="text-secondary">Team</span>
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Are you passionate about community development and youth empowerment? 
                  We're always looking for dedicated individuals to join our mission.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="group">
                    <UserCheck className="h-4 w-4 mr-2" />
                    <span>View Open Positions</span>
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  <Button size="lg" variant="outline">
                    <Globe className="h-4 w-4 mr-2" />
                    Volunteer Opportunities
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Team;
