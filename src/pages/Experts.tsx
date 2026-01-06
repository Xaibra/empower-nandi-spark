import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Search, MapPin, Briefcase, ChevronDown, AlertCircle } from 'lucide-react';

// Types
interface Expert {
  id: string;
  businessName: string;
  services: string[];
  location: string;
  description: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  phone?: string;
  email?: string;
}

interface SkeletonProps {
  count?: number;
}

// Mock data - replace with API call
const MOCK_EXPERTS: Expert[] = [
  {
    id: '1',
    businessName: 'Agricultural Solutions Ltd',
    services: ['Crop Management', 'Soil Analysis', 'Irrigation'],
    location: 'Nairobi',
    description: 'Specialized in modern farming techniques and crop optimization',
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: '2',
    businessName: 'Livestock Excellence',
    services: ['Animal Health', 'Breeding Programs', 'Feed Management'],
    location: 'Kisumu',
    description: 'Expert livestock management and veterinary services',
    rating: 4.6,
    reviewCount: 98,
  },
  {
    id: '3',
    businessName: 'Nandi Agro Tech',
    services: ['Tech Solutions', 'IoT Sensors', 'Data Analytics'],
    location: 'Nandi',
    description: 'Smart farming technology and digital agricultural solutions',
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: '4',
    businessName: 'Soil & Water Experts',
    services: ['Soil Testing', 'Water Management', 'Conservation'],
    location: 'Nakuru',
    description: 'Sustainable soil and water conservation practices',
    rating: 4.7,
    reviewCount: 112,
  },
  {
    id: '5',
    businessName: 'Green Harvest Consulting',
    services: ['Organic Farming', 'Certification', 'Training'],
    location: 'Nairobi',
    description: 'Organic farming expertise and certification support',
    rating: 4.5,
    reviewCount: 87,
  },
  {
    id: '6',
    businessName: 'Market Link Experts',
    services: ['Market Access', 'Supply Chain', 'Export'],
    location: 'Mombasa',
    description: 'Market linkage and agricultural export services',
    rating: 4.4,
    reviewCount: 76,
  },
  {
    id: '7',
    businessName: 'Finance & Agri Advisory',
    services: ['Farm Finance', 'Investment', 'Risk Management'],
    location: 'Kisumu',
    description: 'Agricultural financing and business advisory services',
    rating: 4.6,
    reviewCount: 105,
  },
  {
    id: '8',
    businessName: 'Climate Smart Agriculture',
    services: ['Climate Adaptation', 'Sustainable Practices', 'Research'],
    location: 'Nandi',
    description: 'Climate-resilient agricultural practices and research',
    rating: 4.8,
    reviewCount: 134,
  },
];

const ITEMS_PER_PAGE = 6;

// Skeleton Loading Component
const ExpertSkeleton: React.FC<SkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={`skeleton-${idx}`}
          className="bg-white rounded-lg shadow-md p-6 animate-pulse"
          role="status"
          aria-label="Loading expert information"
        >
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-3 w-full">
              <div className="h-5 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-300 rounded w-1/4" />
                <div className="h-4 bg-gray-300 rounded w-1/4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// Expert Card Component
