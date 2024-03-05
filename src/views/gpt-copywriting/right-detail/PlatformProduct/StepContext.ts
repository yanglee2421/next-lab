// React Imports
import React from "react";

// Types Imports
import type { Row } from "@/api/api-stg/connection_my_connections";
import type { Res } from "@/api/api-nlp/gpt_task";

export const StepContext = React.createContext<Step>({
  step: 0,
  setStep() {
    return;
  },

  store: null,
  setStore() {
    return;
  },

  open: false,
  setOpen() {
    return;
  },

  data: null,
});

export const useStep = () => React.useContext(StepContext);

export interface Step {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;

  store: Row | null;
  setStore: React.Dispatch<React.SetStateAction<Row | null>>;

  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  data: Res | null;
}
