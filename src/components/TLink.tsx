// I18n Imports
import { useMemo } from "react";

import { useTranslation } from "react-i18next";

// MUI Imports
import type { LinkProps } from "@mui/material";
import { Link } from "@mui/material";

// React Imports

export function TLink(props: LinkProps) {
  // ** Props
  const { children, ...restProps } = props;

  // I18n Hooks
  const { t } = useTranslation();

  const textEl = useMemo(() => {
    if (typeof children === "string") {
      return t([`link:${children}`, children], { keySeparator: ":" });
    }
    
return children;
  }, [t, children]);

  return <Link {...restProps}>{textEl}</Link>;
}
