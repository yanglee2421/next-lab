// MUI Imports
import React from "react";

import type {
  OutlinedInputProps} from "@mui/material";
import {
  FormControl,
  FormLabel,
  OutlinedInput
} from "@mui/material";

// React Imports

export interface InputNumberProps extends Omit<OutlinedInputProps, "onChange"> {
  label: React.ReactNode;
  value: number;
  onChange(v: number | null): void;
}

export const InputNumber = React.forwardRef<unknown, InputNumberProps>(
  (props, ref) => {
    // ** Props
    const { label, value, onChange, ...restProps } = props;

    // Value & Change
    const model = value ? String(value) : "";

    const handleChange: HandleChange = (evt) => {
      const v = evt.target.value.replace(/\D/g, "");

      onChange(v ? Number(v) : null);
    };

    return (
      <FormControl
        fullWidth
        sx={{
          position: "relative",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ fontSize: "1.2rem" }}>{label}</FormLabel>
        <OutlinedInput
          {...restProps}
          ref={ref}
          value={model}
          onChange={handleChange}
          size="small"
          autoComplete="off"
        />
      </FormControl>
    );
  }
);
type HandleChange = React.ChangeEventHandler<HTMLInputElement>;
