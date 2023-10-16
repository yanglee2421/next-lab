// NextJs Imports
import { GetStaticProps } from "next";

// I18n Imports
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Page404() {
  return <></>;
}

export const getStaticProps: GetStaticProps = async ({ locale = "en_US" }) => {
  const props = await serverSideTranslations(locale, ["common", "footer"]);
  return { props };
};
