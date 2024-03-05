import { useForm, FormProvider } from "react-hook-form";

export function WooStep() {
  const formCtx = useForm({});

  return (
    <FormProvider {...formCtx}>
      <></>
    </FormProvider>
  );
}
