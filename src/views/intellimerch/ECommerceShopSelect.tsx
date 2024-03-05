// MUI Imports
import type {
  SelectProps} from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

// Query Imports
import { useMyConnections } from "@/hooks/api-stg";

// Type Imports
import type { FormValues } from "./SearchForm";

export function ECommerceShopSelect(props: ECommerceShopSelectProps) {
  // ** Props
  const { disabled, ...restProps } = props;

  const formCtx = useFormContext<FormValues>();

  const controller = useController({
    control: formCtx.control,
    name: "siteConnectionId",
    defaultValue: "",
    disabled,
  });

  const eCommerceQuery = useMyConnections({
    is_list_all: false,
    site_type: 1,
  });

  return (
    <FormControl fullWidth size="small">
      <InputLabel>eCommerce Shop</InputLabel>
      <Select
        {...controller.field}
        value={String(controller.field.value)}
        onChange={(evt) => {
          controller.field.onChange(evt);
          formCtx.setValue(
            "siteType",
            eCommerceQuery.data?.find((item) => {
              return Object.is(item.connection_id, Number(evt.target.value));
            })?.site_type || 0
          );
          formCtx.setValue("categoryId", "");
        }}
        label="eCommerce Shop"
        {...restProps}
      >
        {eCommerceQuery.data?.map((item) => {
          return (
            <MenuItem
              key={item.connection_id}
              value={String(item.connection_id)}
            >
              {item.shop_alias || item.site_name}
            </MenuItem>
          );
        })}
      </Select>
      {controller.fieldState.error && (
        <FormHelperText error={!!controller.fieldState.error}>
          {controller.fieldState.error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export type ECommerceShopSelectProps = SelectProps;
