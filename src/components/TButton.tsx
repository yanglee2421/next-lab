// MUI Imports
import { useMemo } from "react";

import type { ButtonProps } from "@mui/material";
import { Button } from "@mui/material";

// React Imports

// I18n Imports
import { useTranslation } from "react-i18next";

export function TButton(props: ButtonProps) {
  // ** Props
  const { children, ...restProps } = props;

  // I18n Hooks
  const { t } = useTranslation();

  const textEl = useMemo(() => {
    if (typeof children === "string") {
      return t([`button:${children}`, children], { keySeparator: ":" });
    }
    
return children;
  }, [t, children]);

  return <Button {...restProps}>{textEl}</Button>;
}
