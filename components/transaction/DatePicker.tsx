"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { dateFormatAPI, dateFormatDisplay } from "@/config/format";

export function DatePicker({
  changeDate,
}: {
  changeDate: (value: string) => void;
}) {
  const today = new Date();
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    changeDate(dayjs(date).format(dateFormatAPI));
    setOpen(false);
  }, [date]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-4/6 justify-start text-left font-normal ml-1",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarDays className='mr-2 h-4 w-4' />
          {date ? (
            dayjs(date).format(dateFormatDisplay)
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
export default DatePicker;
