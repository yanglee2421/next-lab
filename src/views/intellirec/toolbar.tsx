// MUI Imports
import { Box } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { ReadMoreOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export function toolbar(props: toolbarProps) {
  // ** Props
  const { loading, hasNextPage, onClick } = props;

  return (
    <Box display={"flex"} p={3}>
      <GridToolbarColumnsButton></GridToolbarColumnsButton>
      <GridToolbarFilterButton></GridToolbarFilterButton>
      <GridToolbarDensitySelector></GridToolbarDensitySelector>
      <GridToolbarExport></GridToolbarExport>
      {hasNextPage && (
        <LoadingButton
          onClick={onClick}
          loading={loading}
          startIcon={<ReadMoreOutlined></ReadMoreOutlined>}
          sx={{ ml: 3 }}
        >
          load more
        </LoadingButton>
      )}
      <GridToolbarQuickFilter sx={{ ml: "auto" }}></GridToolbarQuickFilter>
    </Box>
  );
}

interface toolbarProps {
  loading: boolean;
  hasNextPage: boolean;
  onClick(): void;
}
