// MUI Imports
import type { ChipProps} from "@mui/material";
import { Chip, alpha } from "@mui/material";

export function ConnectionStatusCell(props: ConnectionStatusCellProps) {
  // ** Props
  const { connection_status, ...restProps } = props;

  return (
    <Chip
      label={toLabel(connection_status).toLowerCase()}
      color={toColor(connection_status)}
      size="small"
      sx={{
        textTransform: "capitalize",
        color(theme) {
          return theme.palette[toColor(connection_status)].main;
        },
        bgcolor(theme) {
          return alpha(theme.palette[toColor(connection_status)].main, 0.12);
        },
      }}
      {...restProps}
    ></Chip>
  );
}

export type ConnectionStatusCellProps = ChipProps & {
  connection_status: number;
};

function toLabel(connection_status: number) {
  switch (connection_status) {
    case 0:
      return "ready";
    case 1:
      return "connected";
    case 2:
      return "failed";
    case 3:
      return "paused";
    case 4:
      return "closed";
    case 5:
      return "expired";
    default:
      return "";
  }
}

function toColor(connection_status: number): Color {
  switch (connection_status) {
    case 0:
      return "primary";
    case 1:
      return "success";
    case 2:
      return "error";
    case 3:
      return "warning";
    case 5:
      return "secondary";
    case 4:
    default:
      return "info";
  }
}

type Color = "primary" | "secondary" | "error" | "info" | "success" | "warning";
