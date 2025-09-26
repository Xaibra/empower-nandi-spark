import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Share2,
  Calendar,
  MapPin,
  Users,
  Eye,
  Heart,
  ZoomIn,
  Filter,
  Grid3X3,
  List
} from "lucide-react";

interface PhotoGalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  participants: number;
  photographer?: string;
  tags: string[];
  featured: boolean;
}

interface PhotoGalleryProps {
  images: PhotoGalleryImage[];
  title?: string;
  description?: string;
  showFilters?: boolean;
  showStats?: boolean;
  maxImages?: number;
  layout?: 'grid' | 'masonry' | 'carousel';
  showLightbox?: boolean;
}

const PhotoGallery = ({ 
  images, 
  title = "Photo Gallery",
  description,
  showFilters = true,
  showStats = true,
  maxImages,
  layout = 'grid',
  showLightbox = true
}: PhotoGalleryProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<PhotoGalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('photo-gallery-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Get unique categories for filtering
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];
  
  // Filter images based on selected category and limit
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);
  
  const displayImages = maxImages 
    ? filteredImages.slice(0, maxImages)
    : filteredImages;

  const openLightbox = (image: PhotoGalleryImage) => {
    if (!showLightbox) return;
    setSelectedImage(image);
    setLightboxIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const stats = {
    total: images.length,
    categories: categories.length - 1,
    participants: images.reduce((sum, img) => sum + img.participants, 0),
    locations: Array.from(new Set(images.map(img => img.location))).length
  };

  return (
    <section id="photo-gallery-section" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center mb-4">
            <Camera className="h-6 w-6 text-secondary mr-2" />
            <span className="text-sm font-medium text-secondary uppercase tracking-wide">Our Activities</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Stats Section */}
        {showStats && (
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {[
              { label: "Photos", value: stats.total, icon: Camera },
              { label: "Programs", value: stats.categories, icon: Grid3X3 },
              { label: "Participants", value: stats.participants, icon: Users },
              { label: "Locations", value: stats.locations, icon: MapPin }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 text-center hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-0">
                    <Icon className="h-8 w-8 text-secondary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Filters and View Controls */}
        {showFilters && (
          <div className={`flex flex-wrap justify-between items-center gap-4 mb-8 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'All Photos' : category}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Photo Grid */}
        <div className={`transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayImages.map((image, index) => (
                <Card 
                  key={image.id}
                  className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="rounded-full">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {image.featured && (
                      <Badge className="absolute top-3 left-3 bg-secondary text-white">
                        Featured
                      </Badge>
                    )}
                    <Badge variant="outline" className="absolute bottom-3 right-3 bg-white/90">
                      {image.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-primary mb-2 line-clamp-2">{image.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{image.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{image.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{image.participants}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {displayImages.map((image, index) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3">
                      <div className="aspect-video lg:aspect-square overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <CardContent className="lg:w-2/3 p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{image.category}</Badge>
                        {image.featured && <Badge>Featured</Badge>}
                      </div>
                      <h4 className="text-xl font-semibold text-primary mb-3">{image.title}</h4>
                      <p className="text-muted-foreground mb-4">{image.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{image.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{image.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{image.participants} participants</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Show More Button */}
        {maxImages && filteredImages.length > maxImages && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              View All {filteredImages.length} Photos
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && showLightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="max-w-4xl max-h-full overflow-hidden">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[70vh] object-contain"
            />
            <div className="bg-white/10 backdrop-blur-sm text-white p-6 mt-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-white/80 mb-4">{selectedImage.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedImage.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedImage.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{selectedImage.participants} participants</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;