interface ExpertCardProps {
  expert: Expert;
  index: number;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert, index }) => {
  return (
    <article
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
      role="article"
      aria-label={`Expert: ${expert.businessName}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {expert.businessName}
          </h3>
          {expert.description && (
            <p className="text-gray-600 text-sm mb-3">{expert.description}</p>
          )}
        </div>
      </div>

      {/* Rating */}
      {expert.rating && (
        <div
          className="flex items-center space-x-2 mb-3"
          aria-label={`Rating: ${expert.rating} out of 5 stars`}
        >
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.floor(expert.rating))}
            {expert.rating % 1 !== 0 && '☆'}
          </div>
          <span className="text-sm text-gray-600">
            {expert.rating} ({expert.reviewCount} reviews)
          </span>
        </div>
      )}

      {/* Services */}
      <div className="mb-4">
        <label
          htmlFor={`services-${expert.id}`}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          <Briefcase className="inline w-4 h-4 mr-2" />
          Services
        </label>
        <div
          id={`services-${expert.id}`}
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Services offered"
        >
          {expert.services.map((service) => (
            <span
              key={service}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center text-gray-600 text-sm mb-4">
        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
        <span>{expert.location}</span>
      </div>

      {/* Action Button */}
      <button
        className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        aria-label={`View details for ${expert.businessName}`}
      >
        View Details
      </button>
    </article>
  );
};

// Filter Component
interface FilterProps {
  locations: string[];
  services: string[];
  selectedLocations: string[];
  selectedServices: string[];
  onLocationChange: (locations: string[]) => void;
  onServiceChange: (services: string[]) => void;
}

const FilterPanel: React.FC<FilterProps> = ({
  locations,
  services,
  selectedLocations,
  selectedServices,
  onLocationChange,
  onServiceChange,
}) => {
  const [isLocationsOpen, setIsLocationsOpen] = useState(true);
  const [isServicesOpen, setIsServicesOpen] = useState(true);

  const handleLocationToggle = (location: string) => {
    const updated = selectedLocations.includes(location)
      ? selectedLocations.filter((l) => l !== location)
      : [...selectedLocations, location];
    onLocationChange(updated);
  };

  const handleServiceToggle = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    onServiceChange(updated);
  };

  return (
    <aside
      className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4"
      role="complementary"
      aria-label="Filters"
    >
      <h2 className="text-lg font-semibold mb-6 text-gray-900">Filters</h2>

      {/* Location Filter */}
      <div className="mb-6 border-b pb-6">
        <button
          onClick={() => setIsLocationsOpen(!isLocationsOpen)}
          className="flex items-center justify-between w-full text-gray-900 font-medium hover:text-green-600 transition-colors"
          aria-expanded={isLocationsOpen}
          aria-controls="location-filters"
        >
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isLocationsOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        {isLocationsOpen && (
          <div
            id="location-filters"
            className="mt-4 space-y-3"
            role="group"
            aria-label="Location filters"
          >
            {locations.map((location) => (
              <label
                key={location}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location)}
                  onChange={() => handleLocationToggle(location)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  aria-label={`Filter by location: ${location}`}
                />
                <span className="ml-3 text-gray-700 text-sm">{location}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Service Filter */}
      <div>
        <button
          onClick={() => setIsServicesOpen(!isServicesOpen)}
          className="flex items-center justify-between w-full text-gray-900 font-medium hover:text-green-600 transition-colors"
          aria-expanded={isServicesOpen}
          aria-controls="service-filters"
        >
          <span className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Services
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isServicesOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        {isServicesOpen && (
          <div
            id="service-filters"
            className="mt-4 space-y-3"
            role="group"
            aria-label="Service filters"
          >
            {services.map((service) => (
              <label
                key={service}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  aria-label={`Filter by service: ${service}`}
                />
                <span className="ml-3 text-gray-700 text-sm">{service}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

// Empty State Component
const EmptyState: React.FC = () => {
  return (
    <div
      className="text-center py-12 px-4"
      role="status"
      aria-live="polite"
      aria-label="No experts found"
    >
      <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Experts Found
      </h3>
      <p className="text-gray-600 max-w-sm mx-auto">
        Try adjusting your search or filter criteria to find the right expert for
        your needs.
      </p>
    </div>
  );
};

// Main Component
const Experts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Extract unique locations and services
  const uniqueLocations = useMemo(
    () => [...new Set(MOCK_EXPERTS.map((e) => e.location))].sort(),
    []
  );

  const uniqueServices = useMemo(() => {
    const services = new Set<string>();
    MOCK_EXPERTS.forEach((expert) => {
      expert.services.forEach((service) => services.add(service));
    });
    return Array.from(services).sort();
  }, []);

  // Filter experts based on search and filters
  const filteredExperts = useMemo(() => {
    return MOCK_EXPERTS.filter((expert) => {
      const matchesSearch =
        searchTerm === '' ||
        expert.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.services.some((service) =>
          service.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(expert.location);

      const matchesService =
        selectedServices.length === 0 ||
        selectedServices.some((service) =>
          expert.services.includes(service)
        );

      return matchesSearch && matchesLocation && matchesService;
    });
  }, [searchTerm, selectedLocations, selectedServices]);

  // Pagination
  const totalPages = Math.ceil(filteredExperts.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentExperts = filteredExperts.slice(startIdx, endIdx);
  const hasMore = currentPage < totalPages;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLocations, selectedServices]);

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedLocations([]);
    setSelectedServices([]);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <section className="mb-8" aria-labelledby="page-title">
          <h1 id="page-title" className="text-3xl font-bold text-gray-900 mb-2">
            Expert Directory
          </h1>
          <p className="text-gray-600 text-lg">
            Find the right agricultural expert for your needs
          </p>
        </section>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by business name or services..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              aria-label="Search experts by business name or services"
              aria-describedby="search-info"
            />
            <span id="search-info" className="sr-only">
              Type to search for experts by business name or service type
            </span>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedLocations.length > 0 || selectedServices.length > 0) && (
          <div
            className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            role="region"
            aria-live="polite"
            aria-label="Active filters"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Search: {searchTerm}
                  </span>
                )}
                {selectedLocations.map((loc) => (
                  <span
                    key={`loc-${loc}`}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    Location: {loc}
                  </span>
                ))}
                {selectedServices.map((svc) => (
                  <span
                    key={`svc-${svc}`}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    Service: {svc}
                  </span>
                ))}
              </div>
              <button
                onClick={handleClearFilters}
                className="text-blue-700 hover:text-blue-900 text-sm font-medium"
                aria-label="Clear all filters"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Results Info */}
        <div
          className="mb-6 text-sm text-gray-600"
          role="status"
          aria-live="polite"
        >
          Showing{' '}
          <span className="font-semibold">{startIdx + 1}-{Math.min(endIdx, filteredExperts.length)}</span> of{' '}
          <span className="font-semibold">{filteredExperts.length}</span> experts
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <FilterPanel
              locations={uniqueLocations}
              services={uniqueServices}
              selectedLocations={selectedLocations}
              selectedServices={selectedServices}
              onLocationChange={setSelectedLocations}
              onServiceChange={setSelectedServices}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {filteredExperts.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {/* Grid of Experts */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                  role="region"
                  aria-label="List of experts"
                >
                  {isLoading ? (
                    <ExpertSkeleton count={ITEMS_PER_PAGE} />
                  ) : (
                    currentExperts.map((expert, idx) => (
                      <ExpertCard
                        key={expert.id}
                        expert={expert}
                        index={idx}
                      />
                    ))
                  )}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium"
                      aria-label={`Load more experts. Currently showing ${currentExperts.length} of ${filteredExperts.length}`}
                    >
                      {isLoading ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}

                {/* Pagination Info */}
                <div
                  className="text-center mt-6 text-sm text-gray-600"
                  role="status"
                  aria-live="polite"
                >
                  Page {currentPage} of {totalPages}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Experts;
