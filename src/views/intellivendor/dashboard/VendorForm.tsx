// MUI Imports
import React from "react";

import type {
  PaperProps,
  Theme} from "@mui/material";
import {
  Paper,
  Grid,
  MenuItem,
  Stack,
  Button,
  IconButton,
  Collapse,
  Box,
  useMediaQuery
} from "@mui/material";
import {
  RefreshOutlined,
  SearchOutlined,
  ReplayOutlined,
  ExpandMoreOutlined,
  ExpandLessOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

// Components Imports
import { useForm, FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import type { UseQueryResult } from "@tanstack/react-query";

import { SortColumnSelect } from "./SortColumnSelect";
import { SortOrderSelect } from "./SortOrderSelect";
import { VendorShopSelect } from "./VendorShopSelect";
import { ItemText, IntInput } from "@/components/form";
import { LanguageSelect } from "./LanguageSelect";

// Form Imports

// Query Imports
import type { Row } from "@/api/api-stg/connection_my_connections";


// React Imports

export function VendorForm(props: VendorFormProps) {
  // ** Props
  const {
    vendorShops,
    iscQuery,
    showOriginalLanguage,
    onFinish,
    defaultValues,
    ...restProps
  } = props;

  const formCtx = useForm<FormValues>({
    defaultValues,

    resolver: zodResolver(zodSchema),
  });

  const [collapsed, setCollapsed] = React.useState(true);

  const extraSmallScreen = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.down("sm");
  });

  return (
    <Paper
      sx={{ padding: 3 }}
      component={"form"}
      onSubmit={formCtx.handleSubmit(
        (data) => {
          onFinish?.(data);
        },
        (error) => {
          console.warn(error);
        }
      )}
      onReset={() => {
        formCtx.reset();
      }}
      noValidate
      autoComplete="off"
      {...restProps}
    >
      <FormProvider {...formCtx}>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <VendorShopSelect>
                {vendorShops.map((item) => {
                  return (
                    <MenuItem
                      key={item.connection_id}
                      value={String(item.connection_id)}
                    >
                      {item.shop_alias || item.site_name}
                    </MenuItem>
                  );
                })}
              </VendorShopSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <LanguageSelect name="language"></LanguageSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <ItemText name="keyword" label="Keyword" size="small"></ItemText>
            </Grid>
            <Grid item xs={12} md={6}>
              <ItemText
                name="category_id"
                label="Category ID"
                size="small"
              ></ItemText>
            </Grid>
            <Grid item xs={12} md={6}>
              <ItemText
                name="product_filter"
                label="Product Filter"
                size="small"
              ></ItemText>
            </Grid>
            <Grid item xs={12} md={6}>
              <ItemText
                name="out_member_id"
                label="Out Member ID"
                size="small"
              ></ItemText>
            </Grid>
          </Grid>
        </Box>

        {extraSmallScreen ? (
          <Grid container spacing={3} marginTop={0}>
            <Grid item xs={12} md={6}>
              <IntInput
                name="price_start"
                label="Price Start"
                size="small"
              ></IntInput>
            </Grid>
            <Grid item xs={12} md={6}>
              <IntInput
                name="price_end"
                label="Price End"
                size="small"
              ></IntInput>
            </Grid>
            <Grid item xs={12} md={6}>
              <SortColumnSelect
                showOriginalLanguage={showOriginalLanguage}
              ></SortColumnSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <SortOrderSelect></SortOrderSelect>
            </Grid>
          </Grid>
        ) : (
          <Collapse in={!collapsed}>
            <Grid container spacing={3} marginTop={0}>
              <Grid item xs={12} md={6}>
                <ItemText
                  name="product_filter"
                  label="Product Filter"
                  size="small"
                ></ItemText>
              </Grid>
              <Grid item xs={12} md={6}>
                <ItemText
                  name="out_member_id"
                  label="Out Member ID"
                  size="small"
                ></ItemText>
              </Grid>
              <Grid item xs={12} md={6}>
                <IntInput
                  name="price_start"
                  label="Price Start"
                  size="small"
                ></IntInput>
              </Grid>
              <Grid item xs={12} md={6}>
                <IntInput
                  name="price_end"
                  label="Price End"
                  size="small"
                ></IntInput>
              </Grid>
              <Grid item xs={12} md={6}>
                <SortColumnSelect
                  showOriginalLanguage={showOriginalLanguage}
                ></SortColumnSelect>
              </Grid>
              <Grid item xs={12} md={6}>
                <SortOrderSelect></SortOrderSelect>
              </Grid>
            </Grid>
          </Collapse>
        )}

        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
          gap={3}
          marginTop={3}
        >
          <LoadingButton
            disabled={iscQuery.isFetching}
            type="submit"
            variant="contained"
            size="small"
            startIcon={<SearchOutlined></SearchOutlined>}
          >
            search
          </LoadingButton>
          <Button
            disabled={iscQuery.isFetching}
            type="reset"
            variant="outlined"
            size="small"
            startIcon={<ReplayOutlined></ReplayOutlined>}
          >
            reset
          </Button>
          <Button
            onClick={() => {
              iscQuery.refetch();
            }}
            disabled={iscQuery.isRefetching}
            variant="outlined"
            size="small"
            startIcon={<RefreshOutlined></RefreshOutlined>}
          >
            refresh
          </Button>
          <IconButton
            onClick={() => {
              setCollapsed((p) => !p);
            }}
            size="small"
            sx={{
              ml: "auto",
              visibility: extraSmallScreen ? "hidden" : void 0,
            }}
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

const zodSchema = z.object({
  vendorShop: z.string().min(1),
  language: z.string().min(1),
  keyword: z.string(),
  category_id: z.string(),
  product_filter: z.string(),
  out_member_id: z.string(),
  price_start: z.number().int().min(0).nullable(),
  price_end: z.number().int().min(0).nullable(),
  sortColumn: z.string(),
  sortOrder: z.string(),
});

export type FormValues = z.infer<typeof zodSchema>;

export type VendorFormProps = PaperProps & {
  vendorShops: Row[];
  iscQuery: UseQueryResult;
  showOriginalLanguage: boolean;
  onFinish(data: FormValues): void;
  defaultValues: FormValues;
};
