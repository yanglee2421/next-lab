// Components Imports
import React from "react";

import { WooStep } from "./WooStep";
import { ShopifyStep } from "./ShopifyStep";
import { ShoplineStep } from "./ShoplineStep";

// React Imports

// Hooks Imports
import { useStep } from "../StepContext";

export function PlatformStep() {
  const step = useStep();

  const platformNode = (() => {
    switch (step.store?.site_type) {
      case 1:
        return <ShopifyStep />;
      case 2:
        return <WooStep />;
      case 3:
        return <ShoplineStep />;
      default:
        return null;
    }
  })();

  return <>{platformNode}</>;
}
