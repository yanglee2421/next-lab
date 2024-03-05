// MUI Imports
import React from "react";

import type { IconButtonProps } from "@mui/material";
import { Tooltip, IconButton } from "@mui/material";
import {
  ContentCopyRounded,
  LibraryAddCheckRounded,
} from "@mui/icons-material";

// Utils Imports
import { timeout } from "@/utils";

// React Imports

export const CopyBtn = React.forwardRef<HTMLButtonElement, CopyBtnProps>(
  (props, ref) => {
    // ** Props
    const { text, children, ...restProps } = props;

    const [isPending, setIsPending] = React.useState(false);

    return (
      <Tooltip title="Copy the source">
        <IconButton
          ref={ref}
          onClick={async () => {
            if (isPending) return;

            try {
              await navigator.clipboard.writeText(text);
              setIsPending(true);
              await timeout(1000);
              setIsPending(false);
            } catch (error) {
              console.error(error);
              setIsPending(false);
            }
          }}
          {...restProps}
        >
          {(() => {
            if (children) {
              return children;
            }

            if (isPending) {
              return <LibraryAddCheckRounded></LibraryAddCheckRounded>;
            }

            return <ContentCopyRounded></ContentCopyRounded>;
          })()}
        </IconButton>
      </Tooltip>
    );
  }
);

export interface CopyBtnProps extends IconButtonProps {
  text: string;
}
