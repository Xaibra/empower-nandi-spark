import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

/**
 * Types for Expert Profiles
 */
export interface ExpertProfile {
  id: string;
  name: string;
  email: string;
  specialty: string;
  bio: string;
  avatar?: string;
  yearsOfExperience: number;
  credentials: string[];
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExpertProfilesResponse {
  data: ExpertProfile[];
  total: number;
  page: number;
  limit: number;
}

export interface ExpertProfileParams {
  page?: number;
  limit?: number;
  specialty?: string;
  search?: string;
  verified?: boolean;
}

export interface CreateExpertProfilePayload {
  name: string;
  email: string;
  specialty: string;
  bio: string;
  avatar?: string;
  yearsOfExperience: number;
  credentials: string[];
}

export interface UpdateExpertProfilePayload extends Partial<CreateExpertProfilePayload> {
  id: string;
}

/**
 * API Functions
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

export const expertProfilesAPI = {
  /**
   * Fetch all expert profiles with optional filtering and pagination
   */
  fetchProfiles: async (params?: ExpertProfileParams): Promise<ExpertProfilesResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.specialty) queryParams.append('specialty', params.specialty);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.verified !== undefined) queryParams.append('verified', params.verified.toString());

    const response = await fetch(`${API_BASE_URL}/expert-profiles?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch expert profiles: ${response.statusText}`);
    }
    
    return response.json();
  },

  /**
   * Fetch a single expert profile by ID
   */
  fetchProfileById: async (id: string): Promise<ExpertProfile> => {
    const response = await fetch(`${API_BASE_URL}/expert-profiles/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch expert profile: ${response.statusText}`);
    }
    
    return response.json();
  },

  /**
   * Create a new expert profile
   */
  createProfile: async (payload: CreateExpertProfilePayload): Promise<ExpertProfile> => {
    const response = await fetch(`${API_BASE_URL}/expert-profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create expert profile: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Update an existing expert profile
   */
  updateProfile: async (payload: UpdateExpertProfilePayload): Promise<ExpertProfile> => {
    const { id, ...data } = payload;
    const response = await fetch(`${API_BASE_URL}/expert-profiles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update expert profile: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Delete an expert profile
   */
  deleteProfile: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/expert-profiles/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete expert profile: ${response.statusText}`);
    }
  },
};

/**
 * Custom Hook: Fetch expert profiles with pagination and filtering
 */
export const useExpertProfiles = (
  params?: ExpertProfileParams,
  options?: any
): UseQueryResult<ExpertProfilesResponse, Error> => {
  return useQuery({
    queryKey: ['expertProfiles', params],
    queryFn: () => expertProfilesAPI.fetchProfiles(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    ...options,
  });
};

/**
 * Custom Hook: Fetch a single expert profile by ID
 */
export const useExpertProfile = (
  id: string,
  options?: any
): UseQueryResult<ExpertProfile, Error> => {
  return useQuery({
    queryKey: ['expertProfile', id],
    queryFn: () => expertProfilesAPI.fetchProfileById(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

/**
 * Custom Hook: Create a new expert profile
 */
export const useCreateExpertProfile = (
  options?: any
): UseMutationResult<ExpertProfile, Error, CreateExpertProfilePayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateExpertProfilePayload) => expertProfilesAPI.createProfile(payload),
    onSuccess: (newProfile) => {
      // Invalidate and refetch the expert profiles list
      queryClient.invalidateQueries({ queryKey: ['expertProfiles'] });
      // Optionally set the new profile in cache
      queryClient.setQueryData(['expertProfile', newProfile.id], newProfile);
    },
    onError: (error) => {
      console.error('Failed to create expert profile:', error);
    },
    ...options,
  });
};

/**
 * Custom Hook: Update an expert profile
 */
export const useUpdateExpertProfile = (
  options?: any
): UseMutationResult<ExpertProfile, Error, UpdateExpertProfilePayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateExpertProfilePayload) => expertProfilesAPI.updateProfile(payload),
    onSuccess: (updatedProfile) => {
      // Invalidate the specific profile query
      queryClient.setQueryData(['expertProfile', updatedProfile.id], updatedProfile);
      // Invalidate the list to refetch
      queryClient.invalidateQueries({ queryKey: ['expertProfiles'] });
    },
    onError: (error) => {
      console.error('Failed to update expert profile:', error);
    },
    ...options,
  });
};

/**
 * Custom Hook: Delete an expert profile
 */
export const useDeleteExpertProfile = (
  options?: any
): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => expertProfilesAPI.deleteProfile(id),
    onSuccess: (_, deletedId) => {
      // Remove the profile from cache
      queryClient.removeQueries({ queryKey: ['expertProfile', deletedId] });
      // Invalidate the list to refetch
      queryClient.invalidateQueries({ queryKey: ['expertProfiles'] });
    },
    onError: (error) => {
      console.error('Failed to delete expert profile:', error);
    },
    ...options,
  });
};

/**
 * Custom Hook: Search expert profiles
 */
export const useSearchExpertProfiles = (
  searchTerm: string,
  options?: any
): UseQueryResult<ExpertProfilesResponse, Error> => {
  return useQuery({
    queryKey: ['expertProfiles', { search: searchTerm }],
    queryFn: () => expertProfilesAPI.fetchProfiles({ search: searchTerm }),
    enabled: searchTerm.length > 0, // Only run if search term is not empty
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};

/**
 * Custom Hook: Filter expert profiles by specialty
 */
export const useExpertProfilesBySpecialty = (
  specialty: string,
  options?: any
): UseQueryResult<ExpertProfilesResponse, Error> => {
  return useQuery({
    queryKey: ['expertProfiles', { specialty }],
    queryFn: () => expertProfilesAPI.fetchProfiles({ specialty }),
    enabled: !!specialty,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};
