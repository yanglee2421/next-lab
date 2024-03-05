// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import type { FormValues } from "./types";

// Components Imports
import { ShopifyForm } from "./ShopifyForm";
import { ShopifyList } from "./ShopifyList";
import { useStep } from "../../StepContext";

export function ShopifyStep() {
  const step = useStep();

  // Form hooks
  const formCtx = useForm<FormValues>({
    defaultValues: {
      product: null,

      role_no: step.data?.output.role_no,
      title: step.data?.output.title || "",
      keywords: step.data?.output.keywords || [],
      description: step.data?.output.description || "",
    },

    // @ts-ignore
    resolver: yupResolver(
      yup.object().shape({
        title: yup.string().max(128).required(),
        keywords: yup.array().of(yup.string()).min(1),
        description: yup.string().max(3000).required(),
      })
    ),
  });

  const stepNode = (() => {
    switch (step.step) {
      case 1:
        return <ShopifyList />;
      case 2:
        return <ShopifyForm />;
      default:
        return null;
    }
  })();

  return <FormProvider {...formCtx}>{stepNode}</FormProvider>;
}
