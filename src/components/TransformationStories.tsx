import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  MapPin,
  Calendar,
  Target,
  Award,
  Sparkles
} from "lucide-react";

interface TransformationStory {
  id: string;
  title: string;
  description: string;
  beneficiary: string;
  program: string;
  location: string;
  timeline: string;
  beforeImage: string;
  afterImage: string;
  beforeDescription: string;
  afterDescription: string;
  metrics: {
    label: string;
    before: string | number;
    after: string | number;
    improvement: string;
  }[];
  tags: string[];
  featured: boolean;
}

interface TransformationStoriesProps {
  stories?: TransformationStory[];
  title?: string;
  description?: string;
  maxStories?: number;
}

const defaultStories: TransformationStory[] = [
  {
    id: "trans-001",
    title: "From Struggling Single Mother to Successful Entrepreneur",
    description: "Mary Chebet's journey from financial hardship to running a thriving tailoring business that employs three other women.",
    beneficiary: "Mary Chebet, 24",
    program: "Economic Empowerment",
    location: "Kapsabet, Nandi County",
    timeline: "2022 - 2024",
    beforeImage: "/images/activities/transformations/mary-before.jpg",
    afterImage: "/images/activities/transformations/mary-after.jpg",
    beforeDescription: "Single mother struggling to provide for her family, living in a single room with no stable income source.",
    afterDescription: "Owner of 'Mary's Tailoring Hub' employing 3 women, living in a 3-bedroom house with stable income and savings.",
    metrics: [
      { label: "Monthly Income", before: "KES 5,000", after: "KES 35,000", improvement: "+600%" },
      { label: "Jobs Created", before: "0", after: "3", improvement: "New employment opportunities" },
      { label: "Family Status", before: "Struggling", after: "Stable & Thriving", improvement: "Life transformed" }
    ],
    tags: ["economic-empowerment", "women-entrepreneurship", "job-creation"],
    featured: true
  },
  {
    id: "trans-002",
    title: "From Struggling Farm to Climate-Smart Success",
    description: "Peter Langat transformed his failing farm using climate-smart agriculture techniques, doubling his yield and income.",
    beneficiary: "Peter Langat, 26",
    program: "Climate Action & Environmental Conservation",
    location: "Kabiyet, Nandi County",
    timeline: "2023 - 2024",
    beforeImage: "/images/activities/transformations/peter-farm-before.jpg",
    afterImage: "/images/activities/transformations/peter-farm-after.jpg",
    beforeDescription: "Struggling with drought-affected crops, low yields, and traditional farming methods failing due to climate change.",
    afterDescription: "Thriving sustainable farm with drought-resistant crops, improved yields, and income from organic vegetables sold to local schools.",
    metrics: [
      { label: "Crop Yield", before: "6 bags/acre", after: "15 bags/acre", improvement: "+150%" },
      { label: "Annual Income", before: "KES 80,000", after: "KES 180,000", improvement: "+125%" },
      { label: "Water Usage", before: "High dependency", after: "50% reduction", improvement: "Water efficient" }
    ],
    tags: ["climate-smart-agriculture", "sustainable-farming", "environmental-conservation"],
    featured: true
  },
  {
    id: "trans-003",
    title: "From Tech Novice to Digital Entrepreneur",
    description: "David Kiprotich went from having no computer experience to running his own web development company in just 18 months.",
    beneficiary: "David Kiprotich, 22",
    program: "Digital Inclusion & Innovation",
    location: "Mosoriot, Nandi County",
    timeline: "2023 - 2024",
    beforeImage: "/images/activities/transformations/david-before.jpg",
    afterImage: "/images/activities/transformations/david-after.jpg",
    beforeDescription: "Rural youth with no computer experience, limited opportunities, considering migration to urban areas for work.",
    afterDescription: "Owner of 'Nandi Digital Solutions' with 2 employees, serving 15+ local businesses with web development services.",
    metrics: [
      { label: "Digital Skills", before: "None", after: "Advanced", improvement: "Full transformation" },
      { label: "Business Clients", before: "0", after: "15+", improvement: "Successful enterprise" },
      { label: "Monthly Revenue", before: "KES 0", after: "KES 45,000", improvement: "Sustainable income" }
    ],
    tags: ["digital-literacy", "tech-entrepreneurship", "youth-empowerment"],
    featured: false
  }
];

const TransformationStories = ({ 
  stories = defaultStories,
  title = "Transformation Stories",
  description = "See how our programs create lasting change in people's lives through these powerful before and after stories",
  maxStories
}: TransformationStoriesProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('transformation-stories-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const displayStories = maxStories ? stories.slice(0, maxStories) : stories;
  const currentStory = displayStories[selectedStory];

  return (
    <section id="transformation-stories-section" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center mb-4">
            <TrendingUp className="h-6 w-6 text-secondary mr-2" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wide">Real Impact</span>
            <TrendingUp className="h-6 w-6 text-secondary ml-2" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            {title}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Story Selector */}
        {displayStories.length > 1 && (
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {displayStories.map((story, index) => (
              <Button
                key={story.id}
                variant={selectedStory === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStory(index)}
                className="text-sm"
              >
                {story.beneficiary.split(',')[0]}
              </Button>
            ))}
          </div>
        )}

        {/* Main Story Display */}
        <div className={`transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Card className="overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* Story Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{currentStory.program}</Badge>
                    {currentStory.featured && <Badge>Featured Story</Badge>}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    {currentStory.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {currentStory.description}
                  </p>
                </div>

                {/* Story Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-secondary mt-1" />
                      <div>
                        <div className="font-semibold text-primary">Beneficiary</div>
                        <div className="text-muted-foreground">{currentStory.beneficiary}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-secondary mt-1" />
                      <div>
                        <div className="font-semibold text-primary">Location</div>
                        <div className="text-muted-foreground">{currentStory.location}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-secondary mt-1" />
                      <div>
                        <div className="font-semibold text-primary">Program</div>
                        <div className="text-muted-foreground">{currentStory.program}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-secondary mt-1" />
                      <div>
                        <div className="font-semibold text-primary">Timeline</div>
                        <div className="text-muted-foreground">{currentStory.timeline}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Key Improvements
                  </h4>
                  <div className="space-y-3">
                    {currentStory.metrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <div className="font-semibold text-primary">{metric.label}</div>
                          <div className="text-sm text-muted-foreground">{metric.improvement}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{metric.before}</span>
                            <ArrowRight className="h-4 w-4 text-secondary" />
                            <span className="font-bold text-secondary">{metric.after}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Before/After Images */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-primary text-center">Visual Transformation</h4>
                
                {/* Before Image */}
                <div className="space-y-3">
                  <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">
                    Before
                  </Badge>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={currentStory.beforeImage}
                      alt={`Before: ${currentStory.beneficiary}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <p className="absolute bottom-4 left-4 right-4 text-white text-sm">
                      {currentStory.beforeDescription}
                    </p>
                  </div>
                </div>

                {/* Transformation Arrow */}
                <div className="flex justify-center">
                  <div className="p-4 bg-secondary/10 rounded-full">
                    <ArrowRight className="h-8 w-8 text-secondary" />
                  </div>
                </div>

                {/* After Image */}
                <div className="space-y-3">
                  <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                    After
                  </Badge>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={currentStory.afterImage}
                      alt={`After: ${currentStory.beneficiary}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <p className="absolute bottom-4 left-4 right-4 text-white text-sm">
                      {currentStory.afterDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Button size="lg" className="group">
            <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
            <span>See All Transformation Stories</span>
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TransformationStories;