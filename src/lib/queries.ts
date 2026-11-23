import { queryOptions } from "@tanstack/react-query";
import {
  getClientLogos,
  getFaqs,
  getJobs,
  getPost,
  getPosts,
  getPricing,
  getProject,
  getProjects,
  getServices,
  getSettings,
  getTeam,
  getTestimonials,
} from "./content.functions";

const stale = 60_000;

export const servicesQuery = queryOptions({ queryKey: ["services"], queryFn: () => getServices(), staleTime: stale });
export const projectsQuery = queryOptions({ queryKey: ["projects"], queryFn: () => getProjects(), staleTime: stale });
export const projectQuery = (slug: string) =>
  queryOptions({ queryKey: ["project", slug], queryFn: () => getProject(slug), staleTime: stale });
export const postsQuery = queryOptions({ queryKey: ["posts"], queryFn: () => getPosts(), staleTime: stale });
export const postQuery = (slug: string) =>
  queryOptions({ queryKey: ["post", slug], queryFn: () => getPost(slug), staleTime: stale });
export const pricingQuery = queryOptions({ queryKey: ["pricing"], queryFn: () => getPricing(), staleTime: stale });
export const faqsQuery = queryOptions({ queryKey: ["faqs"], queryFn: () => getFaqs(), staleTime: stale });
export const testimonialsQuery = queryOptions({
  queryKey: ["testimonials"],
  queryFn: () => getTestimonials(),
  staleTime: stale,
});
export const jobsQuery = queryOptions({ queryKey: ["jobs"], queryFn: () => getJobs(), staleTime: stale });
export const teamQuery = queryOptions({ queryKey: ["team"], queryFn: () => getTeam(), staleTime: stale });
export const clientLogosQuery = queryOptions({
  queryKey: ["client-logos"],
  queryFn: () => getClientLogos(),
  staleTime: stale,
});
export const settingsQuery = queryOptions({ queryKey: ["settings"], queryFn: () => getSettings(), staleTime: stale });
