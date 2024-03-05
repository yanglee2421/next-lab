// MUI Imports
import React from "react";

import type { ButtonProps} from "@mui/material";
import { Box, Dialog, IconButton } from "@mui/material";
import { CloseOutlined, VisibilityOutlined } from "@mui/icons-material";

// React Imports

// Components Imports
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export function ImageCell(props: ImageCellProps) {
  // ** Props
  const { main_image_url } = props;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        view
      </Button> */}
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
      >
        <VisibilityOutlined></VisibilityOutlined>
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Box position={"relative"}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex(theme) {
                return theme.zIndex.modal;
              },
            }}
          >
            <CloseOutlined></CloseOutlined>
          </IconButton>
          <ImageGallery
            items={[
              {
                original: main_image_url,
              },
            ]}
            lazyLoad
            showPlayButton={false}
          ></ImageGallery>
        </Box>
      </Dialog>
    </>
  );
}

export type ImageCellProps = ButtonProps & {
  main_image_url: string;
};
