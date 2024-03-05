// MUI Imports
import type {
  SelectProps} from "@mui/material";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select
} from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function ItemSelect(props: ItemSelectProps) {
  // ** Props
  const { name, label, children, fullWidth = true, ...restProps } = props;

  // ** Form
  const { control } = useFormContext();

  // ** Field
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  return (
    <FormControl fullWidth={fullWidth} error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Select {...restProps} label={label} fullWidth={fullWidth} {...field}>
        {children}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}

export interface ItemSelectProps extends SelectProps {
  name: string;
}
