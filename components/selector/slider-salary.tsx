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
  setValue, hoverContentProps
}: TemperatureSliderProps) {
  const handleTemperatureChange = (value: number[]) => {
    setSelectedTemperature(value[0]);
    setValue("max_salary", value[0]); // Update the temperature property in the form data
  };

  const [selectedTemperature, setSelectedTemperature] = useState(100000);

  return (
    <>
      <div className="flex flex-col my-5">
        <div className="flex justify-between mb-3">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="temperature">Temperature</Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="left"
            >
              <HoverContentComponent {...hoverContentProps} />
            </HoverCardContent>
          </HoverCard>
          <p className="text-neutral-400">{selectedTemperature}</p>
        </div>
        <div>
          <Slider
            id="temperature"
            max={200000}
            defaultValue={[selectedTemperature]}
            step={100}
            onValueChange={handleTemperatureChange}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            aria-label="Temperature"
          />
        </div>
      </div>
    </>
  );
}