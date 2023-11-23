// NextJs Imports
import { Inter } from "next/font/google";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

// I18n Imports
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Clsx Imports
import clsx from "clsx";

// Shopline Imports
import Client, { shared, Oauth } from "@shoplinedev/appbridge";

// React Imports
import React from "react";

// MUI Imports
import { Button } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  void props;

  const router = useRouter();

  const shoplineAppRef = React.useRef<ReturnType<
    typeof Client.createApp
  > | null>(null);

  const handleLink = async (query: string) => {
    await router.replace({ query });
  };

  const handleOauth = () => {
    const app = shoplineAppRef.current;
    if (!app) return;

    Oauth.create(app).invoke({
      scope: ["read_products"],
      appKey: "09f1af622812fe9d30e7a3ebb21b5717019928cd",
      redirectUri: "http://localhost:3000/api/oauth",
    });
  };

  React.useEffect(() => {
    shoplineAppRef.current = Client.createApp({
      appKey: "09f1af622812fe9d30e7a3ebb21b5717019928cd",
      host: shared.getHost(),
    });
  }, []);

  return (
    <main className={clsx(inter.className)}>
      <h1 className="text-xl text-red-500">hello world</h1>
      <ul>
        <li>
          <button onClick={handleLink.bind(null, "token=link1")}>link 1</button>
          <button onClick={handleLink.bind(null, "token=link2")}>link 2</button>
          <button onClick={handleLink.bind(null, "token=link3")}>link 3</button>
          <button onClick={handleLink.bind(null, "")}>link clear</button>
        </li>
      </ul>
      <Button onClick={handleOauth} variant="contained">
        oauth
      </Button>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const props = await serverSideTranslations(locale || "en", ["common"]);

  return { props: { hello: "hello", ...props } };
};
