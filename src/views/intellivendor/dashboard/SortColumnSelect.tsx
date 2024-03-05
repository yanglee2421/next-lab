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
  const { showOriginalLanguage, disabled, ...restProps } = props;

  const formCtx = useFormContext();

  const controller = useController({
    control: formCtx.control,
    name: "sortColumn",
    defaultValue: "monthSold",
    disabled,
  });

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Sort column</InputLabel>
      <Select label="Sort column" {...controller.field} {...restProps}>
        <MenuItem value="offerId">Product ID</MenuItem>
        <MenuItem value={showOriginalLanguage ? "subject" : "subjectTrans"}>
          Subject
        </MenuItem>
        <MenuItem value="priceInfo">Price</MenuItem>
        <MenuItem value="monthSold">Month Sold</MenuItem>
        <MenuItem value="traceInfo">Trace Info</MenuItem>
      </Select>
      {controller.fieldState.error && (
        <FormHelperText error>
          {controller.fieldState.error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export type SortColumnSelectProps = SelectProps & {
  showOriginalLanguage: boolean;
};
