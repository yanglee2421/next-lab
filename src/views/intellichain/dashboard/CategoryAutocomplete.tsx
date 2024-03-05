// MUI Imports
import React from "react";

import { Autocomplete, TextField } from "@mui/material";

// Query Imports
import { keepPreviousData, useQuery } from "@tanstack/react-query";


// React Imports

// Utils Imports
import { useImmer } from "use-immer";
import { useController, useFormContext } from "react-hook-form";

import { iscAxios } from "./iscAxios";

export function CategoryAutocomplete() {
  const [queryData, updateQueryData] = useImmer<Data>({
    keyword: "",
    parent_id: void 0,
    category_id: void 0,
  });

  const query = useQuery({
    queryKey: ["get_product_category_list", queryData],
    queryFn({ signal }) {
      return iscAxios<unknown, Res, Data>({
        signal,
        url: "/get_product_category_list",
        method: "POST",
        data: queryData,
      });
    },

    placeholderData: keepPreviousData,
  });

  const formCtx = useFormContext();

  const controller = useController({
    control: formCtx.control,
    name: "category",
    defaultValue: null,
  });

  return (
    <Autocomplete
      value={
        query.data?.category_list.find((item) => {
          return Object.is(item.id, controller.field.value);
        }) || null
      }
      onChange={(evt, value) => {
        void evt;
        controller.field.onChange(value ? value.id : null);
      }}
      loading={query.isPending}
      options={query.data?.category_list || []}
      renderInput={(params) => (
        <TextField
          {...params}
          value={queryData.keyword}
          onChange={(evt) => {
            updateQueryData((prev) => {
              prev.keyword = evt.target.value;
            });
          }}
          label="Category"
          size="small"
        ></TextField>
      )}
      getOptionKey={(option) => option.id}
      getOptionLabel={(value) => value.name}
      isOptionEqualToValue={(option, value) => Object.is(option.id, value?.id)}
    ></Autocomplete>
  );
}

export interface Res {
  total: number;
  category_list: Category[];
}

export interface Category {
  id: number;
  name: string;
  parent_id: number;
}

export interface Data {
  keyword: string;
  parent_id?: number;
  category_id?: number;
}
