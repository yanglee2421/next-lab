// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import type { FormValues } from "./types";

// Context Imports
import { useStep } from "../../StepContext";

// Components Imports
import { ShopifyList } from "./ShopifyList";
import { ShopifyForm } from "./ShopifyForm";

export function ShopifyStep() {
  const step = useStep();

  // Form Hooks
  const formCtx = useForm<FormValues>({
    defaultValues: {
      blog: null,

      handle: "",
      author: "",
      image: "",
      published: true,

      title: step.data?.output.title || "",
      tags: step.data?.output.keywords || [],
      content_html: step.data?.output.description || "",
    },

    // @ts-ignore
    resolver: yupResolver(
      yup.object().shape({
        handle: yup.string().max(128),
        author: yup.string().max(128).required(),
        image: yup.string().url().max(128),
        published: yup.boolean(),

        title: yup.string().max(256).required(),
        tags: yup.array().of(yup.string()),
        content_html: yup.string().max(5000).required(),
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
