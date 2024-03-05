// MUI Imports
import { Typography } from "@mui/material";

// I18n Imports
import { useTranslation } from "react-i18next";

export function EmptyText() {
  const { t } = useTranslation();

  return (
    <Typography align="center">
      {t("Please choose products from connected")}
    </Typography>
  );
}
