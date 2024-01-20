export type Job = {
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
    limit?: number; // default: 10
    page?: number; // default: 1
    min_salary?: number;
    max_salary?: number;
    location_iso?: string; // COMING SOON
    job_type?:
      | "full_time"
      | "part_time"
      | "freelance"
      | "internship"
      | "co_founder";
    skill_levels?: "junior" | "mid" | "senior";
    degree_required?: boolean;
    technologies?: string[];
  };