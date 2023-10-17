// Styles Imports
import "@/styles/globals.css";

// NextJs Imports
import type { AppProps } from "next/app";
import { Router } from "next/router";

// I18n Imports
import { appWithTranslation } from "next-i18next";

// Provider Imports
import { QueryProvider } from "@/api/provider";
import { ReduxProvider } from "@/redux";
import { ThemeProvider } from "@/theme";

// Toast Imports
import { Toaster } from "react-hot-toast";

// NProgress Imports
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

export default appWithTranslation(({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <Toaster />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
});
