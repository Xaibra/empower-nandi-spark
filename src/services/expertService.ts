/**
 * Expert Service
 * Handles all API calls related to expert profiles
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export type ExpertProfile = {
  id: string | number;
  business_name: string;
  services: string;
  location: string;
  phone?: string;
  description?: string;
  pricing?: string;
  business_image_url?: string;
  verified?: boolean;
};

export type ExpertFilters = {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
};

class ExpertService {
  /**
   * Fetch all expert profiles with optional filters
   */
  async getExpertProfiles(filters?: ExpertFilters): Promise<ExpertProfile[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.page) queryParams.append("page", filters.page.toString());
      if (filters?.limit) queryParams.append("limit", filters.limit.toString());
      if (filters?.search) queryParams.append("search", filters.search);
      if (filters?.location) queryParams.append("location", filters.location);

      const query = queryParams.toString();
      const url = query ? `${API_BASE_URL}/experts?${query}` : `${API_BASE_URL}/experts`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch experts: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error("Expert service error:", error);
      throw error;
    }
  }

  /**
   * Fetch a single expert profile by ID
   */
  async getExpertById(id: string | number): Promise<ExpertProfile> {
    try {
      const response = await fetch(`${API_BASE_URL}/experts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch expert: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error("Expert service error:", error);
      throw error;
    }
  }

  /**
   * Search experts by query
   */
  async searchExperts(query: string): Promise<ExpertProfile[]> {
    return this.getExpertProfiles({ search: query });
  }

  /**
   * Filter experts by location
   */
  async filterByLocation(location: string): Promise<ExpertProfile[]> {
    return this.getExpertProfiles({ location });
  }

  /**
   * Get unique locations from all experts
   */
  async getLocations(): Promise<string[]> {
    try {
      const profiles = await this.getExpertProfiles();
      const locations = Array.from(
        new Set(profiles.map((p) => p.location).filter(Boolean))
      ) as string[];
      return locations.sort();
    } catch (error) {
      console.error("Error fetching locations:", error);
      return [];
    }
  }

  /**
   * Create a new expert profile (admin)
   */
  async createExpert(data: Omit<ExpertProfile, "id">): Promise<ExpertProfile> {
    try {
      const response = await fetch(`${API_BASE_URL}/experts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to create expert: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error("Expert service error:", error);
      throw error;
    }
  }

  /**
   * Update an expert profile (admin)
   */
  async updateExpert(
    id: string | number,
    data: Partial<ExpertProfile>
  ): Promise<ExpertProfile> {
    try {
      const response = await fetch(`${API_BASE_URL}/experts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update expert: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error("Expert service error:", error);
      throw error;
    }
  }

  /**
   * Delete an expert profile (admin)
   */
  async deleteExpert(id: string | number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/experts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete expert: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Expert service error:", error);
      throw error;
    }
  }
}

export const expertService = new ExpertService();