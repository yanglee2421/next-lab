// MUI Imports
import React from "react";

import type { BoxProps} from "@mui/material";
import { Box, CircularProgress, Typography } from "@mui/material";

// React Imports

export const ProgressBox = React.forwardRef<HTMLDivElement, ProgressBoxProps>(
  (props, ref) => {
    // ** Props
    const { children, ...restProps } = props;

    return (
      <Box
        ref={ref}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={4}
        {...restProps}
      >
        <CircularProgress></CircularProgress>
        {children || <Typography>Loading...</Typography>}
      </Box>
    );
  }
);

export type ProgressBoxProps = BoxProps;
