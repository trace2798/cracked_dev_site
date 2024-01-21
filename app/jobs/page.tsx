"use client";
import { updateSelector } from "@/actions/selector";
import {
  hoverJobTypeContent,
  job_type,
} from "@/components/selector/data/job-type";
import { hoverLimitContent } from "@/components/selector/data/limit";
import { Heading } from "@/components/selector/heading";
import { SelectJobType } from "@/components/selector/select-job-type";
import { LimitSliderComponent } from "@/components/selector/slider-limit";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Job, SelectorFormValues } from "@/types";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [messages, setMessages] = useState([]);
  const form = useForm<SelectorFormValues>({
    defaultValues: {
      id: "",
      limit: 10, // default: 10
      page: 1, // default: 1
      min_salary: 20000, // default: 0
      max_salary: 200000, // default: 0
      location_iso: "remote", // default: empty string
      job_types: "full_time", // default: 'full_time'
      skill_levels: "junior", // default: 'junior'
      degree_required: false, // default: false
      technologies: ["react"],
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<SelectorFormValues> = async (values) => {
    try {
      console.log(values, "VALUES VALUES");
      const response = await updateSelector(values.limit, values.job_types);
      console.log(response);
      setMessages(response);
      // form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };
  console.log(messages, "MESSAGES MESSAGES");
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
                job_type={job_type}
                setValue={form.setValue}
                hoverContentProps={hoverJobTypeContent}
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
            Loading{" "}
            {/* <Loader description="Cohere is generating your text." /> */}
          </div>
        )}
        {messages.map((job: Job, index: number) => (
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
              {/* <Link href={job.url} target="_blank"> */}
              <Button>Apply Now</Button>
              {/* </Link> */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default page;
