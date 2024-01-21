import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface JobIdPageProps {
  params: {
    jobId: string;
  };
}

const JobIdPage = async ({ params }: JobIdPageProps) => {
  const request = await fetch(
    `https://api.crackeddevs.com/api/get-jobs?id=${params.jobId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.CRACKED_DEV_API_KEY || "",
      },
    }
  );
  const job = await request.json();
  console.log(job);
  return (
    <>
      <Button size="sm" variant="outline" asChild className="mb-5">
        <Link href="/jobs">
          <ArrowBigLeft />
          Back
        </Link>
      </Button>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="prose dark:prose-invert">
          <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
            {job[0].description}
          </Markdown>
        </div>
        <div>
          <Card className="w-fill border-secondary mt-3 first:mt-0 mr-5">
            <CardHeader className="flex items-center">
              <img
                alt="Company Logo"
                className="aspect-[1/1] overflow-hidden rounded-full object-contain object-center"
                height="50"
                src={job[0].image_url}
                width="50"
              />

              <div className="space-y-1">
                <h1>
                  <span className="text-muted-foreground">Company: </span>
                  {job[0].company}
                </h1>
                <h1>
                  <span className="text-muted-foreground">Title: </span>
                  {job[0].title}
                </h1>
                <h1>
                  Location:{" "}
                  <span className="text-muted-foreground">
                    {" "}
                    {job[0].location_iso || "Remote"}
                  </span>
                </h1>
                <h1>
                  Type:{" "}
                  <span className="text-muted-foreground capitalize">
                    {" "}
                    {job[0].job_type}
                  </span>
                </h1>
                <h1>
                  Salary:{" "}
                  <span className="text-muted-foreground">
                    {" "}
                    {job[0].min_salary_usd && job[0].max_salary_usd
                      ? `$${job[0].min_salary_usd} - $${job.max_salary_usd}`
                      : job[0].min_salary_usd
                      ? `From $${job[0].min_salary_usd}`
                      : job[0].max_salary_usd
                      ? `Up to $${job[0].max_salary_usd}`
                      : "Salary not provided"}
                  </span>
                </h1>
                {/* <CardTitle>{job[0].title}</CardTitle> */}
                <CardDescription className="capitalize">
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="grid grid-cols-3 items-center">
                      {job[0].technologies &&
                        job[0].technologies.map((tech: string) => (
                          <Badge
                            key={tech}
                            className="flex items-center first:m-0 m-2"
                          >
                            {tech}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-end">
              <a href={job[0].url} target="_blank">
                <Button>Apply Now</Button>
              </a>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default JobIdPage;
