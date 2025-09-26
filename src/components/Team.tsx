import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
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
  TrendingUp,
  Zap,
  Lightbulb,
  Handshake,
  Star,
  CheckCircle,
  ArrowRight,
  User,
  Brain,
  FileText
} from "lucide-react";
import { useState, useEffect } from "react";
import { useButtonAction } from "@/utils/buttonActions";

const Team = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('leadership');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { formActions, ctaActions } = useButtonAction();

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

  // Simplified Leadership Structure
  const leadershipTeam = [
    {
      name: "Noeline Maru",
      role: "Founder & Executive Director",
      icon: Crown,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      gender: "female",
      description: "Visionary leader with deep commitment to community transformation and youth empowerment.",
      expertise: ["Strategic Leadership", "Community Development", "Social Innovation"],
      impact: "Founded Tujitume to address root causes of poverty and create sustainable change",
      quote: "Solutions lie within us - we exist to inspire and equip youth and women to thrive."
    },
    {
      name: "Programs Director",
      role: "Program Strategy & Implementation",
      icon: Building,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      gender: "female",
      description: "Leads comprehensive program delivery across 8 key sectors with focus on measurable impact.",
      expertise: ["Program Management", "Impact Measurement", "Quality Assurance"],
      impact: "Oversees programs reaching 800+ beneficiaries across 8 sub-counties",
      quote: "Quality delivery and sustainable impact guide everything we do."
    },
    {
      name: "Operations Director",
      role: "Operations & Human Resources",
      icon: Target,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      gender: "female",
      description: "Ensures organizational efficiency and compliance while fostering inclusive workplace culture.",
      expertise: ["Operations Management", "HR Systems", "Compliance"],
      impact: "Built efficient systems supporting 80% women in leadership positions",
      quote: "Efficient operations enable us to maximize our community impact."
    },
    {
      name: "Finance Director",
      role: "Financial Management & Sustainability",
      icon: DollarSign,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      gender: "male",
      description: "Ensures financial transparency and sustainability through strategic resource management.",
      expertise: ["Financial Planning", "Donor Relations", "Risk Management"],
      impact: "Maintains 100% financial transparency with diverse funding portfolio",
      quote: "Financial integrity builds trust and enables sustainable growth."
    }
  ];

  const departmentHeads = [
    {
      department: "Women Empowerment",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
      focus: ["Gender Equality", "SRHR Education", "Economic Empowerment"],
      impact: "300+ women empowered with skills and opportunities"
    },
    {
      department: "Youth Development",
      icon: Users,
      color: "from-blue-500 to-cyan-600",
      focus: ["Leadership Training", "Skills Development", "Mentorship"],
      impact: "500+ youth trained in leadership and vocational skills"
    },
    {
      department: "Digital Innovation",
      icon: Laptop,
      color: "from-purple-500 to-indigo-600",
      focus: ["Digital Literacy", "Tech Training", "Innovation Hub"],
      impact: "200+ trained in digital skills and technology"
    },
    {
      department: "Community Engagement",
      icon: Globe,
      color: "from-teal-500 to-green-600",
      focus: ["Community Mobilization", "Partnerships", "Advocacy"],
      impact: "50+ strategic partnerships across 8 sub-counties"
    },
    {
      department: "Monitoring & Evaluation",
      icon: TrendingUp,
      color: "from-indigo-500 to-purple-600",
      focus: ["Impact Assessment", "Data Analysis", "Learning"],
      impact: "Comprehensive M&E system tracking 15+ key indicators"
    },
    {
      department: "Capacity Building",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600",
      focus: ["Training Programs", "Curriculum Development", "Certification"],
      impact: "800+ trained through structured capacity building programs"
    }
  ];

  // Simplified Board Structure
  const boardMembers = [
    {
      role: "Board Chairperson",
      icon: Crown,
      color: "from-purple-500 to-pink-600",
      gender: "female",
      expertise: "Governance & Strategic Oversight",
      background: "Senior governance professional with 15+ years in nonprofit leadership"
    },
    {
      role: "Board Treasurer",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      gender: "female",
      expertise: "Financial Management & Risk Assessment",
      background: "Financial professional with expertise in microfinance and audit"
    },
    {
      role: "Programs Committee Chair",
      icon: Building,
      color: "from-blue-500 to-indigo-600",
      gender: "female",
      expertise: "Program Management & Impact Measurement",
      background: "Development practitioner with 20+ years in community programs"
    },
    {
      role: "Secretary",
      icon: FileText,
      color: "from-teal-500 to-cyan-600",
      gender: "female",
      expertise: "Legal Compliance & Governance",
      background: "Legal professional with expertise in nonprofit compliance"
    }
  ];

  const tabs = [
    { id: 'leadership', label: 'Leadership Team', icon: Crown },
    { id: 'departments', label: 'Departments', icon: Building },
    { id: 'governance', label: 'Board', icon: Shield }
  ];

  const stats = [
    { icon: Users, value: "15+", label: "Team Members", color: "text-secondary" },
    { icon: Award, value: "80%", label: "Women Leadership", color: "text-primary" },
    { icon: Target, value: "8", label: "Sub-counties Covered", color: "text-accent" },
    { icon: Heart, value: "800+", label: "Lives Directly Impacted", color: "text-community" }
  ];

  return (
    <section id="team-section" className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-32 right-32 w-24 h-24 bg-secondary rounded-full animate-float-particles" style={{ animationDuration: '12s' }}></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-primary rounded-full animate-float-particles" style={{ animationDelay: '4s', animationDuration: '14s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-20 transition-all duration-1200 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="inline-flex items-center justify-center mb-6">
            <Users className="h-5 w-5 text-secondary mr-3 opacity-70 animate-pulse" />
            <span className="text-sm font-medium text-secondary uppercase tracking-widest">Meet Our Team</span>
            <Users className="h-5 w-5 text-secondary ml-3 opacity-70 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-primary mb-8 leading-tight">
            The <span className="text-brand-gradient">People</span> Behind
            <br />Our Mission
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Meet the <span className="text-secondary font-semibold">passionate professionals</span> dedicated to 
            empowering communities and creating lasting change across 
            <span className="text-secondary font-semibold">8 sub-counties</span>.
          </p>
        </div>

        {/* Team Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1200 delay-300 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center transition-all duration-700 hover:scale-[1.02] hover:shadow-lg border-2 hover:border-secondary/20">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-gradient-brand rounded-full mb-4 transition-transform duration-300 hover:scale-105">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-12 transition-all duration-1200 delay-500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="inline-flex bg-muted rounded-2xl p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-xl transition-all duration-500 ease-out ${
                    activeTab === tab.id
                      ? 'bg-white text-primary shadow-md scale-105'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Leadership Team Tab */}
        {activeTab === 'leadership' && (
          <div className={`mb-20 transition-all duration-700 ease-out ${
            activeTab === 'leadership' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Leadership <span className="text-secondary">Team</span>
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Visionary leaders driving our mission with expertise and passion
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {leadershipTeam.map((leader, index) => {
                const Icon = leader.icon;
                const isHovered = hoveredCard === index;
                
                return (
                  <Card 
                    key={index}
                    className={`group cursor-pointer transition-all duration-700 hover:scale-[1.02] border-2 overflow-hidden ${
                      isHovered 
                        ? 'border-secondary shadow-xl shadow-secondary/10 bg-gradient-to-br from-white to-secondary/3' 
                        : 'border-muted hover:border-secondary/40 hover:shadow-lg'
                    }`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <CardContent className="p-0">
                      {/* Card Header */}
                      <div className={`p-6 relative overflow-hidden transition-all duration-700 ${
                        isHovered ? leader.bgColor : 'bg-muted/10'
                      }`}>
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r ${leader.color} transition-opacity duration-700`}></div>
                        <div className="relative z-10 flex items-center">
                          <div className={`w-16 h-16 rounded-2xl mb-4 mr-4 transition-all duration-700 ease-out flex items-center justify-center ${
                            isHovered 
                              ? `bg-gradient-to-r ${leader.color} scale-105 shadow-md` 
                              : 'bg-white border-2 border-muted'
                          }`}>
                            <Icon className={`h-8 w-8 transition-all duration-300 ${
                              isHovered ? 'text-white' : 'text-secondary'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <Badge 
                              variant={leader.gender === 'female' ? "secondary" : "outline"} 
                              className="mb-2"
                            >
                              {leader.gender === 'female' ? '👩' : '👨'} {leader.gender === 'female' ? 'Female' : 'Male'} Leadership
                            </Badge>
                            <h4 className={`text-xl font-bold transition-colors duration-500 ease-out ${
                              isHovered ? 'text-secondary' : 'text-primary'
                            }`}>
                              {leader.name || leader.role.split(' &')[0]}
                            </h4>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <h5 className="text-lg font-semibold text-primary mb-2">{leader.role}</h5>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 group-hover:text-foreground transition-colors duration-500 ease-out">
                          {leader.description}
                        </p>

                        {/* Expertise Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {leader.expertise.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        {/* Impact Statement */}
                        <div className="bg-muted/20 rounded-lg p-3 mb-4">
                          <p className="text-xs text-muted-foreground font-medium mb-1">Impact:</p>
                          <p className="text-sm text-foreground">{leader.impact}</p>
                        </div>

                        {/* Quote */}
                        <blockquote className={`italic text-sm border-l-4 pl-4 transition-all duration-500 ${
                          isHovered ? 'border-secondary text-secondary' : 'border-muted text-muted-foreground'
                        }`}>
                          "{leader.quote}"
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div className={`mb-20 transition-all duration-700 ease-out ${
            activeTab === 'departments' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Department <span className="text-secondary">Heads</span>
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized teams delivering impact across our 8 core program areas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentHeads.map((dept, index) => {
                const Icon = dept.icon;
                return (
                  <Card 
                    key={index}
                    className="group transition-all duration-700 hover:scale-[1.02] hover:shadow-lg border-2 hover:border-secondary/20"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-r ${dept.color} transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h5 className="text-lg font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                        {dept.department}
                      </h5>
                      <div className="space-y-2 mb-4">
                        {dept.focus.map((area, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs mx-1">
                            {area}
                          </Badge>
                        ))}
                      </div>
                      <div className="bg-muted/20 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground font-medium mb-1">Impact:</p>
                        <p className="text-sm text-foreground">{dept.impact}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Board Tab */}
        {activeTab === 'governance' && (
          <div className={`mb-20 transition-all duration-700 ease-out ${
            activeTab === 'governance' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Board <span className="text-secondary">Governance</span>
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Strategic oversight ensuring accountability, transparency, and community representation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              {boardMembers.map((member, index) => {
                const Icon = member.icon;
                return (
                  <Card 
                    key={index}
                    className="group transition-all duration-700 hover:scale-[1.02] hover:shadow-lg border-2 hover:border-secondary/20"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-r ${member.color} mr-4`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <Badge 
                            variant={member.gender === 'female' ? "secondary" : "outline"} 
                            className="mb-2"
                          >
                            {member.gender === 'female' ? '👩' : '👨'} {member.gender === 'female' ? 'Female' : 'Male'}
                          </Badge>
                          <h5 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors duration-300">
                            {member.role}
                          </h5>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-secondary mb-1">Expertise:</p>
                          <p className="text-sm text-muted-foreground">{member.expertise}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-secondary mb-1">Background:</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{member.background}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Board Statistics */}
            <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-8 border-2 border-secondary/20">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-primary mb-2">Board Demographics</h4>
                <p className="text-muted-foreground">Commitment to diverse and inclusive governance</p>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">75%</div>
                  <div className="text-sm text-muted-foreground">Women on Board</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4</div>
                  <div className="text-sm text-muted-foreground">Board Positions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Professional Expertise</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-community mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Governance Compliance</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Join Our Team CTA */}
        <div className={`text-center transition-all duration-1200 delay-800 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Card className="p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-2 border-secondary/20 max-w-4xl mx-auto">
            <CardContent className="p-0">
              <CheckCircle className="h-10 w-10 text-secondary mx-auto mb-4 animate-pulse opacity-80" />
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Join Our <span className="text-secondary">Team</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Are you passionate about community development and youth empowerment? 
                We're always looking for dedicated individuals to join our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="group px-8 py-4 bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                  onClick={formActions.openContactForm}
                >
                  <UserCheck className="h-5 w-5 mr-2" />
                  <span>View Open Positions</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-0.5 transition-transform duration-500" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full transition-all duration-500 hover:scale-[1.02]"
                  onClick={formActions.openVolunteerForm}
                >
                  <Globe className="h-5 w-5 mr-2" />
                  Volunteer Opportunities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Team;
