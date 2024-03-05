// MUI Imports
import React from "react";

import type {
  PaperProps} from "@mui/material";
import {
  Paper,
  Grid,
  Collapse,
  Button,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ExpandMoreOutlined,
  ExpandLessOutlined,
  DriveFileRenameOutlineOutlined,
  AddPhotoAlternateOutlined,
  HideImageOutlined,
  PlaylistAddOutlined,
  PlaylistRemoveOutlined,
} from "@mui/icons-material";

// React Imports

// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function ToolsForm(props: ToolsFormProps) {
  const { selection, ...restProps } = props;
  const [collapsed, setCollapesd] = React.useState(true);

  const formCtx = useForm<FormValues>({
    defaultValues: {},

    resolver: zodResolver(schema),
  });

  return (
    <Paper component={"form"} sx={{ padding: 3 }} {...restProps}>
      <FormProvider {...formCtx}>
        <Grid container spacing={3}></Grid>

        <Collapse in={!collapsed}>
          <Grid container spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Collapse>

        <Stack direction={"row"} flexWrap={"wrap"} gap={3} marginTop={3}>
          <Button
            disabled={!selection.length}
            type="button"
            variant="outlined"
            size="small"
            startIcon={
              <DriveFileRenameOutlineOutlined></DriveFileRenameOutlineOutlined>
            }
          >
            copywriting
          </Button>
          <ComingSoon>
            <Button
              disabled
              type="button"
              variant="outlined"
              size="small"
              startIcon={<HideImageOutlined></HideImageOutlined>}
            >
              Remove Background
            </Button>
          </ComingSoon>
          <ComingSoon>
            <Button
              disabled
              type="button"
              variant="outlined"
              size="small"
              startIcon={
                <AddPhotoAlternateOutlined></AddPhotoAlternateOutlined>
              }
            >
              Generate Image
            </Button>
          </ComingSoon>

          <ComingSoon>
            <Button
              disabled
              type="button"
              variant="outlined"
              size="small"
              startIcon={<PlaylistRemoveOutlined></PlaylistRemoveOutlined>}
            >
              Remove Words
            </Button>
          </ComingSoon>
          <ComingSoon>
            <Button
              disabled
              title="coming soon"
              type="button"
              variant="outlined"
              size="small"
              startIcon={<PlaylistAddOutlined></PlaylistAddOutlined>}
            >
              Add Words
            </Button>
          </ComingSoon>

          <IconButton
            onClick={() => {
              setCollapesd((p) => !p);
            }}
            size="small"
            sx={{ ml: "auto", visibility: "hidden" }}
          >
            {collapsed ? (
              <ExpandMoreOutlined fontSize="small"></ExpandMoreOutlined>
            ) : (
              <ExpandLessOutlined fontSize="small"></ExpandLessOutlined>
            )}
          </IconButton>
        </Stack>
      </FormProvider>
    </Paper>
  );
}

export type ToolsFormProps = PaperProps & {
  selection: Array<string | number>;
};

const schema = z.object({});

export type FormValues = z.infer<typeof schema>;

function ComingSoon(props: React.PropsWithChildren) {
  return (
    <Tooltip title="Coming soon">
      <div>{props.children}</div>
    </Tooltip>
  );
}
