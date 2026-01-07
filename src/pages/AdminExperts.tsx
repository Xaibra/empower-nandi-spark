import { useMemo, useState } from "react";
import { Search, MapPin, Briefcase, Star, Filter, Phone, AlertCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useExpertProfiles } from "@/hooks/useExpertProfiles";

const AdminExperts = () => {
  const { profiles, loading, addExpert, removeExpert, toggleVerified } = useExpertProfiles();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [newExpert, setNewExpert] = useState({
    business_name: "",
    services: "",
    location: "",
    pricing: "",
    description: "",
    phone: "",
  });

  const locations = useMemo(
    () => [...new Set(profiles.map((p) => p.location))],
    [profiles]
  );

  const filteredProfiles = useMemo(
    () =>
      profiles.filter((profile) => {
        const matchesSearch =
          profile.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.services.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLocation =
          locationFilter === "all" ||
          profile.location.toLowerCase().includes(locationFilter.toLowerCase());

        return matchesSearch && matchesLocation;
      }),
    [profiles, searchQuery, locationFilter]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Experts & Business Directory</h1>
          <p className="text-gray-600">
            Manage the paid showcase space for youth and marginalized community businesses and experts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Listings visible on the public Experts page
          </Badge>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total listings</p>
              <p className="text-2xl font-bold">{profiles.length}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Unique locations</p>
              <p className="text-2xl font-bold">{locations.length}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Directory status</p>
              <p className="text-sm font-medium">Curated, paid listings only</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
              <Star className="h-5 w-5 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add / onboard new expert */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add new expert or business</CardTitle>
          <CardDescription>
            Use this form to add paying youth or marginalized businesses/experts to the directory.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business_name">Business / Expert name</Label>
              <Input
                id="business_name"
                value={newExpert.business_name}
                onChange={(e) => setNewExpert({ ...newExpert, business_name: e.target.value })}
                placeholder="e.g. Chepterit Digital Studio"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newExpert.location}
                onChange={(e) => setNewExpert({ ...newExpert, location: e.target.value })}
                placeholder="e.g. Kapsabet, Nandi County"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="services">Products / services</Label>
            <Input
              id="services"
              value={newExpert.services}
              onChange={(e) => setNewExpert({ ...newExpert, services: e.target.value })}
              placeholder="Short description, e.g. Graphic design, branding..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pricing">Pricing (optional)</Label>
              <Input
                id="pricing"
                value={newExpert.pricing}
                onChange={(e) => setNewExpert({ ...newExpert, pricing: e.target.value })}
                placeholder="e.g. Packages from KES 5,000"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone (for enquiries)</Label>
              <Input
                id="phone"
                value={newExpert.phone}
                onChange={(e) => setNewExpert({ ...newExpert, phone: e.target.value })}
                placeholder="e.g. +2547..."
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Short description (optional)</Label>
            <Textarea
              id="description"
              value={newExpert.description}
              onChange={(e) => setNewExpert({ ...newExpert, description: e.target.value })}
              placeholder="Who is this for, and what impact are they creating?"
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (!newExpert.business_name || !newExpert.services || !newExpert.location) return;
                addExpert({ ...newExpert, verified: true });
                setNewExpert({ business_name: "", services: "", location: "", pricing: "", description: "", phone: "" });
              }}
              disabled={!newExpert.business_name || !newExpert.services || !newExpert.location}
            >
              Add & approve listing
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by business name or services..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full sm:w-56">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc.toLowerCase()}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Directory Table / Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4 space-y-3">
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProfiles.length === 0 ? (
        <Card>
          <CardContent className="p-8 flex flex-col items-center text-center gap-3">
            <AlertCircle className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No experts found</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              When you onboard paying youth and marginalized businesses or experts,
              their profiles will appear here and on the public Experts page.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProfiles.map((expert) => (
            <Card key={expert.id} className="group hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">{expert.business_name}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {expert.services}
                    </CardDescription>
                  </div>
                  <Badge className="flex items-center gap-1 text-[10px]">
                    <Star className="h-3 w-3" />
                    Paid listing
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{expert.location}</span>
                </div>
                {expert.pricing && (
                  <div className="text-muted-foreground">
                    <span className="font-medium">Pricing:</span> {expert.pricing}
                  </div>
                )}
                {expert.description && (
                  <p className="text-muted-foreground text-xs line-clamp-3">
                    {expert.description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  {expert.phone ? (
                    <Button variant="outline" size="sm" className="text-xs" asChild>
                      <a href={`tel:${expert.phone}`}>
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </a>
                    </Button>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">
                      No phone contact provided
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[11px]"
                      onClick={() => toggleVerified(expert.id)}
                    >
                      {expert.verified ? "Unapprove" : "Approve"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[11px] text-red-600 hover:text-red-700"
                      onClick={() => removeExpert(expert.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminExperts;
