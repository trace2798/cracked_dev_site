"use client";
import { Card, CardContent, CardTitle } from "../ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Label } from "../ui/label";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { HoverContentComponent } from "./hover-content-component";
import { Heading } from "./heading";
import { Input } from "../ui/input";
import { TemperatureSliderComponent } from "./slider-salary";
import { hoverTemperatureContent } from "./data/temperature";
import { updateSelector } from "@/actions/selector";
import { SelectorFormValues } from "@/types";
import { LimitSliderComponent } from "./slider-limit";

// type SelectorFormValues = {
//   limit: number; // default: 10
//   page: number; // default: 1
//   min_salary_usd: number;
//   max_salary_usd: number;
//   location_iso: string; // COMING SOON
//   job_type:
//     | "full_time"
//     | "part_time"
//     | "freelance"
//     | "internship"
//     | "co_founder";
//   skill_levels: "junior" | "mid" | "senior";
//   degree_required: boolean;
//   technologies: string[];
// };

const Selector = ({}) => {
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
      console.log("1");
      //   const request = await fetch(
      //     `https://api.crackeddevs.com/api/get-jobs?limit=10&min_salary=${values.min_salary}&max_salary=${values.max_salary}&location_iso=${values.location_iso}&job_types=${values.job_type}&skill_levels=${values.skill_levels}&degree_required=${values.degree_required}&technologies=${values.technologies}`,
      //     {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //         "api-key": process.env.CRACKED_DEV_API_KEY || "",
      //       },
      //     }
      //   );
      //   console.log('2')
      //   const jobs = await request.json();
      console.log(values.max_salary);
      const jobs = await updateSelector( values.limit);
      console.log(jobs);
      // form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <Card className="p-5 border-muted mb-5">
        {/* <CardTitle>Selector</CardTitle> */}
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
            >
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <Label htmlFor="temperature" className="pl-3 text-left w-fit">
                    Prompt (required)
                  </Label>
                </HoverCardTrigger>
                <HoverCardContent
                  align="start"
                  className="w-[260px] text-sm"
                  side="left"
                >
                  <HoverContentComponent
                    type="string"
                    defaultValue="REQUIRED"
                    options={["N/A"]}
                    functionality="Represents the prompt or text to be completed."
                    note="Trailing whitespaces will be trimmed. If your use case requires trailing whitespaces contact Ivan."
                  />
                </HoverCardContent>
              </HoverCard>
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="pl-3 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent "
                        disabled={isLoading}
                        placeholder="Enter a prompt to generate answer"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Heading
                title="Available option"
                description="All set to default. Change to experiment."
              />
              <div className="grid w-full p-2 -mt-10 overflow-hidden xl:gap-2 2xl:grid-cols-2">
                <LimitSliderComponent
                  setValue={form.setValue}
                  hoverContentProps={hoverTemperatureContent}
                />
                {/* <TemperatureSliderComponent
                  setValue={form.setValue}
                  hoverContentProps={hoverTemperatureContent}
                /> */}
              </div>

              <Button
                className="col-span-12 p-5 w-fit lg:col-span-12"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default Selector;
