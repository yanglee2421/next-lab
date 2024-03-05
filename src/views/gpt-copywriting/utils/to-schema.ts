// Yup Imports
import * as yup from "yup";

const product = yup.array().min(1);
const desc = yup.string().required();
const langTrans = yup.string().required();
const lang = yup.string().nullable();

// ** Generate
const isTitle = yup.boolean();
const isDesc = yup.boolean();
const isKeywords = yup.boolean();
const titleLimit = yup.number().min(1).max(100).nullable();
const descLimit = yup.number().min(1).max(5000).nullable();

const words = yup.number().min(1).max(5000).nullable();
const system = yup.string().max(5000).nullable();
const assistant = yup.string().max(5000).nullable();
const user = yup.string().max(5000).required();

export const toSchema = (tab: number, isProd: boolean) => {
  switch (tab) {
    // ** Description
    case 1: {
      const rest1 = {
        lang,
        isTitle,
        isDesc,
        isKeywords,
        titleLimit,
        descLimit,
      };

      return isProd
        ? yup.object().shape({ product, ...rest1 })
        : yup.object().shape({ desc, ...rest1 });
    }

    // ** SEO
    case 2: {
      const rest2 = { lang, words };

      return isProd
        ? yup.object().shape({ product, ...rest2 })
        : yup.object().shape({ desc, ...rest2 });
    }


    // ** Translate
    case 3:
      return isProd
        ? yup.object().shape({ product, lang: langTrans })
        : yup.object().shape({ desc, lang: langTrans });

    // ** Assistant
    case 0:
      return yup.object().shape({ system, assistant, user });
    default:
      return yup.object().shape({});
  }
};
