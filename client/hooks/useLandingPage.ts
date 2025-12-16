import { useQuery } from "@tanstack/react-query";
import { getLandingPageData } from "@/data/loaders";

export function useLandingPage() {
  return useQuery({
    queryKey: ["landing-page"],
    queryFn: getLandingPageData,
  });
}