// I18n Imports
import { useMemo } from "react";

import { useTranslation } from "react-i18next";

// MUI Imports
import type { TypographyProps } from "@mui/material";
import { Typography } from "@mui/material";

// React Imports

export function TTypography(props: TypographyProps) {
  // ** Props
  const { children, ...restProps } = props;

  // I18n Hooks
  const { t } = useTranslation();

  const textEl = useMemo(() => {
    if (typeof children === "string") {
      return t([`typography:${children}`, children], { keySeparator: ":" });
    }
    
return children;
  }, [t, children]);

  return <Typography {...restProps}>{textEl}</Typography>;
}
