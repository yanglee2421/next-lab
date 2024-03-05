// API Imports

// MUI Imports
import { Link, Tooltip } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";

// I18n Imports
import type { TFunction } from "i18next";

import type { Row } from "@/api/api-stg/connection_my_connections";

// Components Imports
import { CopyBtn } from "@/components";
import { ConnectionSwitchCell } from "./ConnectionSwitchCell";
import { ConnectionMenuCell } from "./ConnectionMenuCell";
import { ConnectionStatusCell } from "./ConnectionStatusCell";
import { ConnectionLogoCell } from "./ConnectionLogoCell";

// Utils Imports
import { toTimeAgo } from "@/utils";

export function connectionsColumns(t: TFunction): GridColDef<Row>[] {
  return [
    {
      field: "site_type",
      headerName: t("platform"),
      headerAlign: "center",
      align: "center",
      width: 120,
      sortable: false,
      renderCell(params) {
        return (
          <ConnectionLogoCell site_type={params.value}></ConnectionLogoCell>
        );
      },
    },
    {
      field: "site_name",
      headerName: t("site name"),
      flex: 1,
      minWidth: 160,
      sortable: false,
      renderCell(params) {
        return params.row.shop_alias || params.value;
      },
    },
    {
      field: "site_url",
      headerName: t(["table-header:site url", "site url"], {
        keySeparator: ":",
      }),
      flex: 2,
      minWidth: 160,
      sortable: false,
      renderCell(params) {
        return (
          <Link
            href={`https://${params.value}`}
            target="_blank"
            underline="always"
            sx={{ textDecorationLine: "underline" }}
          >
            {(() => {
              try {
                return new URL(params.value).host;
              } catch (error) {
                console.warn(error);

                return params.value;
              }
            })()}
          </Link>
        );
      },
    },
    {
      field: "connect_dt",
      headerName: t("connect date"),
      headerAlign: "center",
      align: "center",
      width: 160,
      sortable: false,
      renderCell({ value }) {
        return (
          <Tooltip title={new Date(value).toLocaleString()}>
            <span>{toTimeAgo(value)}</span>
          </Tooltip>
        );
      },
    },
    {
      field: "recommender_api_key",
      headerName: t("Recommender API Key"),
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 80,
      sortable: false,
      renderCell(params) {
        const fallbackNode = "--";

        // Field value is falsy
        if (!params.value) {
          return fallbackNode;
        }

        // Field value is not a string
        if (typeof params.value !== "string") {
          return fallbackNode;
        }

        return <CopyBtn text={params.value} />;
      },
    },
    {
      field: "data_server_project_api_key",
      headerName: "Data Server API Key",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 80,
      sortable: false,
      renderCell(params) {
        const fallbackNode = "--";

        // Field value is falsy
        if (!params.value) {
          return fallbackNode;
        }

        // Field value is not a string
        if (typeof params.value !== "string") {
          return fallbackNode;
        }

        return <CopyBtn text={params.value} />;
      },
    },
    {
      field: "data_server_url",
      headerName: "Customized Data Server Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 80,
      sortable: false,
      renderCell(params) {
        const fallbackNode = "--";

        // Field value is falsy
        if (!params.value) {
          return fallbackNode;
        }

        // Field value is not a string
        if (typeof params.value !== "string") {
          return fallbackNode;
        }

        const firstHost = params.value
          .split(".")
          .at(0)
          ?.replace(/^data-/, "");

        // First host name is falsy
        if (!firstHost) {
          return fallbackNode;
        }

        return firstHost;
      },
    },
    {
      field: "connection_status",
      headerName: t("status"),
      headerAlign: "center",
      align: "center",
      width: 160,
      sortable: false,
      renderCell(params) {
        return (
          <ConnectionStatusCell
            connection_status={params.value}
          ></ConnectionStatusCell>
        );
      },
    },
    {
      field: "auth_url",
      headerName: t("enabled"),
      headerAlign: "center",
      align: "center",
      width: 100,
      sortable: false,
      renderCell(params) {
        return (
          <ConnectionSwitchCell
            site_connection_id={params.row.connection_id}
            status={params.row.connection_status}
          ></ConnectionSwitchCell>
        );
      },
    },
    {
      field: "btns",
      headerName: t("operation"),
      headerAlign: "center",
      align: "center",
      width: 120,
      sortable: false,
      renderCell(params) {
        return (
          <ConnectionMenuCell
            key={JSON.stringify(params.row)}
            row={params.row}
          ></ConnectionMenuCell>
        );
      },
    },
  ];
}
