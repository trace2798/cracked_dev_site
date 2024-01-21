import { JobType } from "@/types";

export const hoverJobTypeContent = {
  type: "string",
  defaultValue: "full_time",
  options: ["full_time", "part_time", "internship"],
  functionality: "Type of job you are looking for.",
  note: "",
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
    id: "0003",
    name: "freelance",
  },
];
