import PhotoGallery from "@/components/PhotoGallery";
import { sampleActivityImages, getFeaturedImages } from "@/data/activityImages";

const PhotoGallerySection = () => {
  return (
    <PhotoGallery
      images={sampleActivityImages}
      title="Our Work in Action"
      description="See the real impact of our programs through photos of community activities, training sessions, success stories, and transformational moments across Nandi County"
      showFilters={true}
      showStats={true}
      showLightbox={true}
    />
  );
};

export default PhotoGallerySection;