import { FC } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Job } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const request = await fetch(
    "https://api.crackeddevs.com/api/get-jobs?limit=10",
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
  return (
    <>
      <div>Selector</div>
      <div>
        {jobs.map((job: Job, index: number) => (
          <Card key={index} className="w-fill border-secondary mt-3 first:mt-0">
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
      </div>
    </>
  );
};

export default page;
