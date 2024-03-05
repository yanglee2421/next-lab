// Form Imports
import { useFormContext, useWatch } from "react-hook-form";

import type { FormValues } from "../../../types";

// Components Imports
import { ShopifyUpdate } from "./ShopifyUpdate";
import { ShopifyCreate } from "./ShopifyCreate";

export function ShopifySubmit() {
  const formCtx = useFormContext<FormValues>();

  const product_id = useWatch({
    control: formCtx.control,
    name: "product.id",
  });

  if (product_id) {
    return <ShopifyUpdate />;
  }

  return <ShopifyCreate />;
}
