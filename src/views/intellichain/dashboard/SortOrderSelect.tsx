// MUI Imports
import type {
  SelectProps} from "@mui/material";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function SortOrderSelect(props: SelectProps) {
  // ** Props
  const { disabled, ...restProps } = props;

  const formCtx = useFormContext();

  const controller = useController({
    control: formCtx.control,
    name: "sortOrder",
    defaultValue: "desc",
    disabled,
  });

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Sort order</InputLabel>
      <Select label="Sort order" {...controller.field} {...restProps}>
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
      {controller.fieldState.error && (
        <FormHelperText error>
          {controller.fieldState.error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
