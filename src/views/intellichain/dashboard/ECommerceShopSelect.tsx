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

export function ECommerceShopSelect(props: ECommerceShopSelectProps) {
  // ** Props
  const { children, disabled, ...restProps } = props;

  const formCtx = useFormContext();

  const controller = useController({
    control: formCtx.control,
    name: "eCommerceShop",
    defaultValue: "",
    disabled,
  });

  return (
    <FormControl size="small" fullWidth>
      <InputLabel>eCommerce Shop</InputLabel>
      <Select {...controller.field} label="eCommerce Shop" {...restProps}>
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

export type ECommerceShopSelectProps = SelectProps;
