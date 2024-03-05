// MUI Imports
import type {
  SelectProps} from "@mui/material";
import {
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
} from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function WoolworldsShopSelect(props: WoolworldsShopSelectProps) {
  // ** Props
  const { children, disabled, ...restProps } = props;

  const formCtx = useFormContext();

  const controller = useController({
    control: formCtx.control,
    name: "site_connection_id_target",
    defaultValue: "",
    disabled,
  });

  return (
    <FormControl size="small" fullWidth>
      <InputLabel>Woolworlds Shop</InputLabel>
      <Select {...controller.field} label="Woolworlds Shop" {...restProps}>
        {children}
      </Select>
      {controller.fieldState.error && (
        <FormHelperText error>
          {controller.fieldState.error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export type WoolworldsShopSelectProps = SelectProps;
