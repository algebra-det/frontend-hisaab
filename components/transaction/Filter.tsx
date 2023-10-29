import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Filter({
  yearOption = false,
  changeDuration,
}: {
  yearOption?: boolean;
  changeDuration: (value: string) => void;
}) {
  return (
    <Select defaultValue='day' onValueChange={changeDuration}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a duration' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Duration</SelectLabel>
          <SelectItem value='day'>Day</SelectItem>
          <SelectItem value='week'>Week</SelectItem>
          <SelectItem value='month'>Month</SelectItem>
          {yearOption && <SelectItem value='month'>Month</SelectItem>}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Filter;
