import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'

import { usr_get_details } from '@/api/api-erp/usr_get_details'

export function useEditForm() {
  const queryClient = useQueryClient()

  return useForm<FormValues>({
    async defaultValues() {
      try {
        const data = await queryClient.fetchQuery({
          queryKey: ['usr_get_details'],
          queryFn: usr_get_details
        })

        return {
          name: data.name || '',
          street: data.street || '',
          street2: data.street2 || '',
          city: data.city || '',
          state_id: data.state_id || null,
          country_id: data.country_id || null,
          zip: data.zip || '',

          vat: data.vat || '',
          email: data.email || '',
          website: data.website || '',
          phone: data.phone || '',
          mobile: data.mobile || '',

          lang: data.lang || '',
          customer_rank: null,
          platform_type_id: data.platform_type_id || null,
          shop_code: data.shop_code || '',
          shop_name: data.shop_name || '',
          image_1920: data.image_1920 || ''
        }
      } catch (error) {
        return {
          name: '',
          street: '',
          street2: '',
          city: '',
          state_id: null,
          country_id: null,
          zip: '',

          vat: '',
          email: '',
          website: '',
          phone: '',
          mobile: '',

          lang: '',
          customer_rank: null,
          platform_type_id: null,
          shop_code: '',
          shop_name: '',
          image_1920: ''
        }
      }
    },

    resolver: zodResolver(schema)
  })
}

const schema = z.object({
  name: z.string().max(100),
  street: z.string().max(256).nullable(),
  street2: z.string().max(256).nullable(),
  city: z.string().max(256).nullable(),
  state_id: z.number().nullable(),
  country_id: z.number().nullable(),
  zip: z.string().max(256).nullable(),

  vat: z.string().max(256).nullable(),
  email: z.string().email().nullable(),
  website: z.string().url().nullable(),
  phone: z.string().max(256).nullable(),
  mobile: z.string().max(256).nullable(),

  lang: z.string().max(256).nullable(),
  customer_rank: z.number().nullable(),
  platform_type_id: z.number().nullable(),
  shop_code: z.string().max(256).nullable(),
  shop_name: z.string().max(256).nullable(),
  image_1920: z.string().max(256).nullable()
})

type FormValues = z.infer<typeof schema>
