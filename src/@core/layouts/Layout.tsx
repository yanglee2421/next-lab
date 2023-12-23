// ** React Import
import React from "react";

// ** Type Import
import { LayoutProps } from "src/@core/layouts/types";

// ** Layout Components
import VerticalLayout from "./VerticalLayout";
import HorizontalLayout from "./HorizontalLayout";

export default function Layout(props: LayoutProps) {
  // ** Props
  const { hidden, children, settings, saveSettings } = props;

  // ** Ref
  const isCollapsed = React.useRef(settings.navCollapsed);

  React.useEffect(() => {
    if (hidden) {
      settings.navCollapsed &&
        void (() => {
          saveSettings({
            ...settings,
            navCollapsed: false,
            layout: "vertical",
          });
          isCollapsed.current = true;
        })();

      return;
    }

    if (isCollapsed.current) {
      isCollapsed.current = false;

      saveSettings({
        ...settings,
        navCollapsed: true,
        layout: settings.lastLayout,
      });

      return;
    }

    if (settings.lastLayout === settings.layout) {
      return;
    }

    saveSettings({
      ...settings,
      layout: settings.lastLayout,
    });
  }, [hidden, settings, saveSettings]);

  if (settings.layout === "horizontal") {
    return <HorizontalLayout {...props}>{children}</HorizontalLayout>;
  }

  return <VerticalLayout {...props}>{children}</VerticalLayout>;
}
