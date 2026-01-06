import { useEffect, useState } from "react";

export interface ExpertProfile {
  id: string;
  business_name: string;
  services: string;
  location: string;
  business_image_url?: string;
  pricing?: string;
  description?: string;
  phone?: string;
}

export function useExpertProfiles() {
  const [profiles, setProfiles] = useState<ExpertProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace this mock data with a real API / backend integration
    const mockProfiles: ExpertProfile[] = [
      {
        id: "1",
        business_name: "Chepterit Digital Studio",
        services: "Graphic design, branding, social media marketing",
        location: "Kapsabet, Nandi County",
        pricing: "Packages from KES 5,000",
        description:
          "Helping youth-led businesses build strong digital brands and visual identities.",
        phone: "+254712345678",
        business_image_url: "/experts/chepterit-digital.jpg",
      },
      {
        id: "2",
        business_name: "Nandi Agribiz Consultancy",
        services: "Agribusiness training, market linkage, cooperative support",
        location: "Nandi Hills",
        pricing: "Consultations from KES 3,000",
        description:
          "Supporting women and youth farmers to increase productivity and access markets.",
        phone: "+254720987654",
      },
    ];

    const timer = setTimeout(() => {
      setProfiles(mockProfiles);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return { profiles, loading };
}
