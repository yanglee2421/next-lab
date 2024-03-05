// MUI Imports
import { FormControlLabel, Switch } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

export function tableToolbar(props: tableToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton></GridToolbarColumnsButton>
      <GridToolbarFilterButton></GridToolbarFilterButton>
      <GridToolbarDensitySelector></GridToolbarDensitySelector>
      <GridToolbarExport></GridToolbarExport>
      <FormControlLabel
        checked={props.showOriginalLanguage}
        onChange={(evt, checked) => {
          void evt;
          props.onOriginalLanguageChange(checked);
        }}
        control={<Switch></Switch>}
        label="original language"
      ></FormControlLabel>
      <GridToolbarQuickFilter sx={{ ml: "auto" }}></GridToolbarQuickFilter>
    </GridToolbarContainer>
  );
}

export type tableToolbarProps = {
  showOriginalLanguage: boolean;
  onOriginalLanguageChange(checked: boolean): void;
};
