import { useState } from "react";
import { Search, MapPin, Star, Filter, Briefcase } from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ModalSystem from "@/components/ModalSystem";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExpertProfiles } from "@/hooks/useExpertProfiles";

const Experts = () => {
  const { profiles, loading } = useExpertProfiles();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      profile.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.services.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      locationFilter === "all" ||
      profile.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const locations = [...new Set(profiles.map((p) => p.location))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <section className="py-12 bg-hero-pattern">
          <div className="container">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Expert Directory
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover skilled professionals, entrepreneurs, and businesses in
                our community. Connect with experts who can help you grow.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-card rounded-xl p-4 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by business name or services..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc.toLowerCase()}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-0">
                      <div className="h-48 bg-muted" />
                      <div className="p-5 space-y-3">
                        <div className="h-5 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-4 bg-muted rounded w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProfiles.length === 0 ? (
              <div className="text-center py-16">
                <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No experts found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || locationFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Be the first to register as an expert!"}
                </p>
                <Button asChild>
                  <a href="/become-expert">Register as Expert</a>
                </Button>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-6">
                  Showing {filteredProfiles.length} expert
                  {filteredProfiles.length !== 1 ? "s" : ""}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProfiles.map((expert) => (
                    <Card
                      key={expert.id}
                      className="group overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <CardContent className="p-0">
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                          {expert.business_image_url ? (
                            <img
                              src={expert.business_image_url}
                              alt={expert.business_name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Briefcase className="h-16 w-16 text-primary/40" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-secondary text-secondary-foreground">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Verified
                            </Badge>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-lg mb-1">
                            {expert.business_name}
                          </h3>
                          <p className="text-primary font-medium text-sm mb-2">
                            {expert.services}
                          </p>
                          {expert.pricing && (
                            <p className="text-muted-foreground text-sm mb-2">
                              💰 {expert.pricing}
                            </p>
                          )}
                          {expert.description && (
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {expert.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-muted-foreground text-sm">
                              <MapPin className="h-4 w-4 mr-1" />
                              {expert.location}
                            </div>
                            {expert.phone && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={`tel:${expert.phone}`}>Contact</a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ModalSystem />
    </div>
  );
};

export default Experts;
