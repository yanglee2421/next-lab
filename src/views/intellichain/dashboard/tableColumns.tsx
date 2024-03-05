// MUI Imports
import type { GridColDef } from "@mui/x-data-grid";
import { Link, Tooltip, Typography } from "@mui/material";

// Type Imports
import type { Product } from "./type";
import { toTimeAgo } from "@/utils";

// Components Imports
import { ImageCell } from "./ImageCell";
import { ActionsCell } from "./ActionsCell";

export function tableColumns(): GridColDef<Product>[] {
  return [
    {
      field: "name",
      type: "string",
      flex: 1,
      minWidth: 160,
      hideSortIcons: true,
    },
    {
      field: "main_image_url",
      type: "string",
      headerName: "Main image url",
      headerAlign: "center",
      align: "center",
      renderHeader(params) {
        return (
          <Typography
            whiteSpace={"wrap"}
            textAlign={"center"}
            fontWeight={600}
            fontSize={12}
            textTransform={"uppercase"}
            color={"inherit"}
          >
            {params.colDef.headerName}
          </Typography>
        );
      },
      renderCell(params) {
        return <ImageCell main_image_url={params.value}></ImageCell>;
      },
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      hideSortIcons: true,
    },
    {
      field: "list_price",
      type: "number",
      headerName: "List price",
      headerAlign: "center",
      align: "center",
      renderHeader(params) {
        return (
          <Typography
            whiteSpace={"wrap"}
            textAlign={"center"}
            fontWeight={600}
            fontSize={12}
            textTransform={"uppercase"}
            color={"inherit"}
          >
            {params.colDef.headerName}
          </Typography>
        );
      },
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      hideSortIcons: true,
    },
    {
      field: "min_order_qty",
      type: "number",
      headerName: "Min order qty",
      headerAlign: "center",
      align: "center",
      renderHeader(params) {
        return (
          <Typography
            whiteSpace={"wrap"}
            textAlign={"center"}
            fontWeight={600}
            fontSize={12}
            textTransform={"uppercase"}
            color={"inherit"}
          >
            {params.colDef.headerName}
          </Typography>
        );
      },
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      hideSortIcons: true,
    },
    {
      field: "create_date",
      type: "string",
      headerName: "Create date",
      headerAlign: "center",
      align: "center",
      renderHeader(params) {
        return (
          <Typography
            whiteSpace={"wrap"}
            textAlign={"center"}
            fontWeight={600}
            fontSize={12}
            textTransform={"uppercase"}
            color={"inherit"}
          >
            {params.colDef.headerName}
          </Typography>
        );
      },
      renderCell(params) {
        return (
          <Tooltip title={new Date(params.value).toLocaleString()}>
            <span>{toTimeAgo(params.value)}</span>
          </Tooltip>
        );
      },
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      hideSortIcons: true,
    },
    {
      field: "website_sequence",
      type: "number",
      headerName: "Website sequence",
      headerAlign: "center",
      align: "center",
      renderHeader(params) {
        return (
          <Typography
            whiteSpace={"wrap"}
            textAlign={"center"}
            fontWeight={600}
            fontSize={12}
            textTransform={"uppercase"}
            color={"inherit"}
          >
            {params.colDef.headerName}
          </Typography>
        );
      },
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      hideSortIcons: true,
    },
    {
      field: "variant_count",
      type: "number",
      headerName: "Variant count",
      headerAlign: "center",
      align: "center",
      renderHeader(params) {
        return (
          <Typography
            whiteSpace={"wrap"}
            textAlign={"center"}
            fontWeight={600}
            fontSize={12}
            textTransform={"uppercase"}
            color={"inherit"}
          >
            {params.colDef.headerName}
          </Typography>
        );
      },
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      hideSortIcons: true,
    },
    {
      field: "website_url",
      type: "string",
      headerName: "Product detail",
      headerAlign: "center",
      align: "center",
      renderHeader(params) {
        return (
          <Typography
            whiteSpace={"wrap"}
            textAlign={"center"}
            fontWeight={600}
            fontSize={12}
            textTransform={"uppercase"}
            color={"inherit"}
          >
            {params.colDef.headerName}
          </Typography>
        );
      },
      renderCell(params) {
        return (
          <Link
            href={params.value}
            target="_blank"
            underline="always"
            sx={{ textDecorationLine: "underline" }}
          >
            product detail
          </Link>
        );
      },
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      hideSortIcons: true,
    },
    {
      field: "id",
      type: "actions",
      headerName: "actions",
      renderCell() {
        return <ActionsCell></ActionsCell>;
      },
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      hideSortIcons: true,
    },
  ];
}
