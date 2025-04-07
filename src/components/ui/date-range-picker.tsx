
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, subDays, subMonths } from "date-fns";

export function DatePickerWithRange({
  date,
  setDate,
}: {
  date: { from: Date; to: Date | null };
  setDate: React.Dispatch<React.SetStateAction<{ from: Date; to: Date | null }>>;
}) {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className="w-full justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b">
            <div className="flex flex-wrap gap-1 justify-between">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setDate({ from: subDays(new Date(), 30), to: new Date() })}
              >
                Last 30 days
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setDate({ from: subDays(new Date(), 90), to: new Date() })}
              >
                Last 90 days
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setDate({ from: subDays(new Date(), 180), to: new Date() })}
              >
                Last 180 days
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setDate({ from: subMonths(new Date(), 12), to: new Date() })}
              >
                Last 12 months
              </Button>
            </div>
          </div>
          <Calendar
            mode="range"
            selected={{ from: date.from, to: date.to || date.from }}
            onSelect={(range) => setDate(range || { from: new Date(), to: null })}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
