// MUI Imports
import React from "react";

import type { CheckboxProps} from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";

// React Imports

export type InputCheckProps = CheckboxProps & {
  label: React.ReactNode;
};

export const InputCheck = React.forwardRef<HTMLButtonElement, InputCheckProps>(
  (props, ref) => {
    // ** Props
    const { label, ...restProps } = props;

    const control = <Checkbox ref={ref} {...restProps} />;

    return <FormControlLabel control={control} label={label} />;
  }
);
