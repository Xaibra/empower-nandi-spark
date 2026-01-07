import { useExpertsContext } from "@/contexts/ExpertsContext";

// Backwards-compatible hook that reads from the shared ExpertsContext
export function useExpertProfiles() {
  return useExpertsContext();
}
