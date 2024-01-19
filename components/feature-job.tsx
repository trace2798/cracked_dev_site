import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface FeatureJobProps {}

const FeatureJob: FC<FeatureJobProps> = async ({}) => {
  const request = await fetch(
    "https://api.crackeddevs.com/api/get-jobs?limit=5",
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
      <div className="text-4xl">Feature Job</div>
      {jobs.map((job, index) => (
        <Card key={index} className="w-fill border-secondary">
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
                {job.location || "Remote"} | {job.job_type}
              </CardDescription>
              <CardContent className="prose text-muted-foreground line-clamp-2">{job.description}</CardContent>
            </div>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Link href={job.url} target="_blank">
              <Button>Apply Now</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default FeatureJob;
