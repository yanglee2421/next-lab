// MUI Imports
import React from "react";

import { Card, CardContent, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// API Imports
import { useTranslation } from "react-i18next";

import { useMyConnections } from "@/hooks/api-stg";

// React Imports

import { connectionsColumns } from "./connectionColumns";

// I18n Imports

export function ConnectionTable() {
  const query = useMyConnections({
    site_type: 0,
    is_list_all: true,
  });

  // I18n Hooks
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6">{t("Connected Accounts")}</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {t("Currently connected site")}
          </Typography>
        </Box>
        <DataGrid
          loading={query.isPending}
          columns={connectionsColumns(t)}
          rows={query.data || []}
          getRowId={(row) => row.connection_id}
          disableRowSelectionOnClick
          autoHeight
          hideFooterPagination
        ></DataGrid>
      </CardContent>
    </Card>
  );
}
