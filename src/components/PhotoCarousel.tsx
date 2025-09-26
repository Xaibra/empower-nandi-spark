import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Camera,
  MapPin,
  Users,
  Calendar,
  Play
} from "lucide-react";

interface PhotoCarouselImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  participants: number;
  featured: boolean;
}

interface PhotoCarouselProps {
  images: PhotoCarouselImage[];
  title?: string;
  autoPlay?: boolean;
  showInfo?: boolean;
  className?: string;
}

const PhotoCarousel = ({ 
  images, 
  title = "Activity Photos",
  autoPlay = true,
  showInfo = true,
  className = ""
}: PhotoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('photo-carousel-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Auto-rotate images
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <section id="photo-carousel-section" className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Title */}
        {title && (
          <div className={`text-center mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center justify-center mb-4">
              <Camera className="h-5 w-5 text-secondary mr-2" />
              <h3 className="text-2xl md:text-3xl font-bold text-primary">{title}</h3>
            </div>
          </div>
        )}

        {/* Main Carousel */}
        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Card className="overflow-hidden shadow-xl">
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-video md:aspect-[21/9] overflow-hidden relative">
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <Badge className="absolute top-4 left-4 bg-secondary text-white">
                  {currentImage.category}
                </Badge>
                
                {/* Featured Badge */}
                {currentImage.featured && (
                  <Badge className="absolute top-4 right-4 bg-accent text-white">
                    Featured
                  </Badge>
                )}

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}

                {/* Info Overlay */}
                {showInfo && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h4 className="text-xl md:text-2xl font-bold mb-2">{currentImage.title}</h4>
                    <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2">
                      {currentImage.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(currentImage.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{currentImage.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{currentImage.participants} participants</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dot Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentIndex === index 
                          ? 'bg-white w-8' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className={`mt-6 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-secondary/20">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                    currentIndex === index 
                      ? 'ring-2 ring-secondary transform scale-105' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-20 h-12 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Image Counter */}
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Photo {currentIndex + 1} of {images.length}
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;