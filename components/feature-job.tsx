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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Marquee } from "@devnomic/marquee";
import { Job } from "@/types";

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
  return (
    <>
      <div className="text-4xl my-5">Feature Job</div>
      <div className="max-h-96 overflow-hidden">
        <Marquee
          pauseOnHover={true}
          // fade={true}
          direction="up"
          className="gap-[3rem] [--duration:25s]"
          innerClassName="gap-[3rem] [--gap:3rem]"
        >
          {jobs.map((job: Job, index: number) => (
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
                      ${job.min_salary_usd} - ${job.max_salary_usd}
                    </h1>
                  </CardDescription>
                  {/* <CardContent className="prose text-muted-foreground line-clamp-2">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      className="prose prose-headings:text-base text-white"
                      children={job.description}
                    />
                  </CardContent> */}
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
