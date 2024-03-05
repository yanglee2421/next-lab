// MUI Imports
import React from "react";

import type {
  PaperProps} from "@mui/material";
import {
  Paper,
  Grid,
  Stack,
  Button,

  // IconButton,
  // Collapse,
} from "@mui/material";
import {
  RefreshOutlined,
  SearchOutlined,
  ReplayOutlined,

  // ExpandLessOutlined,
  // ExpandMoreOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

// Components Imports
import { useForm, FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import type { UseQueryResult } from "@tanstack/react-query";

import { CategoryAutocomplete } from "./CategoryAutocomplete";
import { ItemText, IntInput } from "@/components/form";
import { SortColumnSelect } from "./SortColumnSelect";
import { SortOrderSelect } from "./SortOrderSelect";

// Form Imports

// Query Imports

// React Imports

export function SearchForm(props: SearchFormProps) {
  // ** Props
  const { query, onFinish, defaultValues, ...restProps } = props;

  const formCtx = useForm<FormValues>({
    defaultValues,

    resolver: zodResolver(zodSchema),
  });

  // const [collapsed, setCollapsed] = React.useState(true);

  const handleSubmit = formCtx.handleSubmit(
    (data) => {
      onFinish?.(data);
    },
    (error) => {
      console.warn(error);
    }
  );

  return (
    <Paper
      component={"form"}
      onSubmit={handleSubmit}
      onReset={() => {
        formCtx.reset();
      }}
      noValidate
      autoComplete="off"
      sx={{ padding: 3 }}
      {...restProps}
    >
      <FormProvider {...formCtx}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CategoryAutocomplete></CategoryAutocomplete>
          </Grid>
          <Grid item xs={12} md={6}>
            <ItemText name="keyword" size="small" label="Keyword"></ItemText>
          </Grid>
          <Grid item xs={12} md={6}>
            <IntInput
              name="min_price"
              size="small"
              label="Min price"
            ></IntInput>
          </Grid>
          <Grid item xs={12} md={6}>
            <IntInput
              name="max_price"
              size="small"
              label="Max price"
            ></IntInput>
          </Grid>

          <Grid item xs={12} md={6}>
            <SortColumnSelect></SortColumnSelect>
          </Grid>
          <Grid item xs={12} md={6}>
            <SortOrderSelect></SortOrderSelect>
          </Grid>
        </Grid>

        {/* <Collapse in={!collapsed}></Collapse> */}

        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          gap={3}
          alignItems={"center"}
          marginTop={3}
        >
          <LoadingButton
            disabled={query.isFetching}
            type="submit"
            variant="contained"
            size="small"
            startIcon={<SearchOutlined></SearchOutlined>}
          >
            search
          </LoadingButton>
          <Button
            disabled={query.isFetching}
            type="reset"
            variant="outlined"
            size="small"
            startIcon={<ReplayOutlined></ReplayOutlined>}
          >
            reset
          </Button>
          <Button
            onClick={() => {
              query.refetch();
            }}
            disabled={query.isRefetching}
            variant="outlined"
            size="small"
            startIcon={<RefreshOutlined></RefreshOutlined>}
          >
            refresh
          </Button>
          {/* <IconButton
            onClick={() => {
              setCollapsed((p) => !p);
            }}
            size="small"
            sx={{ ml: "auto" }}
          >
            {collapsed ? (
              <ExpandMoreOutlined fontSize="small"></ExpandMoreOutlined>
            ) : (
              <ExpandLessOutlined fontSize="small"></ExpandLessOutlined>
            )}
          </IconButton> */}
        </Stack>
      </FormProvider>
    </Paper>
  );
}

const zodSchema = z.object({
  category: z.number().nullable(),
  keyword: z.string(),
  min_price: z.number().int().nonnegative().nullable(),
  max_price: z.number().int().nonnegative().nullable(),
  sortColumn: z.string(),
  sortOrder: z.string(),
  attrib_values: z.tuple([z.number(), z.number()]).array(),
});

export type FormValues = z.infer<typeof zodSchema>;

export type SearchFormProps = PaperProps & {
  query: UseQueryResult;
  defaultValues: FormValues;
  onFinish(data: FormValues): void;
};
