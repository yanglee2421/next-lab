import React from 'react'

import { ItemLang, ItemGenerate, ItemTextarea, ItemProduct } from '../components'
import { ItemNumber } from '@/components/ItemNumber'

const prodEl = <ItemProduct key='product' name='product' />
const descEl = <ItemTextarea key='desc' name='desc' label='Description' />
const langEl = <ItemLang key='lang' name='lang' />
const generateEl = <ItemGenerate key='generate' />
const wordsEl = <ItemNumber key='words' name='words' label='Words' placeholder='300' />
const systemEl = <ItemTextarea key='system' name='system' label='System' />
const assistantEl = <ItemTextarea key='assistant' name='assistant' label='Assistant' />
const usrEl = <ItemTextarea key='user' name='user' label='User' minRows={9} maxRows={12} />

export const toItems = (tab: number, isProd: boolean) => {
  const firstEl = isProd ? prodEl : descEl

  switch (tab) {
    case 1:
      return [firstEl, langEl, generateEl]
    case 2:
      return [firstEl, langEl, wordsEl]
    case 3:
      return [firstEl, langEl]
    case 0:
      return [systemEl, assistantEl, usrEl]

    default:
      return []
  }
}
