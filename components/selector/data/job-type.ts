import { JobType } from "@/types";

export const hoverJobTypeContent = {
  type: "string",
  defaultValue: "full_time,internship,part_time,freelance,co_founder",
  options: ["full_time", "part_time", "internship", "co_founder", "freelance"],
  functionality: "Type of job you are looking for.",
  note: "All are chosen by default",
};

export const job_type: JobType[] = [
  {
    id: "0001",
    name: "full_time",
  },
  {
    id: "0002",
    name: "part_time",
  },
  {
    id: "0003",
    name: "internship",
  },
  {
    id: "0004",
    name: "freelance",
  },
  {
    id: "0005",
    name: "co_founder",
  },
];
