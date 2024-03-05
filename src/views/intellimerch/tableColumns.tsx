// MUI Imports
import type { GridColDef } from "@mui/x-data-grid";

// Components Imports
import { ActionsCell } from "./ActionsCell";

export function tableColumns(): GridColDef[] {
  return [
    {
      field: "id",
      type: "string",
      flex: 1,
    },
    {
      field: "boolean",
      type: "boolean",
      flex: 1,
    },

    // {
    //   field: "date",
    //   type: "date",
    //   flex: 1,
    // },
    // {
    //   field: "dateTime",
    //   type: "dateTime",
    //   flex: 1,
    // },
    {
      field: "number",
      type: "number",
      flex: 1,
    },
    {
      field: "singleSelect",
      type: "singleSelect",
      valueOptions: ["one", "two"],
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      renderCell() {
        return <ActionsCell></ActionsCell>;
      },
      flex: 1,
    },
  ];
}
