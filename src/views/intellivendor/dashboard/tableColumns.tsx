// MUI Imports
import type { GridColDef } from "@mui/x-data-grid";
import { Link } from "@mui/material";

// Query Imports
import type { Product } from "@/api/api-nuwa/supplier_1688_product_keyword";

export function tableColumns(
  params: tableColumnsParams
): GridColDef<Product>[] {
  return [
    {
      field: "offerId",
      type: "string",
      headerName: "Product ID",
      flex: 1,
      minWidth: 120,
      maxWidth: 160,
      hideSortIcons: true,
    },
    {
      field: params.showOriginalLanguage ? "subject" : "subjectTrans",
      type: "string",
      headerName: "Suject",
      flex: 1,
      minWidth: 160,
      hideSortIcons: true,
    },
    {
      field: "priceInfo",
      type: "string",
      headerName: "Price",
      renderCell(params) {
        return params.value.price;
      },
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      hideSortIcons: true,
    },
    {
      field: "monthSold",
      type: "number",
      headerName: "Month Sold",
      headerAlign: "left",
      align: "left",
      flex: 1,
      minWidth: 120,
      maxWidth: 160,
      hideSortIcons: true,
    },
    {
      field: "traceInfo",
      type: "actions",
      headerName: "Actions",
      renderCell(params) {
        const linkHref = `https://detail.1688.com/offer/${params.row.offerId}.html`;

        return (
          <Link
            href={linkHref}
            target={linkHref}
            underline="always"
            sx={{ textDecorationLine: "underline" }}
          >
            detail
          </Link>
        );
      },
      flex: 1,
      minWidth: 120,
      maxWidth: 160,
      hideSortIcons: true,
    },
  ];
}

export interface tableColumnsParams {
  showOriginalLanguage: boolean;
}
