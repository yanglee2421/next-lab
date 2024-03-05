// MUI Imports
import type { SelectProps} from "@mui/material";
import { Select, MenuItem, InputAdornment } from "@mui/material";
import { CalendarMonthOutlined } from "@mui/icons-material";

export function DateSelectForTable(props: DateSelectForTableProps) {
  // ** Props
  const { ...restProps } = props;

  return (
    <Select
      size="small"
      startAdornment={
        <InputAdornment position="start">
          <CalendarMonthOutlined></CalendarMonthOutlined>
        </InputAdornment>
      }
      {...restProps}
    >
      {Array.from(optionsMap.entries(), ([key, value]) => {
        return (
          <MenuItem key={key} value={JSON.stringify(value)}>
            {key}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export type DateSelectForTableProps = SelectProps;

const optionsMap = new Map<string, Value>();

optionsMap.set("Today", {
  after: "dStart",
});
optionsMap.set("Yesterday", {
  before: "-1dEnd",
  after: "-1dStart",
});
optionsMap.set("Last 24 hours", {
  after: "-24h",
});
optionsMap.set("Last 7 days", {
  after: "-7d",
});
optionsMap.set("Last 14 days", {
  after: "-14d",
});
optionsMap.set("Last 30 days", {
  after: "-30d",
});
optionsMap.set("Last 90 days", {
  after: "-90d",
});
optionsMap.set("Last 180 days", {
  after: "-180d",
});
optionsMap.set("This month", {
  after: "mStart",
});
optionsMap.set("Year to date", {
  after: "yStart",
});
optionsMap.set("All time", {
  after: "all",
});

interface Value {
  before?: string;
  after?: string;
}
