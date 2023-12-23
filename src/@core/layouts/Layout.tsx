// ** React Import
import { useEffect, useRef } from "react";

// ** Type Import
import { LayoutProps } from "src/@core/layouts/types";

// ** Layout Components
import VerticalLayout from "./VerticalLayout";
import HorizontalLayout from "./HorizontalLayout";

const Layout = (props: LayoutProps) => {
  // ** Props
  const { hidden, children, settings, saveSettings } = props;

  // ** Ref
  const isCollapsed = useRef(settings.navCollapsed);

  useEffect(() => {
    if (!hidden) {
      switch (Boolean(isCollapsed.current)) {
        case true:
          saveSettings({
            ...settings,
            navCollapsed: true,
            layout: settings.lastLayout,
          });

          isCollapsed.current = false;
          break;

        case false:
          if (settings.lastLayout !== settings.layout) {
            saveSettings({ ...settings, layout: settings.lastLayout });
          }
          break;

        default:
      }

      return;
    }

    if (settings.navCollapsed) {
      saveSettings({ ...settings, navCollapsed: false, layout: "vertical" });
      isCollapsed.current = true;
    }
  }, [hidden, settings, saveSettings]);

  if (settings.layout === "horizontal") {
    return <HorizontalLayout {...props}>{children}</HorizontalLayout>;
  }

  return <VerticalLayout {...props}>{children}</VerticalLayout>;
};

export default Layout;
