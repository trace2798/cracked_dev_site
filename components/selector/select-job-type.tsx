"use client";
import * as React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { UseFormSetValue } from "react-hook-form";

import { HoverContentComponent } from "./hover-content-component";
import { JobType, SelectorFormValues } from "@/types";

interface SelectJobTypeProps {
  setValue: UseFormSetValue<SelectorFormValues>;
  job_type: JobType[];
  hoverContentProps: {
    type: string;
    defaultValue: string;
    options: string[];
    functionality: string;
    note: string;
  };
}

export function SelectJobType({
  job_type,
  setValue,
  hoverContentProps,
}: SelectJobTypeProps) {
  const handleFormatChange = (value: string) => {
    setSelectedJobType(value);
    setValue("job_types", value); // Update the format property in the form data
  };

  const [selectedJobType, setSelectedJobType] = useState("full_time");

  return (
    <>
      <div className="flex justify-between p-3 m-3 border rounded-lg w-fill dark:border-slate-800">
        <div className="flex items-center justify-center w-full">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="job_types">Job Type</Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="left"
            >
              <HoverContentComponent {...hoverContentProps} />
            </HoverCardContent>
          </HoverCard>
        </div>
        <div>
          <Select value={selectedJobType} onValueChange={handleFormatChange}>
            <SelectTrigger className="w-fit md:w-[180px]">
              <SelectValue>{selectedJobType}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a Job Type</SelectLabel>
                {job_type.map((job) => (
                  <SelectItem key={job.id} value={job.name}>
                    {job.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
