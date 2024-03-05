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

export function SortColumnSelect(props: SortColumnSelectProps) {
  // ** Props
  const { disabled, ...restProps } = props;

  const formCtx = useFormContext();

  const controller = useController({
    control: formCtx.control,
    name: "sortColumn",
    defaultValue: "list_price",
    disabled,
  });

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Sort column</InputLabel>
      <Select label="Sort column" {...controller.field} {...restProps}>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="list_price">List price</MenuItem>
        <MenuItem value="min_order_qty">Min order qty</MenuItem>
        <MenuItem value="create_date">Create date</MenuItem>
        <MenuItem value="website_sequence">Website sequence</MenuItem>
        <MenuItem value="variant_count">Variant count</MenuItem>
      </Select>
      {controller.fieldState.error && (
        <FormHelperText error>
          {controller.fieldState.error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export type SortColumnSelectProps = SelectProps;
