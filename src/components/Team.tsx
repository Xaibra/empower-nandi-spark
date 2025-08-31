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
  Globe,
  Crown,
  Building,
  DollarSign,
  BookOpen,
  Laptop,
  UserPlus,
  TrendingUp
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

  // Organizational Structure with Departments
  const organizationalStructure = {
    executive: {
      title: "Executive Leadership",
      departments: [
        {
          name: "Executive Director",
          level: "senior",
          gender: "female",
          icon: Crown,
          color: "secondary",
          responsibilities: ["Strategic Leadership", "External Relations", "Board Reporting", "Vision Setting"],
          description: "Provides overall strategic direction and represents the organization externally."
        }
      ]
    },
    senior: {
      title: "Senior Management",
      departments: [
        {
          name: "Programs Director",
          level: "senior",
          gender: "female",
          icon: Building,
          color: "primary",
          responsibilities: ["Program Strategy", "Quality Assurance", "Impact Measurement", "Innovation"],
          description: "Oversees all program implementation and ensures quality delivery across all initiatives."
        },
        {
          name: "Operations Director",
          level: "senior",
          gender: "female",
          icon: Target,
          color: "accent",
          responsibilities: ["Operations Management", "Human Resources", "Systems & Processes", "Compliance"],
          description: "Manages day-to-day operations and ensures organizational efficiency and compliance."
        },
        {
          name: "Finance Director",
          level: "senior",
          gender: "male",
          icon: DollarSign,
          color: "community",
          responsibilities: ["Financial Management", "Budget Planning", "Donor Relations", "Risk Management"],
          description: "Ensures financial sustainability and transparency across all organizational activities."
        }
      ]
    },
    middle: {
      title: "Department Heads",
      departments: [
        {
          name: "Women Empowerment Manager",
          level: "middle",
          gender: "female",
          icon: Heart,
          color: "secondary",
          responsibilities: ["Gender Programs", "SRHR Education", "Women's Groups", "GBV Prevention"],
          description: "Leads initiatives focused on women's economic empowerment and gender equality."
        },
        {
          name: "Youth Programs Manager",
          level: "middle",
          gender: "female",
          icon: Users,
          color: "primary",
          responsibilities: ["Youth Development", "Skills Training", "Leadership Programs", "Mentorship"],
          description: "Coordinates all youth-focused programs and capacity building initiatives."
        },
        {
          name: "Digital Innovation Manager",
          level: "middle",
          gender: "male",
          icon: Laptop,
          color: "accent",
          responsibilities: ["Digital Literacy", "Tech Training", "Innovation Hub", "Digital Solutions"],
          description: "Manages technology programs and digital inclusion initiatives."
        },
        {
          name: "Community Engagement Manager",
          level: "middle",
          gender: "female",
          icon: Globe,
          color: "community",
          responsibilities: ["Community Mobilization", "Outreach Programs", "Partnerships", "Advocacy"],
          description: "Builds and maintains relationships with community stakeholders and partners."
        },
        {
          name: "Monitoring & Evaluation Manager",
          level: "middle",
          gender: "female",
          icon: TrendingUp,
          color: "secondary",
          responsibilities: ["Impact Assessment", "Data Analysis", "Reporting", "Learning & Adaptation"],
          description: "Ensures program effectiveness through comprehensive monitoring and evaluation systems."
        },
        {
          name: "Capacity Building Manager",
          level: "middle",
          gender: "female",
          icon: BookOpen,
          color: "primary",
          responsibilities: ["Training Programs", "Curriculum Development", "Skills Assessment", "Certification"],
          description: "Develops and delivers capacity building programs for beneficiaries and staff."
        }
      ]
    }
  };

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

        {/* Organizational Chart */}
        <div className={`mb-20 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Organizational <span className="text-secondary">Structure</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Departmental leadership structure focused on gender-inclusive governance and community impact
            </p>
          </div>

          {/* Executive Leadership */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-primary mb-2">{organizationalStructure.executive.title}</h4>
              <div className="w-24 h-1 bg-gradient-brand mx-auto"></div>
            </div>
            <div className="flex justify-center">
              {organizationalStructure.executive.departments.map((dept, index) => {
                const Icon = dept.icon;
                return (
                  <Card 
                    key={index}
                    className="w-80 group transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-primary/5"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mr-4">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex items-center">
                          <Badge variant={dept.gender === 'female' ? 'default' : 'outline'} className="text-xs">
                            👩 Female Leadership
                          </Badge>
                        </div>
                      </div>
                      <h5 className="text-xl font-bold text-primary mb-3">{dept.name}</h5>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{dept.description}</p>
                      <div className="space-y-2">
                        {dept.responsibilities.map((resp, idx) => (
                          <div key={idx} className="flex items-center justify-center text-xs text-muted-foreground">
                            <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Senior Management */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-primary mb-2">{organizationalStructure.senior.title}</h4>
              <div className="w-24 h-1 bg-gradient-brand mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {organizationalStructure.senior.departments.map((dept, index) => {
                const Icon = dept.icon;
                return (
                  <Card 
                    key={index}
                    className="group transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 hover:border-primary/20"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-${dept.color} rounded-full flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge 
                          variant={dept.gender === 'female' ? 'default' : 'outline'} 
                          className="text-xs ml-2"
                        >
                          {dept.gender === 'female' ? '👩' : '👨'} {dept.gender === 'female' ? 'Female' : 'Male'}
                        </Badge>
                      </div>
                      <h5 className="text-lg font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                        {dept.name}
                      </h5>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{dept.description}</p>
                      <div className="space-y-1">
                        {dept.responsibilities.map((resp, idx) => (
                          <div key={idx} className="flex items-center text-xs text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 flex-shrink-0"></div>
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Department Heads */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-primary mb-2">{organizationalStructure.middle.title}</h4>
              <div className="w-24 h-1 bg-gradient-brand mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizationalStructure.middle.departments.map((dept, index) => {
                const Icon = dept.icon;
                return (
                  <Card 
                    key={index}
                    className="group transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 hover:border-accent/20"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-5 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <div className={`w-10 h-10 bg-gradient-${dept.color} rounded-full flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <Badge 
                          variant={dept.gender === 'female' ? 'default' : 'outline'} 
                          className="text-xs ml-2"
                        >
                          {dept.gender === 'female' ? '👩' : '👨'} {dept.gender === 'female' ? 'F' : 'M'}
                        </Badge>
                      </div>
                      <h5 className="text-base font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                        {dept.name}
                      </h5>
                      <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">{dept.description}</p>
                      <div className="space-y-1">
                        {dept.responsibilities.slice(0, 2).map((resp, idx) => (
                          <div key={idx} className="flex items-center text-xs text-muted-foreground">
                            <div className="w-1 h-1 bg-accent rounded-full mr-2 flex-shrink-0"></div>
                            <span className="truncate">{resp}</span>
                          </div>
                        ))}
                        {dept.responsibilities.length > 2 && (
                          <Badge variant="outline" className="text-xs mt-2">
                            +{dept.responsibilities.length - 2} more areas
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Gender Leadership Statistics */}
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-8 border-2 border-secondary/20">
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-primary mb-2">Leadership Demographics</h4>
              <p className="text-muted-foreground">Our commitment to inclusive and gender-balanced leadership</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">80%</div>
                <div className="text-sm text-muted-foreground">Women in Leadership</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10</div>
                <div className="text-sm text-muted-foreground">Leadership Positions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">6</div>
                <div className="text-sm text-muted-foreground">Core Departments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-community mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Qualified Leaders</div>
              </div>
            </div>
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
