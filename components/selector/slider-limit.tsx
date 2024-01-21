import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { SelectorFormValues } from "@/types";
import { HoverContentComponent } from "./hover-content-component";

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
    //console.log(value);
    setSelectedLimit(value[0]);
    setValue("limit", value[0]); // Update the temperature property in the form data
  };

  const [selectedLimit, setSelectedLimit] = useState(10);

  return (
    <>
      <div className="p-3 m-3 border rounded-lg w-[250px] md:w-full dark:border-slate-800">
        <div className="flex justify-between mb-3">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="limit">Limit</Label>
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
            id="limit"
            max={30}
            min={1}
            defaultValue={[selectedLimit]}
            step={1}
            onValueChange={handleLimitChange}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            aria-label="limit"
          />
        </div>
      </div>
    </>
  );
}
