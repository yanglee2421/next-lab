// Styles Imports
import "@/styles/globals.css";

// NextJs Imports
import type { AppProps } from "next/app";

// I18n Imports
import { appWithTranslation } from "next-i18next";

// Provider Imports
import { QueryProvider } from "@/api/provider";
import { ReduxProvider } from "@/redux";
import { ThemeProvider } from "@/theme";

// Toast Imports
import { Toaster } from "react-hot-toast";

export default appWithTranslation(({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <Toaster />
          <Component {...pageProps} />;
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
});
