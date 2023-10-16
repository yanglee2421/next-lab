// Styles Imports
import "@/styles/globals.css";

// NextJs Imports
import type { AppProps } from "next/app";

// I18n Imports
import { appWithTranslation } from "next-i18next";

export default appWithTranslation(({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
});
