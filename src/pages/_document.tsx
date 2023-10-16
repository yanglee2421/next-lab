// NextJs Imports
import { Html, Head, Main, NextScript } from "next/document";

import i18nextConfig from "../../next-i18next.config";

export default function Document() {
  return (
    <Html lang={i18nextConfig.i18n.defaultLocale || "en"}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
