import React, { createContext, useContext, useEffect, useState } from "react";

export interface ExpertProfile {
  id: string;
  business_name: string;
  services: string;
  location: string;
  business_image_url?: string;
  pricing?: string;
  description?: string;
  phone?: string;
  /** Whether this listing is approved/paid and visible on the public experts page */
  verified?: boolean;
}

export interface NewExpertPayload {
  business_name: string;
  services: string;
  location: string;
  business_image_url?: string;
  pricing?: string;
  description?: string;
  phone?: string;
  verified?: boolean;
}

interface ExpertsContextType {
  profiles: ExpertProfile[];
  loading: boolean;
  addExpert: (payload: NewExpertPayload) => void;
  removeExpert: (id: string) => void;
  toggleVerified: (id: string) => void;
}

const ExpertsContext = createContext<ExpertsContextType | undefined>(undefined);

const STORAGE_KEY = "tujitume_experts_directory";

export const ExpertsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<ExpertProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ExpertProfile[];
        setProfiles(parsed);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error loading experts from storage", error);
    }

    // Seed with demo data if nothing in storage
    const initial: ExpertProfile[] = [
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
        verified: true,
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
        verified: true,
      },
    ];

    setProfiles(initial);
    setLoading(false);
  }, []);

  // Persist to localStorage whenever profiles change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
      } catch (error) {
        console.error("Error saving experts to storage", error);
      }
    }
  }, [profiles, loading]);

  const addExpert = (payload: NewExpertPayload) => {
    setProfiles((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...payload,
      },
    ]);
  };

  const removeExpert = (id: string) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };

  const toggleVerified = (id: string) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === id
          ? {
              ...profile,
              verified: !profile.verified,
            }
          : profile
      )
    );
  };

  const value: ExpertsContextType = {
    profiles,
    loading,
    addExpert,
    removeExpert,
    toggleVerified,
  };

  return <ExpertsContext.Provider value={value}>{children}</ExpertsContext.Provider>;
};

export const useExpertsContext = () => {
  const ctx = useContext(ExpertsContext);
  if (!ctx) {
    throw new Error("useExpertsContext must be used within an ExpertsProvider");
  }
  return ctx;
};
