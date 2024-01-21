import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

import { Label } from "@/components/ui/label";
import { HoverContentComponent } from "./hover-content-component";
import { SelectorFormValues } from "@/types";
import { updateSelector } from "@/actions/selector";

interface TemperatureSliderProps {
  setValue: UseFormSetValue<SelectorFormValues>;
  hoverContentProps: {
    type: string;
    defaultValue: string;
    options: string[];
    functionality: string;
    note: string;
  };
}

export function TemperatureSliderComponent({
  setValue,
  hoverContentProps,
}: TemperatureSliderProps) {
  const handleMaxSalaryChange = async (value: number[]) => {
    //console.log(value);
    setSelectedSalary(value[0]);
    setValue("max_salary", value[0]); // Update the temperature property in the form data
  };

  const [selectedSalary, setSelectedSalary] = useState(10);

  return (
    <>
      <div className="flex flex-col my-5">
        <div className="flex justify-between mb-3">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="max_salary">Max Salary</Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="left"
            >
              <HoverContentComponent {...hoverContentProps} />
            </HoverCardContent>
          </HoverCard>
          <p className="text-neutral-400">{selectedSalary}</p>
        </div>
        <div>
          <Slider
            id="max_salary_usd"
            max={10}
            defaultValue={[selectedSalary]}
            step={1}
            onValueChange={handleMaxSalaryChange}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            aria-label="Temperature"
          />
        </div>
      </div>
    </>
  );
}
