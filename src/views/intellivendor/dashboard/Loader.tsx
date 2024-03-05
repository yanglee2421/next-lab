// MUI Imports
import {
  DialogTitle,
  DialogContent,
  Typography,
  Skeleton,
  Box,
  IconButton,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

export function Loader(props: LoaderProps) {
  // ** Props
  const { onClose } = props;

  return (
    <>
      <DialogTitle sx={{ position: "relative" }}>
        Fetching data...
        <Box
          position={"absolute"}
          right={16}
          display={"flex"}
          alignItems={"center"}
          sx={{
            insetBlock: 0,
          }}
        >
          <IconButton onClick={onClose}>
            <CloseOutlined></CloseOutlined>
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h3">
          <Skeleton></Skeleton>
        </Typography>
        <Typography variant="subtitle1">
          <Skeleton></Skeleton>
        </Typography>
        <Typography variant="subtitle2">
          <Skeleton></Skeleton>
        </Typography>
        <Typography variant="body1">
          <Skeleton></Skeleton>
        </Typography>
        <Typography variant="body2">
          <Skeleton></Skeleton>
        </Typography>
        <Typography variant="caption">
          <Skeleton></Skeleton>
        </Typography>
      </DialogContent>
    </>
  );
}

export interface LoaderProps {
  onClose(): void;
}
