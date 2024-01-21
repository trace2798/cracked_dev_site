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

interface LimitSliderProps {
  setValue: UseFormSetValue<SelectorFormValues>;
  hoverContentProps: {
    type: string;
    defaultValue: string;
    options: string[];
    functionality: string;
    note: string;
  };
}

export function LimitSliderComponent({
  setValue,
  hoverContentProps,
}: LimitSliderProps) {
  const handleLimitChange = async (value: number[]) => {
    console.log(value);
    setSelectedLimit(value[0]);
    setValue("limit", value[0]); // Update the temperature property in the form data
  };

  const [selectedLimit, setSelectedLimit] = useState(10);

  return (
    <>
      <div className="flex flex-col my-5">
        <div className="flex justify-between mb-3">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="max_salary">Limit</Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="left"
            >
              <HoverContentComponent {...hoverContentProps} />
            </HoverCardContent>
          </HoverCard>
          <p className="text-neutral-400">{selectedLimit}</p>
        </div>
        <div>
          <Slider
            id="max_salary_usd"
            max={30}
            defaultValue={[selectedLimit]}
            step={1}
            onValueChange={handleLimitChange}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            aria-label="Temperature"
          />
        </div>
      </div>
    </>
  );
}
