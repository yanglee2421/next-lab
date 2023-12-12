// NextJs Imports
import { Inter } from "next/font/google";
import { GetStaticProps, InferGetStaticPropsType } from "next";

// I18n Imports
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Clsx Imports
import clsx from "clsx";

// React Imports
import React from "react";

// Components Imports
import { HomeLeft, HomeRight } from "@/views/home";

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  void props;

  return (
    <main className={clsx(inter.className)}>
      <h1 className={clsx(["text-xl text-red-500"])}>hello world</h1>
      <div className={clsx(["flex"])}>
        <div className={clsx(["basis-1/2"])}>
          <HomeLeft />
        </div>
        <div className={clsx(["basis-1/2"])}>
          <HomeRight />
        </div>
      </div>
    </main>
  );
}

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const props = await serverSideTranslations(locale || "en", ["common"]);

  return { props: { hello: "hello", ...props } };
};
