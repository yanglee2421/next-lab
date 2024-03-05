// MUI Imports
import type {
  OutlinedInputProps} from "@mui/material";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function ShoplineUrlInput(props: ShoplineUrlInputProps) {
  // ** Props
  const { name, label, fullWidth = true, disabled, ...restProps } = props;

  const formCtx = useFormContext();

  const controller = useController({
    name,
    disabled,
    control: formCtx.control,
    defaultValue: "",
  });

  return (
    <FormControl fullWidth={fullWidth} error={!!controller.fieldState.error}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        {...controller.field}
        label={label}
        startAdornment={
          <InputAdornment
            position="start"
            sx={{
              "& p": {
                color: controller.fieldState.error ? "error.main" : void 0,
              },
            }}
          >
            https://
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment
            position="end"
            sx={{
              "& p": {
                color: controller.fieldState.error ? "error.main" : void 0,
              },
            }}
          >
            .myshopline.com
          </InputAdornment>
        }
        {...restProps}
      ></OutlinedInput>
      {controller.fieldState.error && (
        <FormHelperText>{controller.fieldState.error.message}</FormHelperText>
      )}
    </FormControl>
  );
}

export type ShoplineUrlInputProps = OutlinedInputProps & {
  name: string;
};
