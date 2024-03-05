// MUI Imports
import React from "react";

import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";


// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function InputNumber(props: Props) {
  // ** Props
  const { name, disabled, ...restProps } = props;

  const formCtx = useFormContext();

  const controller = useController({
    control: formCtx.control,
    defaultValue: 0,
    name,
    disabled,
  });

  const [text, setText] = React.useState(() => {
    return String(controller.field.value);
  });

  return (
    <TextField
      {...controller.field}
      value={text}
      onChange={(evt) => {
        setText(evt.target.value);
      }}
      onBlur={(evt) => {
        controller.field.onBlur();

        const fieldValue = Number.parseFloat(evt.target.value);

        if (Number.isNaN(fieldValue)) {
          setText("");

          return;
        }

        controller.field.onChange(fieldValue);
        setText(fieldValue.toString());
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

type Props = { name: string } & TextFieldProps;
