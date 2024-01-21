export type Job = {
  id: string;
  limit: number; // default: 10
  page: number; // default: 1
  min_salary_usd: number;
  max_salary_usd: number;
  location_iso: string[];
  job_type: ("full-time" | "part-time" | "contract")[];
  degree_required: boolean;
  technologies: string[];
  title: string;
  description: string;
  company: string;
  url: string;
  created_at: string;
  image_url: string;
};

type SelectorFormValues = {
  limit: number; // default: 10
  page: number; // default: 1

  location_iso: string;
  job_types: string;

  skill_levels: string[];
  degree_required: boolean;
  technologies: string[];
};

export interface JobType {
  id: string;
  name: string;
}

export interface DegreeRequiredType {
  id: string;
  name: string;
}
