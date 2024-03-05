// Query Imports
import type { UseQueryResult } from "@tanstack/react-query";

// MUI Imports
import type { DataGridProps} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Alert, AlertTitle } from "@mui/material";

// Type Imports
import type { Res, Product } from "./type";

// Components Imports
import { Advertise } from "@/shared";

export function QueryTable(props: QueryTableProps) {
  // ** Props
  const { query, ...restProps } = props;

  // API pending
  if (query.isPending) {
    return <Advertise></Advertise>;
  }

  // API failed
  if (query.isError) {
    return (
      <Alert severity="error">
        <AlertTitle>Fetch data failed</AlertTitle>
        {query.error.message}
      </Alert>
    );
  }

  return (
    <Paper
      sx={{
        height: "100%",
      }}
    >
      <DataGrid
        loading={query.isFetching}
        rows={query.data.product_list}
        rowCount={query.data.total}
        {...restProps}
      ></DataGrid>
    </Paper>
  );
}

export type QueryTableProps = Omit<DataGridProps<Product>, "rows"> & {
  query: UseQueryResult<Res, Error>;
};
