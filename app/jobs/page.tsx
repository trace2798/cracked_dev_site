"use client";
import { updateSelector } from "@/actions/selector";
import { Loader } from "@/components/loader";
import { hoverDegreeRequiredContent } from "@/components/selector/data/degree-required";
import {
  hoverJobTypeContent,
  job_type,
} from "@/components/selector/data/job-type";
import { hoverLimitContent } from "@/components/selector/data/limit";
import {
  hoverSkillLevelContent,
  skill_level_options,
} from "@/components/selector/data/skill-level";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Job, SelectorFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { z } from "zod";

interface pageProps {}

const SelectorFormValues = z.object({
  id: z.string(),
  limit: z.number(),
  page: z.number(),
  min_salary: z.number(),
  max_salary: z.number(),
  location_iso: z.string(),
  job_types: z.string(),
  skill_levels: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  degree_required: z.boolean(),
  technologies: z.array(z.string()),
});

const JobsPage: FC<pageProps> = ({}) => {
  const [jobs, setJobs] = useState([]);
  const form = useForm<z.infer<typeof SelectorFormValues>>({
    resolver: zodResolver(SelectorFormValues),
    defaultValues: {
      id: "",
      limit: 10, // default: 10
      page: 1, // default: 1
      location_iso: "remote", // default: empty string
      job_types: "full_time,internship,part_time,freelance,co_founder",
      skill_levels: ["junior", "mid", "senior"],
      degree_required: false, // default: false
      technologies: ["react"],
    },
  });
  const isLoading = form.formState.isSubmitting;
  const fetchJobs = async (values: SelectorFormValues) => {
    console.log(values.skill_levels);
    try {
      const response = await updateSelector(
        values.limit,
        values.job_types,
        values.degree_required,
        values.skill_levels
      );
      setJobs(response);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchJobs(form.getValues());
  }, []);

  const onSubmit: SubmitHandler<SelectorFormValues> = async (values) => {
    fetchJobs(values);
  };
  // const onSubmit: SubmitHandler<SelectorFormValues> = async (values) => {
  //   try {
  //     console.log(values, "VALUES VALUES");
  //     const response = await updateSelector(
  //       values.limit,
  //       values.job_types,
  //       values.degree_required
  //     );
  //     console.log(response);
  //     setJobs(response);
  //     // form.reset();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong.");
  //   }
  // };
  console.log(jobs, "MESSAGES MESSAGES");
  return (
    <>
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
                  <FormItem className="flex justify-between p-3 m-3 border rounded-lg w-[250px] md:w-full dark:border-slate-800">
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
              <FormField
                control={form.control}
                name="skill_levels"
                render={() => (
                  <FormItem className="p-3 m-3 border rounded-lg w-[250px] md:w-full dark:border-slate-800">
                    <div className="mb-4">
                      <HoverCard openDelay={200}>
                        <HoverCardTrigger asChild>
                          <Label htmlFor="job_types">Skill Level</Label>
                        </HoverCardTrigger>
                        <HoverCardContent
                          align="start"
                          className="w-[260px] text-sm"
                          side="left"
                        >
                          <HoverContentComponent {...hoverSkillLevelContent} />
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      {skill_level_options.map((skillLevel) => (
                        <FormField
                          key={skillLevel.id}
                          control={form.control}
                          name="skill_levels"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={skillLevel.id}
                                className="flex my-2 md:my-0 flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      skillLevel.id
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            skillLevel.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== skillLevel.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal capitalize">
                                  {skillLevel.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage className="text-primary" />
                  </FormItem>
                )}
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
              <CardHeader className="flex">
                <img
                  alt="Company Logo"
                  className="aspect-[1/1] overflow-hidden rounded-full object-contain object-center"
                  height="50"
                  src={job.image_url}
                  width="50"
                />
                <h1>{job.company}</h1>
                <div className="space-y-1">
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription className="capitalize">
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
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <div className="grid grid-cols-3 items-center">
                        {job.technologies &&
                          job.technologies.map((tech) => (
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
              <CardContent>
                <div className="dark:prose-invert line-clamp-2">
                  <Markdown
                    remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                  >
                    {job.description}
                  </Markdown>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/jobs/${job.id}`}>
                  <Button variant="outline" className="hover:text-green-600">
                    Read More
                  </Button>
                </Link>
                <a href={job.url} target="_blank">
                  <Button variant="ghost" className="hover:text-blue-600">
                    Apply Now
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobsPage;
