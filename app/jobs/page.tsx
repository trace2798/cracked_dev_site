"use client";
import { updateSelector } from "@/actions/selector";
import { Loader } from "@/components/loader";
import { hoverDegreeRequiredContent } from "@/components/selector/data/degree-required";
import {
  hoverJobTypeContent,
  job_type,
} from "@/components/selector/data/job-type";
import { hoverLimitContent } from "@/components/selector/data/limit";
import { Heading } from "@/components/selector/heading";
import { HoverContentComponent } from "@/components/selector/hover-content-component";
import { SelectJobType } from "@/components/selector/select-job-type";
import { LimitSliderComponent } from "@/components/selector/slider-limit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Job, SelectorFormValues } from "@/types";
import { CircleIcon } from "lucide-react";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [jobs, setJobs] = useState([]);
  const form = useForm<SelectorFormValues>({
    defaultValues: {
      id: "",
      limit: 10, // default: 10
      page: 1, // default: 1
      min_salary: 20000, // default: 0
      max_salary: 200000, // default: 0
      location_iso: "remote", // default: empty string
      job_types: "full_time,internship,part_time,freelance", // default: 'full_time'
      skill_levels: "junior", // default: 'junior'
      degree_required: false, // default: false
      technologies: ["react"],
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<SelectorFormValues> = async (values) => {
    try {
      console.log(values, "VALUES VALUES");
      const response = await updateSelector(
        values.limit,
        values.job_types,
        values.degree_required
      );
      console.log(response);
      setJobs(response);
      // form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };
  console.log(jobs, "MESSAGES MESSAGES");
  return (
    <>
      {/* <Selector /> */}
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
          >
            <Heading
              title="Available option"
              description="All set to default. Change to experiment."
            />
            <div className="grid w-full p-2 -mt-10 overflow-hidden xl:gap-2 2xl:grid-cols-2">
              <SelectJobType
                defaultValue={form.getValues("job_types")}
                job_type={job_type}
                setValue={form.setValue}
                hoverContentProps={hoverJobTypeContent}
              />
              <FormField
                control={form.control}
                name="degree_required"
                render={({ field }) => (
                  <FormItem className="flex justify-between p-3 m-3 border rounded-lg w-fill dark:border-slate-800">
                    <div className="flex items-center justify-center w-full">
                      <HoverCard openDelay={200}>
                        <HoverCardTrigger asChild>
                          <Label htmlFor="job_types">Degree Required</Label>
                        </HoverCardTrigger>
                        <HoverCardContent
                          align="start"
                          className="w-[260px] text-sm"
                          side="left"
                        >
                          <HoverContentComponent
                            {...hoverDegreeRequiredContent}
                          />
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <LimitSliderComponent
                setValue={form.setValue}
                hoverContentProps={hoverLimitContent}
              />
            </div>

            <Button
              className="col-span-12 p-5 w-fit lg:col-span-12"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Search
            </Button>
          </form>
        </Form>
      </div>
      <div>
        {isLoading && (
          <div className="flex items-center justify-center w-full p-3 ml-5 rounded-lg w-fill bg-muted">
            <Loader description="Searching for the best jobs for you." />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-3">
          {jobs.map((job: Job, index: number) => (
            <Card key={index} className="border-secondary mt-3">
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
              <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center w-1/2">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} className="flex items-center mr-2">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* <div className="flex items-center">
                    <StarIcon className="mr-1 h-3 w-3" />
                    20k
                  </div>
                  <div>Updated April 2023</div> */}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                {/* <Link href={job.url} target="_blank"> */}
                <Button>Apply Now</Button>
                {/* </Link> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
