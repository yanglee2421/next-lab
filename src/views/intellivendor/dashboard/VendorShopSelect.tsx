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

export function VendorShopSelect(props: VendorShopSelectProps) {
  // ** Props
  const { children, disabled, ...restProps } = props;

  const formCtx = useFormContext();

  const controller = useController({
    control: formCtx.control,
    name: "vendorShop",
    defaultValue: "",
    disabled,
  });

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Vendor Shop</InputLabel>
      <Select {...controller.field} label="Vendor Shop" {...restProps}>
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

export type VendorShopSelectProps = SelectProps;
