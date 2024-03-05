// MUI Imports
import type {
  SelectProps} from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function LanguageSelect(props: LanguageSelectProps) {
  // ** Props
  const { disabled, ...restProps } = props;

  const formCtx = useFormContext();

  const controller = useController({
    control: formCtx.control,
    defaultValue: "en",
    name: "language",
    disabled,
  });

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Language</InputLabel>
      <Select label="Language" {...controller.field} {...restProps}>
        <MenuItem value="en">English</MenuItem>
      </Select>
      {controller.fieldState.error && (
        <FormHelperText error>
          {controller.fieldState.error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export type LanguageSelectProps = SelectProps;
