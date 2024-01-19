import { Job } from "@/types";
import { Marquee } from "@devnomic/marquee";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface FeatureJobProps {}

const FeatureJob: FC<FeatureJobProps> = async ({}) => {
  const request = await fetch(
    "https://api.crackeddevs.com/api/get-jobs?limit=20",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.CRACKED_DEV_API_KEY || "",
      },
    }
  );
  const jobs = await request.json();
  console.log(jobs);
  const jobsWithImages = jobs.filter((job: Job) => job.image_url);

  return (
    <>
      <div className="text-4xl my-5 mb-10 font-thin">Feature Job</div>
      <div className="max-h-96 overflow-hidden">
        <Marquee
          pauseOnHover={true}
          // fade={true}
          direction="up"
          className="gap-[3rem] [--duration:25s]"
          innerClassName="gap-[3rem] [--gap:3rem]"
        >
          {jobsWithImages.map((job: Job, index: number) => (
            <Card
              key={index}
              className="w-fill border-secondary mt-3 first:mt-0"
            >
              <CardHeader className="flex items-center">
                <img
                  alt="Company Logo"
                  className="aspect-[1/1] overflow-hidden rounded-full object-contain object-center"
                  height="50"
                  src={job.image_url}
                  width="50"
                />
                <div className="space-y-1">
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription className="uppercase">
                    <h1>
                      {" "}
                      {job.location_iso || "Remote"} | {job.job_type}
                    </h1>
                    <h1>
                      {job.min_salary_usd && job.max_salary_usd
                        ? `$${job.min_salary_usd} - $${job.max_salary_usd}`
                        : job.min_salary_usd
                        ? `From $${job.min_salary_usd}`
                        : job.max_salary_usd
                        ? `Up to $${job.max_salary_usd}`
                        : "Salary not provided"}
                    </h1>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-end">
                <Link href={job.url} target="_blank">
                  <Button>Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </Marquee>
      </div>
    </>
  );
};

export default FeatureJob;
