import React from "react";

import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";


import { useController, useFormContext } from "react-hook-form";

export function InputInt(props: Props) {
  const { name, disabled, ...restProps } = props;

  const formCtx = useFormContext();

  const controller = useController({
    control: formCtx.control,
    name,
    disabled,
    defaultValue: 0,
  });

  return (
    <TextField
      {...controller.field}
      value={String(controller.field.value)}
      onChange={(evt) => {
        controller.field.onChange(
          Number(evt.target.value.replace(/\D/g, "") || 0)
        );
      }}
      error={!!controller.fieldState.error}
      helperText={controller.fieldState.error?.message}
      fullWidth
      inputProps={{
        inputMode: "numeric",
      }}
      {...restProps}
    ></TextField>
  );
}

type Props = TextFieldProps & {
  name: string;
};
