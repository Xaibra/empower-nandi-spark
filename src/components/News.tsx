import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  ArrowRight,
  Heart,
  Users,
  Award,
  Sparkles,
  BookOpen,
  MessageCircle,
  Share2,
  ChevronRight,
  TrendingUp,
  MapPin,
  Camera,
  Video,
  FileText
} from "lucide-react";
import { useState, useEffect } from "react";

const News = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('news-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const categories = [
    { id: "all", label: "All News", icon: BookOpen },
    { id: "programs", label: "Program Updates", icon: Users },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "events", label: "Events", icon: Calendar },
    { id: "community", label: "Community Stories", icon: Heart }
  ];

  const newsArticles = [
    {
      id: 1,
      title: "500 Youth Graduated from Digital Skills Program",
      excerpt: "Our largest cohort yet completes comprehensive digital literacy training, with 90% securing employment or starting digital businesses within 6 months.",
      category: "achievements",
      type: "article",
      author: "Sarah Kimutai",
      date: "2024-11-15",
      readTime: "4 min",
      image: "/news/digital-skills-graduation.jpg",
      tags: ["Digital Skills", "Youth Employment", "Success Story"],
      featured: true,
      views: 1250,
      shares: 45
    },
    {
      id: 2,
      title: "New Partnership with Mastercard Foundation Launched",
      excerpt: "USD 25,000 funding secured to expand youth entrepreneurship programs across 3 additional sub-counties in Nandi County.",
      category: "programs",
      type: "announcement",
      author: "James Kosgei",
      date: "2024-11-10",
      readTime: "3 min",
      image: "/news/mastercard-partnership.jpg",
      tags: ["Partnership", "Funding", "Youth Entrepreneurship"],
      featured: false,
      views: 890,
      shares: 32
    },
    {
      id: 3,
      title: "Community Climate Action Day - September 2024",
      excerpt: "Join us for a county-wide tree planting initiative aimed at restoring 100 hectares of degraded land. Free training on climate-smart agriculture included.",
      category: "events",
      type: "event",
      author: "Grace Chepkemoi",
      date: "2024-11-05",
      readTime: "2 min",
      image: "/news/climate-action-day.jpg",
      tags: ["Climate Action", "Tree Planting", "Community Event"],
      featured: false,
      views: 650,
      shares: 28
    },
    {
      id: 4,
      title: "Mary's Tailoring Business: From Training to Transformation",
      excerpt: "Follow Mary Chebet's inspiring journey from our business training program participant to successful entrepreneur employing 3 women in her community.",
      category: "community",
      type: "story",
      author: "Tujitume Team",
      date: "2024-10-28",
      readTime: "6 min",
      image: "/news/mary-tailoring-story.jpg",
      tags: ["Success Story", "Women Empowerment", "Business"],
      featured: true,
      views: 2100,
      shares: 78
    },
    {
      id: 5,
      title: "UN Women Recognizes Tujitume as Community Champion",
      excerpt: "Our organization receives prestigious Community Champion Award for excellence in promoting women's economic empowerment and gender equality.",
      category: "achievements",
      type: "award",
      author: "Communications Team",
      date: "2024-10-20",
      readTime: "3 min",
      image: "/news/un-women-award.jpg",
      tags: ["Award", "Recognition", "Gender Equality"],
      featured: false,
      views: 1580,
      shares: 95
    },
    {
      id: 6,
      title: "Upcoming: Youth Leadership Summit 2024",
      excerpt: "3-day summit bringing together 200 young leaders from across Nandi County. Featuring workshops on leadership, advocacy, and social entrepreneurship.",
      category: "events",
      type: "event",
      author: "David Kiprop",
      date: "2024-10-15",
      readTime: "4 min",
      image: "/news/youth-summit.jpg",
      tags: ["Youth Leadership", "Summit", "Capacity Building"],
      featured: false,
      views: 920,
      shares: 41
    }
  ];

  const upcomingEvents = [
    {
      title: "Women's Economic Empowerment Workshop",
      date: "2024-12-15",
      time: "9:00 AM",
      location: "Kapsabet Community Center",
      type: "Workshop",
      participants: 50
    },
    {
      title: "Digital Skills Bootcamp Registration Opens",
      date: "2024-12-20",
      time: "8:00 AM",
      location: "Online Registration",
      type: "Registration",
      participants: 100
    },
    {
      title: "Community Health Fair",
      date: "2024-12-25",
      time: "10:00 AM",
      location: "Mosoriot Market",
      type: "Health Fair",
      participants: 300
    }
  ];

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return Video;
      case 'event': return Calendar;
      case 'story': return Heart;
      case 'award': return Award;
      default: return FileText;
    }
  };

  const filteredNews = selectedCategory === "all" 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const featuredNews = newsArticles.filter(article => article.featured);
  const regularNews = filteredNews.filter(article => !article.featured);

  return (
    <section id="news-section" className="py-20 bg-gradient-to-br from-muted/20 via-background to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 right-20 w-40 h-40 bg-secondary rounded-full animate-float-particles"></div>
        <div className="absolute bottom-40 left-16 w-32 h-32 bg-primary rounded-full animate-float-particles" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-80 left-32 w-28 h-28 bg-accent rounded-full animate-float-particles" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-secondary mr-2 animate-bounce-slow" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wide">Latest Updates</span>
            <Sparkles className="h-6 w-6 text-secondary ml-2 animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            News & <span className="text-brand-gradient">Updates</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Stay connected with our latest programs, achievements, and community stories
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2 transition-all duration-300"
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className={`mb-16 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Featured <span className="text-secondary">Stories</span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredNews.map((article, index) => {
                const TypeIcon = getTypeIcon(article.type);
                return (
                  <Card 
                    key={article.id}
                    className="group overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 hover:border-secondary/30"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        {/* Article Image Placeholder */}
                        <div className="h-64 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                          <div className="w-24 h-24 bg-gradient-brand rounded-full flex items-center justify-center">
                            <TypeIcon className="h-12 w-12 text-white" />
                          </div>
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="font-medium">
                              Featured
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge variant="outline" className="bg-white/80 text-xs capitalize">
                              {article.type}
                            </Badge>
                          </div>
                        </div>

                        {/* Article Content */}
                        <div className="p-6">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {article.tags.slice(0, 2).map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <h4 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                            {article.title}
                          </h4>

                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-foreground transition-colors duration-300">
                            {article.excerpt}
                          </p>

                          {/* Article Meta */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(article.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{article.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Share2 className="h-3 w-3" />
                                <span>{article.shares}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>By {article.author}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                              <span className="mr-2">Read More</span>
                              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular News Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {regularNews.map((article, index) => {
            const TypeIcon = getTypeIcon(article.type);
            return (
              <Card 
                key={article.id}
                className="group transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 hover:border-secondary/20 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Article Image Placeholder */}
                    <div className="h-48 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center relative">
                      <div className="w-16 h-16 bg-gradient-community rounded-full flex items-center justify-center">
                        <TypeIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="bg-white/80 text-xs capitalize">
                          {article.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="p-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {article.tags.slice(0, 1).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <h4 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h4>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2 group-hover:text-foreground transition-colors duration-300">
                        {article.excerpt}
                      </p>

                      {/* Article Meta */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" className="w-full group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                        <span className="mr-2">Read More</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Upcoming Events */}
        <div className={`mb-16 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              Upcoming <span className="text-secondary">Events</span>
            </h3>
            <p className="text-muted-foreground">Don't miss these important community events</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card 
                key={index}
                className="p-6 transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 hover:border-secondary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    
                    <Badge variant="secondary" className="mb-3">
                      {event.type}
                    </Badge>
                    
                    <h4 className="text-lg font-bold text-primary mb-3">
                      {event.title}
                    </h4>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="h-4 w-4 text-secondary" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="h-4 w-4 text-secondary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4 text-secondary" />
                        <span className="text-center">{event.location}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Users className="h-4 w-4 text-secondary" />
                        <span>{event.participants} participants expected</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-4 w-full">
                      <span className="mr-2">Register</span>
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Card className="p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-2 border-secondary/20 max-w-4xl mx-auto">
            <CardContent className="p-0">
              <MessageCircle className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Stay <span className="text-secondary">Connected</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest updates on programs, events, and success stories 
                from our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <Button size="lg" className="group">
                  <span className="mr-2">Subscribe</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default News;
