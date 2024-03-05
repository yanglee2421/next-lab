import { notFound } from 'next/navigation'

import { Subscription } from '@views/subscription/Subscription'

export default function Page(props: Props) {
  if (allowedPlanId.includes(props.params.plan_id)) {
    return <Subscription></Subscription>
  }

  return notFound()
}

const allowedPlanId = ['1', '2', '4', '5', '6', '8']

type Props = {
  params: {
    lang: string
    plan_id: string
  }
  searchParams: {}
}
