import Image from 'next/image'

import { StorefrontOutlined } from '@mui/icons-material'

import { Ali1688, Shopify, Woo } from '@/components/logo'

export function ConnectionLogoCell(props: ConnectionIconCellProps) {
  const { site_type } = props

  switch (site_type) {
    case 1:
      return <Shopify width={40} height={40}></Shopify>
    case 2:
      return <Woo width={40} height={40}></Woo>
    case 3:
      return <Image src='/images/platform-icons/shopline.png' alt='shopline' width={40} height={40}></Image>
    case 201:
      return <Ali1688 width={40} height={40}></Ali1688>
    case 100:
      return <Image src='/images/platform-icons/icon_256x256.png' alt='shopline' width={40} height={40}></Image>
    default:
      return <StorefrontOutlined></StorefrontOutlined>
  }
}

export type ConnectionIconCellProps = {
  site_type: number
}
