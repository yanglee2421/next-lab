import type { FormValues } from '../types'
import type { Data } from '@/api/api-nlp/gpt_write'

export function toGptParams(formValues: FormValues, opt: Options): Data {
  const { tab } = opt

  switch (tab) {
    case 1:
      return toProd(formValues, opt)
    case 2:
      return toArticle(formValues, opt)
    case 3:
      return toTranslate(formValues, opt)
    default:
      throw new Error('Invalid Params')
  }
}

function toProd(formValues: FormValues, opt: Options): Data {
  const { product, isDesc, descLimit, isKeywords, isTitle, titleLimit, desc, lang } = formValues
  const descNum = descLimit || 300
  const description_words_num = isDesc ? descNum : 0
  const titleNum = titleLimit || 20
  const title_words_num = isTitle ? titleNum : 0
  const keywords_num = isKeywords ? 5 : 0

  const { isProdMode, site_info_id } = opt

  if (!isProdMode) {
    return [
      {
        client_task_id: crypto.randomUUID(),

        role_no: 1,

        description_words_num,
        title_words_num,
        keywords_num,

        description: desc,
        title: '',
        keywords: [],

        language: lang
      }
    ]
  }

  // Has Product
  return product.map(prod => {
    return {
      client_task_id: crypto.randomUUID(),
      site_info_id,

      role_no: 1,

      description_words_num,
      title_words_num,
      keywords_num,

      description: prod.body_html,
      title: prod.title,
      keywords: prod.tags.split(', '),
      connection_id: prod.connection_id,

      language: lang,
      product_id: prod.id
    }
  })
}

function toArticle(formValues: FormValues, opt: Options): Data {
  const { product, words, lang, desc } = formValues

  const description_words_num = words || 300

  const { isProdMode, site_info_id } = opt

  // Not Product
  if (!isProdMode) {
    return [
      {
        client_task_id: crypto.randomUUID(),
        role_no: 2,

        description_words_num,

        description: desc,
        title: '',
        keywords: [],

        language: lang
      }
    ]
  }

  // Has Product
  return product.map(prod => {
    return {
      client_task_id: crypto.randomUUID(),
      site_info_id,
      role_no: 2,

      description_words_num,

      description: prod.body_html,
      title: prod.title,
      keywords: prod.tags.split(', '),
      connection_id: prod.connection_id,

      language: lang,
      product_id: prod.id
    }
  })
}

function toTranslate(formValues: FormValues, opt: Options): Data {
  const { product, lang, desc } = formValues

  const { isProdMode, site_info_id } = opt

  // Not Product
  if (!isProdMode) {
    return [
      {
        client_task_id: crypto.randomUUID(),
        role_no: 3,

        description: desc,
        title: '',
        keywords: [],

        language: lang
      }
    ]
  }

  // Has Product
  return product.map(prod => {
    return {
      client_task_id: crypto.randomUUID(),
      site_info_id,
      role_no: 3,

      description: prod.body_html,
      title: prod.title,
      keywords: prod.tags.split(', '),
      connection_id: prod.connection_id,

      language: lang,
      product_id: prod.id
    }
  })
}

interface Options {
  tab: number
  isProdMode: boolean
  site_info_id?: number
}
